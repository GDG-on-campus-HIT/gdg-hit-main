"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useFormik, getIn } from "formik";
import { Button } from "@/components/ui/button";
import CustomInput from "./CustomInput";
import CustomSelector from "./CustomSelector";
import CustomMultiSelector from "./CustomMultiSelector";
import CustomTextArea from "./CustomTextArea";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { branch, year } from "./data";
import { step1Schema, step4Schema } from "./schema";
import * as Yup from "yup";
import {
  useIsAlreadyRegisteredQuery,
  useRecruitmentFormSubmissionMutation,
  useGetActiveRecruitmentFormQuery,
  useLoadUserQuery
} from "@/redux/features/api/apiSlice";
import { Bounce, toast } from "react-toastify";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader/Loader";
import { ImSpinner2 } from "react-icons/im";

import { getTheme } from "./theme.config";

const Page = () => {
  // Load user data to ensure authentication
  const { data: userData, isLoading: isUserLoading } = useLoadUserQuery({});
  const searchParams = useSearchParams();
  const formIdFromUrl = searchParams?.get("formId");

  const {
    data: dataRecruitmentRegisterCheck,
    isLoading: isdataRecruitmentLoading,
    refetch: refetchRecruitmentRegisterCheck
  } = useIsAlreadyRegisteredQuery({});

  const {
    data: activeFormData,
    isLoading: isActiveFormLoading
  } = useGetActiveRecruitmentFormQuery({});

  // Use form ID from URL if provided, otherwise use active form
  let activeForm = activeFormData?.form;
  if (formIdFromUrl && activeFormData?.form?._id !== formIdFromUrl) {
    // If a specific form ID is requested via URL, could filter here
    // For now, we'll use the active form
    activeForm = activeFormData?.form;
  }

  const { theme } = useTheme();
  const config = getTheme();
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

    const schemaShape: any = {};

    selectedPositions.forEach((posName) => {
      // Find the role definition in the active form
      const roleDef = activeForm.roles.find((r: any) => r.roleName === posName);
      if (roleDef) {
        const roleShape: any = {};
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
      email: (user?.email as string) || (userData?.user?.email as string) || "",
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

      // Validate formId exists
      if (!activeForm?._id) {
        toast.error("No active recruitment form found. Please refresh the page.", {
          position: "top-right",
          autoClose: 5000,
          theme: theme,
          transition: Bounce,
        });
        console.error("❌ FormId is missing:", activeForm);
        return;
      }

      // Validate user is authenticated
      if (!user?.email) {
        toast.error("User authentication failed. Please log in again.", {
          position: "top-right",
          autoClose: 5000,
          theme: theme,
          transition: Bounce,
        });
        console.error("❌ User email is missing");
        return;
      }

      const data = {
        formId: activeForm._id,
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

      console.log("📤 Data being sent to server:", JSON.stringify(data, null, 2));
      console.log("📝 User Info:", { email: user.email, userId: user._id });

      try {
        await recruitmentFormSubmission(data);
      } catch (err: any) {
        console.error("❌ Submission Error Details:");
        console.error("Error object:", err);
        console.error("Response data:", err?.response?.data);
        console.error("Response status:", err?.response?.status);
        console.error("Request data:", err?.config?.data);

        // The error is already being handled by the useEffect hook, 
        // but we log it here for debugging purposes
      }
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

  if (isdataRecruitmentLoading || isActiveFormLoading || isUserLoading) {
    return <Loader />;
  }

  // If user is not authenticated
  if (!user || !user.email) {
    return (
      <div className={config.pageBgAuth}>
        <config.components.BackgroundElementsAuth />
        <div className={config.cardBg}>
          <config.components.CardTopGlow />
          <config.components.LogoElement />
          <h2 className={config.headingGradient}>{config.text.authTitle}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{config.text.authDesc}</p>
          <a href="/login" className={config.authButton}>
            {config.text.authBtn}
          </a>
        </div>
      </div>
    );
  }

  // If no active form is returned
  if (!activeForm && !isActiveFormLoading && !dataRecruitmentRegisterCheck?.isRegistered) {
    return (
      <div className={config.pageBgAuth}>
        <config.components.BackgroundElementsAuth />
        <div className={config.cardBg}>
          <config.components.CardTopGlow />
          <config.components.LogoElement />
          <h2 className={config.headingGradient}>{config.text.noFormTitle}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{config.text.noFormDesc}</p>
        </div>
      </div>
    );
  }

  if (dataRecruitmentRegisterCheck?.isRegistered) {
    return (
      <div className={config.pageBg}>
        <config.components.BackgroundElements />

        <div className={config.mainCardWrapper}>
          <div className={config.mainCardBg}>
            <config.components.CardTopGlow />
            <div className={config.mainCardPadding}>
              <config.components.LogoElement />
              <h2 className={config.successHeading}>
                {config.text.successTitle}
              </h2>
              <p className="mb-2 text-lg text-gray-500 dark:text-gray-300 font-medium">{config.text.successDesc1}</p>
              <p className="mb-8 text-gray-400">
                {config.text.successDesc2}
              </p>

              {/* WhatsApp Groups Section */}
              {dataRecruitmentRegisterCheck?.application?.positions &&
                dataRecruitmentRegisterCheck.application.positions.length > 0 && (
                  <div className="border-t pt-6 mt-6 mb-6 border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Join WhatsApp Groups</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Join the WhatsApp groups for your applied positions to stay updated!
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {dataRecruitmentRegisterCheck.application.positions.map((position: string) => {
                        const whatsappLink = dataRecruitmentRegisterCheck.application?.whatsappGroupLinks?.[position];
                        return (
                          <a
                            key={position}
                            href={whatsappLink || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-5 py-2 ${whatsappLink ? config.socialBtnWhatsapp : config.whatsappDisabled}`}
                            onClick={(e) => {
                              if (!whatsappLink) {
                                e.preventDefault();
                              }
                            }}
                          >
                            <FaWhatsapp className="text-lg" />
                            {position}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

              <div className="border-t pt-6 mt-6 border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Follow us for latest updates</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Stay connected with us on social media for announcements and updates!
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a
                    href="https://www.instagram.com/gdg_hit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 py-3 ${config.socialBtnInsta}`}
                  >
                    <FaInstagram className="text-lg" />
                    Follow on Instagram
                  </a>
                  <a
                    href="https://www.linkedin.com/company/gdgoncampushit/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-6 py-3 ${config.socialBtnLinkedin}`}
                  >
                    <FaLinkedin className="text-lg" />
                    Follow on LinkedIn
                  </a>
                </div>
              </div>
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
    <div className={config.pageBg}>
      <config.components.BackgroundElements />

      <div className={config.mainCardWrapper}>
        <div className={config.mainCardBg}>
          <config.components.CardTopGlow />
          <div className={config.mainCardPadding}>
            <config.components.LogoElement />
            {/* Heading and descriptions */}
            <div className={config.headerFlex}>
              <div className={config.headerSpace}>
                <h1 className={config.headingForm}>
                  {activeForm?.title || "Recruitment Form"}
                </h1>
                <div className={config.stepProgressWrapper}>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={i === step ? config.stepProgressActive : config.stepProgressInactive}
                    ></div>
                  ))}
                </div>
              </div>
              <span className={config.stepText}>
                {config.text.stepTextFormat(step)}
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
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className={config.roleSectionWrapper}>
                    <h2 className={config.roleSectionHeading}>
                      {config.text.roleSectionTitle}
                    </h2>
                    {config.text.roleSectionDesc && (
                      <p className={config.roleSectionDescStyle}>{config.text.roleSectionDesc}</p>
                    )}
                  </div>

                  {selectedPositions.map((posName) => {
                    const roleDef = activeForm?.roles.find((r: any) => r.roleName === posName);
                    if (!roleDef) return null;

                    return (
                      <div key={posName} className={config.roleBlockBg}>
                        <config.components.RoleBlockHoverEffect />
                        <h2 className={config.roleHeading}>
                          <config.components.RoleHeadingIcon />
                          {posName}
                        </h2>
                        {roleDef.description && (
                          <p className="text-sm font-medium text-gray-400 mb-6 italic border-l-2 border-red-900 dark:border-gray-600 pl-3 relative z-10">{roleDef.description}</p>
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
                </div>
              )}

              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className={config.roleSectionWrapper}>
                    <h2 className={config.roleSectionHeading}>
                      {config.text.step3Title}
                    </h2>
                    {config.text.step3Desc && (
                      <p className={config.roleSectionDescStyle}>{config.text.step3Desc}</p>
                    )}
                  </div>
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
                </div>
              )}

              <div className={config.buttonWrapper}>
                {step > 1 ? (
                  <Button
                    type="button"
                    onClick={handlePrevious}
                    className={config.secondaryButton}
                  >
                    {config.text.btnPrevious}
                  </Button>
                ) : <div></div>}

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className={config.primaryButtonNext}
                  >
                    {config.text.btnNext} <MdKeyboardArrowRight className="text-xl" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmissionLoading}
                    className={config.primaryButton}
                  >
                    {isSubmissionLoading && (
                      <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isSubmissionLoading ? "Submitting..." : config.text.btnSubmit}
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
