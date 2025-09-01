"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { Bounce, toast } from "react-toastify";
import { useTheme } from "next-themes";
import { useStudentRegistrationMutation } from "@/redux/features/api/apiSlice";
import { useParams } from "next/navigation";


const {id}=useParams();

console.log(id);


// ✅ Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  department: Yup.string().required("Department is required"),
  rollNo: Yup.string()
    .matches(
      /^\d{2}\/[A-Z]+\/\d{3}$/,
      "Format: YY/BRANCH/XXX (e.g., 24/CSE/001)"
    )
    .required("Roll number is required"),
  batch: Yup.string().required("Batch is required"),
  year: Yup.string().required("Year is required"),
  contactNo: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
    .required("Contact number is required"),
  whatsappNo: Yup.string()
    .matches(/^[0-9]{10}$/, "WhatsApp number must be 10 digits")
    .required("WhatsApp number is required"),
  emailAddress: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

const StudentFormPage = () => {
  const { theme } = useTheme();
  const [studentRegistration, { isLoading }] =
    useStudentRegistrationMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      department: "",
      rollNo: "",
      batch: "",
      year: "",
      contactNo: "",
      whatsappNo: "",
      emailAddress: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await studentRegistration({
          ...values,
          type: "student_registration",
        });

        toast.success("Form submitted successfully!", {
          position: "top-right",
          autoClose: 5000,
          theme: theme,
          transition: Bounce,
        });

        formik.resetForm();
      } catch (error) {
        toast.error("Failed to submit form. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          theme: theme,
          transition: Bounce,
        });
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  const departmentOptions = [
    "Computer Science Engineering (CSE)",
    "Computer Science Engineering with Artificial Intelligence & Machine Learning (CSE-AI&ML)",
    "Computer Science Engineering with Data Science (CSE-DS)",
    "Computer Science Engineering with Cyber Security (CSE-CS)",
    "Electronics & Communication Engineering (ECE)",
    "Electrical Engineering (EE)",
    "Mechanical Engineering (ME)",
    "Civil Engineering (CE)",
    "Information Technology (IT)",
    "Biotechnology (BT)",
    "Chemical Engineering (CHE)",
  ];

  const batchOptions = ["Batch 1", "Batch 2", "Batch 3"];
  const yearOptions = ["2nd Year", "3rd Year"];

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 pt-20">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className="w-full max-w-2xl relative">
        {/* Background Effects */}
        <div className="absolute -top-20 -right-20 w-48 md:w-64 h-48 md:h-64 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-48 md:w-64 h-48 md:h-64 bg-blue-500/10 rounded-full blur-3xl" />

        {/* Main Container */}
        <div className="relative backdrop-blur-xl dark:bg-gray-950/50 bg-gray-200 rounded-2xl md:rounded-3xl p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-600 to-neutral-800 dark:from-neutral-50 dark:to-neutral-400 mb-2">
              Student Registration Form
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              Please fill in your details to register with GDG HIT
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name + Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    errors.name && touched.name
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                  placeholder="Enter your full name"
                />
                {errors.name && touched.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Department *
                </label>
                <select
                  id="department"
                  name="department"
                  value={values.department}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    errors.department && touched.department
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                >
                  <option value="">Select Department</option>
                  {departmentOptions.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.department && touched.department && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.department}
                  </p>
                )}
              </div>
            </div>

            {/* Roll No + Batch + Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="rollNo"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Roll Number *
                </label>
                <input
                  type="text"
                  id="rollNo"
                  name="rollNo"
                  value={values.rollNo}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    errors.rollNo && touched.rollNo
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                  placeholder="e.g., 24/CSE/001"
                />
                {errors.rollNo && touched.rollNo && (
                  <p className="mt-1 text-sm text-red-600">{errors.rollNo}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="batch"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Batch *
                </label>
                <select
                  id="batch"
                  name="batch"
                  value={values.batch}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    errors.batch && touched.batch
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                >
                  <option value="">Select Batch</option>
                  {batchOptions.map((batch) => (
                    <option key={batch} value={batch}>
                      {batch}
                    </option>
                  ))}
                </select>
                {errors.batch && touched.batch && (
                  <p className="mt-1 text-sm text-red-600">{errors.batch}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Year *
                </label>
                <select
                  id="year"
                  name="year"
                  value={values.year}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    errors.year && touched.year
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                >
                  <option value="">Select Year</option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.year && touched.year && (
                  <p className="mt-1 text-sm text-red-600">{errors.year}</p>
                )}
              </div>
            </div>

            {/* Contact Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="contactNo"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Contact Number *
                </label>
                <input
                  type="tel"
                  id="contactNo"
                  name="contactNo"
                  value={values.contactNo}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    errors.contactNo && touched.contactNo
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                  placeholder="10 digit number"
                />
                {errors.contactNo && touched.contactNo && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.contactNo}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="whatsappNo"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  id="whatsappNo"
                  name="whatsappNo"
                  value={values.whatsappNo}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                    errors.whatsappNo && touched.whatsappNo
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                  placeholder="10 digit number"
                />
                {errors.whatsappNo && touched.whatsappNo && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.whatsappNo}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="emailAddress"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address *
              </label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                value={values.emailAddress}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  errors.emailAddress && touched.emailAddress
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`}
                placeholder="Enter your email address"
              />
              {errors.emailAddress && touched.emailAddress && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.emailAddress}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? "Submitting..." : "Submit Registration"}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
            <p>All fields marked with * are required</p>
            <p className="mt-1">
              Your information will be used for GDG HIT community purposes only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFormPage;
