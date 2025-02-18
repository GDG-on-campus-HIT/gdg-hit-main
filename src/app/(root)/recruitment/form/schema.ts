import * as Yup from "yup";

// Step 1: General Information
export const step1Schema = Yup.object().shape({
  fullName: Yup.string().required("Please enter your full name"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter your email"),
    phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Please enter your phone number"),
  rollNumber: Yup.string().required("Please enter your roll number"),
  branch: Yup.string().required("Please select your branch"),
  branchYear: Yup.string().required("Please select your year"),
  positions: Yup.array()
    .of(Yup.string())
    .min(1, "Please select at least one position")
    .required("Please select the position(s) you are applying for"),
});


// Step 3: Role-Specific Questions
export const getStep3Schema = (selectedPositions: string[]) => {
  const roleSchemas: Record<string, Yup.ObjectSchema<any>> = {
    webDeveloper: Yup.object().shape({
      technologies: Yup.string().required("This field is required!"),
      projects: Yup.string().required("This field is required!"),
      learning: Yup.string().required("This field is required!"),
      featureSuggestion: Yup.string().required("This field is required!"),
    }),
    appDeveloper: Yup.object().shape({
      technologies: Yup.string().required("This field is required!"),
      projects: Yup.string().required("This field is required!"),
      learning: Yup.string().required("This field is required!"),
      featureSuggestion: Yup.string().required("This field is required!"),
    }),
    machineLearning: Yup.object().shape({
      technologies: Yup.string().required("This field is required!"),
      projects: Yup.string().required("This field is required!"),
      learning: Yup.string().required("This field is required!"),
    }),
    techMember: Yup.object().shape({
      technologies: Yup.string().required("This field is required!"),
      learning: Yup.string().required("This field is required!"),
    }),

    publicRelations: Yup.object().shape({
      mockPost: Yup.string().required("This field is required!"),
      experience : Yup.string().required("This field is required!"),
    }),
    videoEditor: Yup.object().shape({
      tools: Yup.string().required("This field is required!"),
      videoLink: Yup.string().required("This field is required!"),
      motionGraphics: Yup.string().required("This field is required!"),
    }),
    contentWriter: Yup.object().shape({
      hasWrittenBefore: Yup.string().required("This field is required!"),
    }),
    graphicsDesigner: Yup.object().shape({
      designTools:Yup.string().required("This field is required!"),
      portfolioLink: Yup.string().required("This field is required!"),
      socialMediaDesign: Yup.string().required("This field is required!"),
    }),
    photographer: Yup.object().shape({
      photographyType: Yup.string().required("This field is required!"),
      eventExperience: Yup.string().required("This field is required!"),
      photographyPortfolio: Yup.string().required("This field is required!"),
      cameraModel: Yup.string().required("This field is required!"),
    }),
  };

  let dynamicSchema = Yup.object();
  selectedPositions.forEach((position) => {
    if (roleSchemas[position]) {
      dynamicSchema = dynamicSchema.concat(
        Yup.object().shape({
          [position]: roleSchemas[position],
        })
      );
    }
  });

  return dynamicSchema;
};

// Step 4: Final Information
export const step4Schema = Yup.object().shape({
  linkedIn: Yup.string().nullable(),
  portfolio: Yup.string().nullable(),
  previousClubs: Yup.string().required("This field is required!"),
});
