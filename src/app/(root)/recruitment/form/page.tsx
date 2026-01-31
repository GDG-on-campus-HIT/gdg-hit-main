"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useFormik, getIn } from "formik";
import { Button } from "@/components/ui/button";
import CustomInput from "./CustomInput";
import CustomSelector from "./CustomSelector";
import CustomMultiSelector from "./CustomMultiSelector";
import CustomTextArea from "./CustomTextArea";
import { MdKeyboardArrowRight } from "react-icons/md";
import { branch, year } from "./data";
import { step1Schema, step4Schema } from "./schema";
import * as Yup from "yup";
import {
  useIsAlreadyRegisteredQuery,
  useRecruitmentFormSubmissionMutation,
  useGetActiveRecruitmentFormQuery
} from "@/redux/features/api/apiSlice";
import { Bounce, toast } from "react-toastify";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import Loader from "@/components/Loader/Loader";
import { ImSpinner2 } from "react-icons/im";

const Page = () => {
  const {
    data: dataRecruitmentRegisterCheck,
    isLoading: isdataRecruitmentLoading,
    refetch: refetchRecruitmentRegisterCheck
  } = useIsAlreadyRegisteredQuery({});

  const {
    data: activeFormData,
    isLoading: isActiveFormLoading
  } = useGetActiveRecruitmentFormQuery({});

  const activeForm = activeFormData?.form;

  const { theme } = useTheme();
  const [step, setStep] = useState(1);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const { user } = useSelector((state: any) => state.auth);
  const [
    recruitmentFormSubmission,
    { data, isSuccess, error, isLoading: isSubmissionLoading },
  ] = useRecruitmentFormSubmissionMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "submitted successfully!";
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
        transition: Bounce,
      });
      refetchRecruitmentRegisterCheck();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        console.log(errorData.data.message);
        toast.error(errorData.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
          theme: theme,
        });
      }
    }
  }, [isSuccess, error, theme, refetchRecruitmentRegisterCheck]);

  // Dynamic Schema Generation for Step 3 (Role Specific)
  const dynamicSchema = useMemo(() => {
    if (!activeForm || !selectedPositions.length) return Yup.object();

    let schemaShape: any = {};

    selectedPositions.forEach((posName) => {
      // Find the role definition in the active form
      const roleDef = activeForm.roles.find((r: any) => r.roleName === posName);
      if (roleDef) {
        let roleShape: any = {};
        roleDef.fields.forEach((field: any) => {
          let validator = Yup.string(); // Default to string

          if (field.type === 'email') {
            validator = validator.email("Invalid email format");
          }
          else if (field.type === 'url') {
            validator = validator.url("Invalid URL format");
          }

          if (field.required) {
            validator = validator.required(`${field.label} is required`);
          }

          roleShape[field.name] = validator;
        });

        // Add the role object schema to the main shape
        schemaShape[posName] = Yup.object().shape(roleShape);
      }
    });

    return Yup.object().shape({
      roleSpecific: Yup.object().shape(schemaShape)
    });
  }, [selectedPositions, activeForm]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // Step 1
      fullName: "",
      email: (user?.email as string) || "",
      phoneNumber: "",
      rollNumber: "",
      branch: "",
      branchYear: "",
      positions: [],

      // Step 3 (Dynamic)
      roleSpecific: {},

      // Step 4
      linkedIn: "",
      portfolio: "",
      previousClubs: "",
    },
    validationSchema:
      step === 1
        ? step1Schema
        : step === 2
          ? dynamicSchema
          : step4Schema,
    onSubmit: async (values) => {
      console.log("Submitted Data:", values);
      const data = {
        formId: activeForm?._id,
        generalInfo: {
          fullName: values.fullName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          rollNumber: values.rollNumber,
          branch: values.branch,
          branchYear: values.branchYear,
          positions: values.positions,
        },
        roleSpecific: values.roleSpecific,
        finalInfo: {
          linkedIn: values.linkedIn,
          portfolio: values.portfolio,
          previousClubs: values.previousClubs,
        },
      };
      await recruitmentFormSubmission(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit, setFieldValue } = formik;

  const handleNext = async () => {
    // Trigger form validation for the current step
    const isValid = await formik.validateForm();

    // Debug validation
    console.log("Validation Errors for Step", step, isValid);
    console.log("Current Values:", values);

    // ValidateForm returns errors object. If empty, valid.
    const stepErrors = (step === 1)
      ? ['fullName', 'phoneNumber', 'rollNumber', 'branch', 'branchYear', 'positions']
      : (step === 2)
        ? ['roleSpecific']
        : ['previousClubs']; // linkedIn/portfolio optional usually or handled by schema

    // But formik.errors is the source of truth after validateForm.
    // Because schema changes per step, validateForm() only validates current step schema!
    // So checking Object.keys(isValid).length is correct IF validationSchema is correct.

    if (Object.keys(isValid).length === 0) {
      if (step < 3) {
        setStep(step + 1);
      }
    } else {
      // Recursively create touched object from errors so nested fields show their error messages
      const generateTouched = (errObj: any): any => {
        if (!errObj) return undefined;
        if (typeof errObj === 'string') return true;
        if (typeof errObj === 'object') {
          const touchedShape: any = {};
          Object.keys(errObj).forEach(key => {
            touchedShape[key] = generateTouched(errObj[key]);
          });
          return touchedShape;
        }
        return true;
      };

      formik.setTouched(generateTouched(isValid));
      toast.error("Please fix the errors in the form to proceed", {
        position: "top-right",
        autoClose: 3000,
        theme: theme,
        transition: Bounce,
      });
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (isdataRecruitmentLoading || isActiveFormLoading) {
    return <Loader />;
  }

  // If no active form is returned
  if (!activeForm && !isActiveFormLoading && !dataRecruitmentRegisterCheck?.isRegistered) {
    return (
      <div className="min-h-screen w-full relative flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Active Recruitment</h2>
          <p>There are currently no active recruitment forms.</p>
        </div>
      </div>
    );
  }

  if (dataRecruitmentRegisterCheck?.isRegistered) {
    return (
      <div className="min-h-screen w-full relative">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto shadow-lg rounded-lg  gradient-card">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold mb-4">
                🎉 Application Submitted!
              </h2>
              <p>Your application has been submitted successfully. ✅</p>
              <p>
                We will review your responses and get back to you soon. Stay
                tuned for updates! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Transform activeForm roles for selector
  const positionList = activeForm?.roles.map((r: any) => ({
    label: r.roleName,
    value: r.roleName
  })) || [];

  return (
    <div className="min-h-screen w-full relative">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto shadow-lg rounded-lg gradient-card">
          <div className="p-6 md:p-8">
            {/* Heading and descriptions */}
            <div className="flex justify-between items-center mb-8">
              <div className="space-y-1">
                <h1 className="text-3xl max-md:text-2xl font-bold from-blue-400  to-blue-600 bg-gradient-to-b bg-clip-text text-transparent">
                  {activeForm?.title || "Recruitment Form"}
                </h1>
                <div className="flex space-x-2 my-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all  ${i === step
                        ? "w-8 bg-blue-500"
                        : "w-4 bg-gray-300 dark:bg-gray-600"
                        }`}
                    ></div>
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-300 text-nowrap ms-4">
                Step {step} of 3
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:gap-0 gap-5">
                    <CustomInput
                      label="Full Name"
                      id="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      handleChange={handleChange}
                      value={values.fullName}
                      error={errors.fullName}
                      touched={touched.fullName}
                    />

                    <CustomInput
                      label="Email"
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      handleChange={handleChange}
                      value={values.email}
                      error={errors.email}
                      touched={touched.email}
                      disabled={true}
                    />
                  </div>

                  <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:gap-0 gap-5">
                    <CustomInput
                      label="Phone Number"
                      id="phoneNumber"
                      type="number"
                      placeholder="Enter your phone number"
                      handleChange={handleChange}
                      value={values.phoneNumber}
                      error={errors.phoneNumber}
                      touched={touched.phoneNumber}
                    />

                    <CustomInput
                      label="Class Roll Number"
                      id="rollNumber"
                      type="text"
                      placeholder="eg.- 24/CSE/XXX, 23/ECE/XXX"
                      handleChange={handleChange}
                      value={values.rollNumber}
                      error={errors.rollNumber}
                      touched={touched.rollNumber}
                    />
                  </div>

                  <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:gap-0 gap-5">
                    <CustomSelector
                      id="branch"
                      label="Branch"
                      value={values.branch}
                      error={errors.branch}
                      touched={touched.branch}
                      setFieldValue={setFieldValue}
                      list={branch}
                    />

                    <CustomSelector
                      id="branchYear"
                      label="Year"
                      value={values.branchYear}
                      error={errors.branchYear}
                      touched={touched.branchYear}
                      setFieldValue={setFieldValue}
                      list={year}
                    />
                  </div>

                  <CustomMultiSelector
                    id="positions"
                    label="Positions"
                    value={values.positions}
                    error={errors.positions}
                    touched={touched.positions}
                    setFieldValue={(field, value) => {
                      setFieldValue(field, value);
                      setSelectedPositions(value);
                    }}
                    list={positionList}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-xl mb-3 font-bold from-red-400  to-red-600 bg-gradient-to-b bg-clip-text text-transparent">
                    Role-Specific Questions
                  </h2>

                  {selectedPositions.map((posName) => {
                    const roleDef = activeForm?.roles.find((r: any) => r.roleName === posName);
                    if (!roleDef) return null;

                    return (
                      <div key={posName} className="mb-6">
                        <h2 className="text-lg font-bold from-yellow-400 to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent mb-4">
                          {posName}
                        </h2>
                        {roleDef.description && (
                          <p className="text-sm text-gray-500 mb-4">{roleDef.description}</p>
                        )}

                        <div className="space-y-4">
                          {roleDef.fields.map((field: any) => {
                            // Use bracket notation for paths with spaces: roleSpecific["Role Name"]["fieldName"]
                            const fieldPath = `roleSpecific["${posName}"]["${field.name}"]`;
                            const fieldError = getIn(errors, fieldPath);
                            const fieldTouched = getIn(touched, fieldPath);
                            const fieldValue = getIn(values, fieldPath) || "";

                            if (field.type === 'textarea') {
                              return (
                                <CustomTextArea
                                  key={field.name}
                                  label={field.label}
                                  id={fieldPath}
                                  placeholder={field.placeholder || ""}
                                  handleChange={(e) => setFieldValue(fieldPath, e.target.value)}
                                  value={fieldValue}
                                  error={fieldError}
                                  touched={fieldTouched}
                                  rows={2}
                                />
                              );
                            } else if (field.type === 'select') {
                              return (
                                <CustomSelector
                                  key={field.name}
                                  id={fieldPath}
                                  label={field.label}
                                  value={fieldValue}
                                  error={fieldError}
                                  touched={fieldTouched}
                                  setFieldValue={setFieldValue}
                                  list={field.options || []}
                                />
                              );
                            } else {
                              return (
                                <CustomInput
                                  key={field.name}
                                  label={field.label}
                                  id={fieldPath}
                                  type={field.type}
                                  placeholder={field.placeholder || ""}
                                  handleChange={(e) => setFieldValue(fieldPath, e.target.value)}
                                  value={fieldValue}
                                  error={fieldError}
                                  touched={fieldTouched}
                                />
                              );
                            }
                          })}
                        </div>
                      </div>
                    )
                  })}
                </>
              )}

              {step === 3 && (
                <>
                  <CustomInput
                    label="LinkedIn URL"
                    id="linkedIn"
                    type="text"
                    placeholder="Enter URL(write NA if not applicable)"
                    handleChange={handleChange}
                    value={values.linkedIn}
                    error={errors.linkedIn}
                    touched={touched.linkedIn}
                  />

                  <CustomInput
                    label="Portfolio URL"
                    id="portfolio"
                    type="text"
                    placeholder="Enter URL(write NA if not applicable)"
                    handleChange={handleChange}
                    value={values.portfolio}
                    error={errors.portfolio}
                    touched={touched.portfolio}
                  />

                  <CustomInput
                    label="Previous Clubs"
                    id="previousClubs"
                    type="text"
                    placeholder="write NA if not applicable"
                    handleChange={handleChange}
                    value={values.previousClubs}
                    error={errors.previousClubs}
                    touched={touched.previousClubs}
                  />
                </>
              )}

              <div className="flex justify-between w-full end mt-6">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={handlePrevious}
                    className="font-semibold text-base bg-gray-500 hover:bg-gray-600 text-slate-100 transition-colors duration-300 ease-in-out"
                  >
                    Previous
                  </Button>
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="font-semibold ms-auto bg-gradient-to-bl from-blue-600 to-blue-950 text-white transition-colors duration-300 ease-in-out"
                  >
                    Next <MdKeyboardArrowRight />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmissionLoading}
                    className="font-semibold text-base dark:text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 transition-colors duration-300 ease-in-out"
                  >
                    {isSubmissionLoading && (
                      <ImSpinner2 className="mr-2 h-4 w-4 animate-spin text-primary-foreground" />
                    )}
                    {isSubmissionLoading ? "Submitting..." : "Submit"}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
