"use client";
import React, { useMemo, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/spotlight";
import { Bounce, toast } from "react-toastify";
import { useTheme } from "next-themes";
import { useStudentRegistrationMutation } from "@/redux/features/api/apiSlice";
import { useParams } from "next/navigation";

const StudentFormPage = () => {
  const { theme } = useTheme();
  const params = useParams();
  const id = params?.id;
  
  const [studentRegistration, { isLoading }] =
    useStudentRegistrationMutation();

  // ✅ Memoized validation schema for performance
  const validationSchema = useMemo(() => Yup.object({
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
  }), []);

  // Memoized initial values
  const initialValues = useMemo(() => ({
    name: "",
    department: "",
    rollNo: "",
    batch: "",
    year: "",
    contactNo: "",
    whatsappNo: "",
    emailAddress: "",
  }), []);

  // Memoized form submission handler
  const handleFormSubmit = useCallback(async (values: typeof initialValues) => {
    try {
      await studentRegistration({
        ...values,
        type: "student_registration",
        ...(id && { formId: id }),
      }).unwrap();

      toast.success("Form submitted successfully!", {
        position: "top-right",
        autoClose: 5000,
        theme: theme || "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit form. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        theme: theme || "light",
        transition: Bounce,
      });
    }
  }, [studentRegistration, theme, id]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleFormSubmit(values).then(() => {
        resetForm();
      });
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  // Memoized options for better performance
  const departmentOptions = useMemo(() => [
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
  ], []);

  const batchOptions = useMemo(() => ["Batch 1", "Batch 2", "Batch 3"], []);
  const yearOptions = useMemo(() => ["2nd Year", "3rd Year"], []);

  // Memoized input class generator
  const getInputClasses = useCallback((fieldName: keyof typeof errors) => {
    const hasError = errors[fieldName] && touched[fieldName];
    return `w-full px-4 py-3 rounded-lg border transition-colors ${
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : "border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
    } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100`;
  }, [errors, touched]);

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
                  className={getInputClasses("name")}
                  placeholder="Enter your full name"
                  autoComplete="name"
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
                  className={getInputClasses("department")}
                  autoComplete="organization"
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
                  className={getInputClasses("rollNo")}
                  placeholder="e.g., 24/CSE/001"
                  autoComplete="off"
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
                  className={getInputClasses("batch")}
                  autoComplete="off"
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
                  className={getInputClasses("year")}
                  autoComplete="off"
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
                  className={getInputClasses("contactNo")}
                  placeholder="10 digit number"
                  autoComplete="tel"
                  maxLength={10}
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
                  className={getInputClasses("whatsappNo")}
                  placeholder="10 digit number"
                  autoComplete="tel"
                  maxLength={10}
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
                className={getInputClasses("emailAddress")}
                placeholder="Enter your email address"
                autoComplete="email"
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
