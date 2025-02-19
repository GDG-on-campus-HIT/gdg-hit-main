"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import CustomInput from "./CustomInput";
import CustomSelector from "./CustomSelector";
import CustomMultiSelector from "./CustomMultiSelector";
import { getStep3Schema, step1Schema, step4Schema } from "./schema";
import CustomTextArea from "./CustomTextArea";
import { MdKeyboardArrowRight } from "react-icons/md";
import { branch, position, year } from "./data";
import {
  useIsAlreadyRegisteredQuery,
  useRecruitmentFormSubmissionMutation,
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
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: {
      // Step 1
      fullName: "",
      email: (user?.email as string) || "",
      phoneNumber: "",
      rollNumber: "",
      branch: "",
      branchYear: "",
      positions: [],

      // Step 3
      webDeveloper: {
        technologies: "",
        projects: "",
        learning: "",
        featureSuggestion: "",
      },
      appDeveloper: {
        technologies: "",
        projects: "",
        learning: "",
        featureSuggestion: "",
      },
      machineLearning: {
        technologies: "",
        projects: "",
        learning: "",
      },
      techMember: {
        technologies: "",
        learning: "",
      },
      publicRelations: {
        mockPost: "",
        experience: "",
      },
      videoEditor: {
        tools: "",
        videoLink: "",
        motionGraphics: "",
      },
      contentWriter: {
        hasWrittenBefore: "",
      },
      graphicsDesigner: {
        designTools: "",
        portfolioLink: "",
        socialMediaDesign: "",
      },
      photographer: {
        photographyType: "",
        eventExperience: "",
        photographyPortfolio: "",
        cameraModel: "",
      },

      // Step 4
      linkedIn: "",
      portfolio: "",
      previousClubs: "",
    },
    validationSchema:
      step === 1
        ? step1Schema
        : step === 2
        ? getStep3Schema(selectedPositions)
        : step4Schema,
    onSubmit: async (values) => {
      console.log("Submitted Data:", values);
      const data = {
        generalInfo: {
          fullName: values.fullName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          rollNumber: values.rollNumber,
          branch: values.branch,
          branchYear: values.branchYear,
          positions: values.positions,
        },
        roleSpecific: {
          webDeveloper: values.webDeveloper,
          appDeveloper: values.appDeveloper,
          machineLearning: values.machineLearning,
          techMember: values.techMember,
          publicRelations: values.publicRelations,
          videoEditor: values.videoEditor,
          contentWriter: values.contentWriter,
          graphicsDesigner: values.graphicsDesigner,
          photographer: values.photographer,
        },
        finalInfo: {
          linkedIn: values.linkedIn,
          portfolio: values.portfolio,
          previousClubs: values.previousClubs,
        },
      };
      await recruitmentFormSubmission(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit, setFieldValue } =
    formik;

  const handleNext = async () => {
    // Trigger form validation for the current step
    const isValid = await formik.validateForm();

    if (Object.keys(isValid).length === 0) {
      // If the form is valid, proceed to the next step
      if (step < 3) {
        setStep(step + 1);
      }
    } else {
      // If the form is not valid, show the validation errors
      formik.setTouched({
        ...formik.touched,
        ...Object.keys(isValid).reduce(
          (acc: { [key: string]: boolean }, key) => {
            acc[key] = true;
            return acc;
          },
          {}
        ),
      });
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  if (isdataRecruitmentLoading) {
    return <Loader />;
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

  return (
    <div className="min-h-screen w-full relative">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto shadow-lg rounded-lg  gradient-card">
          <div className="p-6 md:p-8">
            {/* Heading and descriptions */}
            <div className="flex justify-between items-center mb-8">
              <div className="space-y-1">
                <h1 className="text-3xl max-md:text-2xl font-bold from-blue-400  to-blue-600 bg-gradient-to-b bg-clip-text text-transparent">
                  GDG HIT Recruitment
                </h1>
                <div className="flex space-x-2 my-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-2 rounded-full transition-all  ${
                        i === step
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
                    list={position}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <h2 className="text-xl mb-3 font-bold from-red-400  to-red-600 bg-gradient-to-b bg-clip-text text-transparent">
                    Role-Specific Questions
                  </h2>
                  {selectedPositions.includes("webDeveloper") && (
                    <>
                      <h2 className="text-lg font-bold from-yellow-400  to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent">
                        Web Developer
                      </h2>
                      <CustomTextArea
                        label="What languages and tools do you use for web development?"
                        id="webDeveloper.technologies"
                        placeholder="eg.: HTML, CSS, JavaScript, React, Nodejs"
                        handleChange={handleChange}
                        value={values.webDeveloper.technologies}
                        error={errors.webDeveloper?.technologies}
                        touched={touched.webDeveloper?.technologies}
                        rows={2}
                      />

                      <CustomTextArea
                        label="Have you created any personal websites or projects?"
                        id="webDeveloper.projects"
                        placeholder="Please share links if available"
                        handleChange={handleChange}
                        value={values.webDeveloper.projects}
                        error={errors.webDeveloper?.projects}
                        touched={touched.webDeveloper?.projects}
                        rows={2}
                      />
                      <CustomTextArea
                        label="What’s a concept or tool you’re currently learning?"
                        id="webDeveloper.learning"
                        placeholder="Share what you are currently learing about"
                        handleChange={handleChange}
                        value={values.webDeveloper.learning}
                        error={errors.webDeveloper?.learning}
                        touched={touched.webDeveloper?.learning}
                        rows={2}
                      />

                      <CustomTextArea
                        label="If you had the chance, what feature would you add to the GDG HIT website?"
                        id="webDeveloper.featureSuggestion"
                        placeholder="Share your creative ideas"
                        handleChange={handleChange}
                        value={values.webDeveloper.featureSuggestion}
                        error={errors.webDeveloper?.featureSuggestion}
                        touched={touched.webDeveloper?.featureSuggestion}
                        rows={2}
                      />
                    </>
                  )}

                  {selectedPositions.includes("appDeveloper") && (
                    <>
                      <h2 className="text-lg font-bold from-yellow-400  to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent">
                        App Developer
                      </h2>
                      <CustomTextArea
                        label="Do you develop apps for Android, iOS, or both? Which tools or languages do you use?"
                        id="appDeveloper.technologies"
                        placeholder="eg.: Java, Dart, Android Studio, Flutter, React Native"
                        handleChange={handleChange}
                        value={values.appDeveloper.technologies}
                        error={errors.appDeveloper?.technologies}
                        touched={touched.appDeveloper?.technologies}
                        rows={2}
                      />

                      <CustomTextArea
                        label="Have you built any apps before?"
                        id="appDeveloper.projects"
                        placeholder="Please share links if available"
                        handleChange={handleChange}
                        value={values.appDeveloper.projects}
                        error={errors.appDeveloper?.projects}
                        touched={touched.appDeveloper?.projects}
                        rows={2}
                      />
                      <CustomTextArea
                        label="What’s a concept or tool you’re currently learning?"
                        id="appDeveloper.learning"
                        placeholder="Share what you are currently learing about"
                        handleChange={handleChange}
                        value={values.appDeveloper.learning}
                        error={errors.appDeveloper?.learning}
                        touched={touched.appDeveloper?.learning}
                        rows={2}
                      />

                      <CustomTextArea
                        label="What kind of app would you like to create for GDG HIT to help the student community?"
                        id="appDeveloper.featureSuggestion"
                        placeholder="Share your creative ideas"
                        handleChange={handleChange}
                        value={values.appDeveloper.featureSuggestion}
                        error={errors.appDeveloper?.featureSuggestion}
                        touched={touched.appDeveloper?.featureSuggestion}
                        rows={2}
                      />
                    </>
                  )}

                  {selectedPositions.includes("machineLearning") && (
                    <>
                      <h2 className="text-lg font-bold from-yellow-400  to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent">
                        Machine Learning
                      </h2>
                      <CustomTextArea
                        label="What ML frameworks and libraries do you use most often?"
                        id="machineLearning.technologies"
                        placeholder="e.g., TensorFlow, PyTorch, Scikit-Learn, Keras, etc."
                        handleChange={handleChange}
                        value={values.machineLearning.technologies}
                        error={errors.machineLearning?.technologies}
                        touched={touched.machineLearning?.technologies}
                        rows={2}
                      />

                      <CustomTextArea
                        label="Have you worked on any personal ML projects?"
                        id="machineLearning.projects"
                        placeholder="Please share links if available"
                        handleChange={handleChange}
                        value={values.machineLearning.projects}
                        error={errors.machineLearning?.projects}
                        touched={touched.machineLearning?.projects}
                        rows={2}
                      />
                      <CustomTextArea
                        label="What’s an ML concept or tool you are currently learning?"
                        id="machineLearning.learning"
                        placeholder="Share what you are currently learing about"
                        handleChange={handleChange}
                        value={values.machineLearning.learning}
                        error={errors.machineLearning?.learning}
                        touched={touched.machineLearning?.learning}
                        rows={2}
                      />
                    </>
                  )}

                  {selectedPositions.includes("techMember") && (
                    <>
                      <h2 className="text-lg font-bold from-yellow-400  to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent">
                        Tech Member
                      </h2>
                      <CustomTextArea
                        label="What technologies and programming languages are you most comfortable with?"
                        id="techMember.technologies"
                        placeholder="e.g., Java, Python, C++, etc."
                        handleChange={handleChange}
                        value={values.techMember.technologies}
                        error={errors.techMember?.technologies}
                        touched={touched.techMember?.technologies}
                        rows={2}
                      />
                      <CustomTextArea
                        label="What’s a new technology or concept you are currently learning?"
                        id="techMember.learning"
                        placeholder="Share what you are currently learing about"
                        handleChange={handleChange}
                        value={values.techMember.learning}
                        error={errors.techMember?.learning}
                        touched={touched.techMember?.learning}
                        rows={2}
                      />
                    </>
                  )}

                  {selectedPositions.includes("publicRelations") && (
                    <>
                      <h2 className="text-lg font-bold from-yellow-400  to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent">
                        Public Relations
                      </h2>
                      <CustomTextArea
                        label="Why do you think you are fit for Public Relations?"
                        id="publicRelations.mockPost"
                        placeholder=""
                        handleChange={handleChange}
                        value={values.publicRelations.mockPost}
                        error={errors.publicRelations?.mockPost}
                        touched={touched.publicRelations?.mockPost}
                        rows={2}
                      />

                      <CustomTextArea
                        label="Do you have experience in handling social media, outreach, or event management?"
                        id="publicRelations.experience"
                        placeholder=""
                        handleChange={handleChange}
                        value={values.publicRelations.experience}
                        error={errors.publicRelations?.experience}
                        touched={touched.publicRelations?.experience}
                        rows={2}
                      />
                    </>
                  )}

                  {selectedPositions.includes("videoEditor") && (
                    <>
                      <h2 className="text-lg font-bold from-yellow-400  to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent">
                        Video Editor
                      </h2>
                      <CustomTextArea
                        label="Which video editing tools do you use"
                        id="videoEditor.tools"
                        placeholder="eg.-Premiere Pro, DaVinci Resolve, CapCut, etc"
                        handleChange={handleChange}
                        value={values.videoEditor?.tools}
                        error={errors.videoEditor?.tools}
                        touched={touched.videoEditor?.tools}
                        rows={2}
                      />

                      <CustomTextArea
                        label="Provide a link to a video you've edited"
                        id="videoEditor.videoLink"
                        placeholder=""
                        handleChange={handleChange}
                        value={values.videoEditor.videoLink}
                        error={errors.videoEditor?.videoLink}
                        touched={touched.videoEditor?.videoLink}
                        rows={2}
                      />

                      <CustomTextArea
                        label="Are you familiar with color grading, motion graphics, or animations?"
                        id="videoEditor.motionGraphics"
                        placeholder=""
                        handleChange={handleChange}
                        value={values.videoEditor.motionGraphics}
                        error={errors.videoEditor?.motionGraphics}
                        touched={touched.videoEditor?.motionGraphics}
                        rows={2}
                      />
                    </>
                  )}

                  {selectedPositions.includes("contentWriter") && (
                    <>
                      <h2 className="text-lg font-bold from-yellow-400  to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent">
                        Content Writer
                      </h2>
                      <CustomTextArea
                        label="Have you written blogs/articles before"
                        id="contentWriter.hasWrittenBefore"
                        placeholder=" If Yes, share a sample or link"
                        handleChange={handleChange}
                        value={values.contentWriter?.hasWrittenBefore}
                        error={errors.contentWriter?.hasWrittenBefore}
                        touched={touched.contentWriter?.hasWrittenBefore}
                        rows={2}
                      />
                    </>
                  )}

                  {selectedPositions.includes("graphicsDesigner") && (
                    <>
                      <h2 className="text-lg font-bold from-yellow-400  to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent">
                        Graphic Designer
                      </h2>
                      <CustomTextArea
                        label="Which design tools do you use?"
                        id="graphicsDesigner.designTools"
                        placeholder="eg.- Photoshop, Illustrator, Figma, Canva, etc"
                        handleChange={handleChange}
                        value={values.graphicsDesigner?.designTools}
                        error={errors.graphicsDesigner?.designTools}
                        touched={touched.graphicsDesigner?.designTools}
                        rows={1}
                      />

                      <CustomTextArea
                        label="Provide a link to your design portfolio"
                        id="graphicsDesigner.portfolioLink"
                        placeholder=""
                        handleChange={handleChange}
                        value={values.graphicsDesigner?.portfolioLink}
                        error={errors.graphicsDesigner?.portfolioLink}
                        touched={touched.graphicsDesigner?.portfolioLink}
                        rows={1}
                      />

                      <CustomTextArea
                        label="Are you comfortable creating social media banners, event posters, and UI/UX designs?"
                        id="graphicsDesigner.socialMediaDesign"
                        placeholder="Yes/No"
                        handleChange={handleChange}
                        value={values.graphicsDesigner?.socialMediaDesign}
                        error={errors.graphicsDesigner?.socialMediaDesign}
                        touched={touched.graphicsDesigner?.socialMediaDesign}
                        rows={1}
                      />
                    </>
                  )}

                  {selectedPositions.includes("photographer") && (
                    <>
                      <h2 className="text-lg font-bold from-yellow-400  to-yellow-600 bg-gradient-to-b bg-clip-text text-transparent">
                        Photographer
                      </h2>
                      <CustomTextArea
                        label="What type of photography are you skilled in?"
                        id="photographer.photographyType"
                        placeholder="eg.- Event, Portrait, Product, etc"
                        handleChange={handleChange}
                        value={values.photographer?.photographyType}
                        error={errors.photographer?.photographyType}
                        touched={touched.photographer?.photographyType}
                        rows={1}
                      />

                      <CustomTextArea
                        label="Do you have experience covering live events?"
                        id="photographer.eventExperience"
                        placeholder=""
                        handleChange={handleChange}
                        value={values.photographer?.eventExperience}
                        error={errors.photographer?.eventExperience}
                        touched={touched.photographer?.eventExperience}
                        rows={1}
                      />

                      <CustomTextArea
                        label="Provide a link to your photography portfolio"
                        id="photographer.photographyPortfolio"
                        placeholder=""
                        handleChange={handleChange}
                        value={values.photographer?.photographyPortfolio}
                        error={errors.photographer?.photographyPortfolio}
                        touched={touched.photographer?.photographyPortfolio}
                        rows={1}
                      />

                      <CustomTextArea
                        label="Do you own a DSLR/Mirrorless camera or use a smartphone for photography?"
                        id="photographer.cameraModel"
                        placeholder=""
                        handleChange={handleChange}
                        value={values.photographer?.cameraModel}
                        error={errors.photographer?.cameraModel}
                        touched={touched.photographer?.cameraModel}
                        rows={1}
                      />
                    </>
                  )}
                  {/* Add other role-specific fields similarly */}
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

              <div className="flex justify-between w-full end">
                {step > 1 && (
                  <Button
                    type="button"
                    onClick={handlePrevious}
                    className="font-semibold text-base bg-gray-500 hover:bg-gray-600 text-slate-100 transition-colors duration-300 ease-in-out mt-2"
                  >
                    Previous
                  </Button>
                )}

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="font-semibold ms-auto bg-gradient-to-bl from-blue-600 to-blue-950  text-white transition-colors duration-300 ease-in-out mt-2"
                  >
                    Next <MdKeyboardArrowRight />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmissionLoading}
                    className="font-semibold text-base dark:text-white bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 transition-colors duration-300 ease-in-out mt-2"
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
