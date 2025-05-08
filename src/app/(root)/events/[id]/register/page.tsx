"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import {
  useEventRegisterMutation,
  useCheckIfEventRegisteredQuery,
} from "@/redux/features/api/event/eventApi"; // Adjust import path
import { ImSpinner2 } from "react-icons/im";
import { Bounce, toast } from "react-toastify";
import { useTheme } from "next-themes";
import { Rocket } from "lucide-react";
import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Validation schema
const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  classRollNo: Yup.string().required("Enter your class roll number"),
  department: Yup.string().required("Select your department"),
  phoneNumber: Yup.string()
    .required("Enter your WhatsApp number")
    .matches(/^\d{10}$/, "WhatsApp number must be 10 digits"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
});

// Form values type
interface FormValues {
  name: string;
  classRollNo: string;
  department: string;
  phoneNumber: string;
  email: string;
}

const EventRegistrationForm = ({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) => {
  const params = React.use(paramsPromise);
  const EVENT_ID = params.id;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { theme } = useTheme();
  const { user } = useSelector((state: any) => state.auth);

  // Department list
  const departmentList = [
    "CSE",
    "CSE-DS",
    "CSE-CS",
    "CSE-AIML",
    "ECE",
    "EE",
    "CHE",
    "AEIE",
    "ME",
    "IT",
    "BT",
    "AE",
    "FT",
    "Other",
  ];

  // Check if user is already registered
  const { data: dataEventRegisterCheck, refetch: refetchEventRegisterCheck } =
    useCheckIfEventRegisteredQuery(EVENT_ID);

  // Event registration mutation
  const [eventRegister, { data, isSuccess, error, isLoading: isUserLoading }] =
    useEventRegisterMutation();

  // Handle success and error toasts
  useEffect(() => {
    if (isSuccess) {
      toast.success("Registration Successful! 🎉", {
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
      refetchEventRegisterCheck();
      setIsSubmitted(true);
    }
    if (error) {
      // Type guard for FetchBaseQueryError
      const errorMessage = isFetchBaseQueryError(error)
        ? (error.data as { message?: string })?.message || "Registration failed. Please try again."
        : "Registration failed. Please try again.";
      toast.error(errorMessage, {
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
    }
  }, [isSuccess, error, theme, refetchEventRegisterCheck]);

  // Type guard for FetchBaseQueryError
  const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError => {
    return error != null && "status" in error;
  };

  // Formik setup
  const formik = useFormik<FormValues>({
    initialValues: {
      name: user?.name || "",
      classRollNo: user?.classRollNo || "",
      department: user?.department || "",
      phoneNumber: user?.whatsappNo || "",
      email: user?.email || "",
    },
    validationSchema: schema,
    onSubmit: async ({ name, classRollNo, department, phoneNumber, email }) => {
      const data = {
        name,
        eventId: EVENT_ID,
        user: user?.id || "mock-user-id",
        classRollNo,
        department,
        phoneNumber,
        email,
      };
      await eventRegister(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit, setFieldValue } =
    formik;

  // If already registered
  if (dataEventRegisterCheck?.success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <Card className="gradient-card shadow-lg max-w-md w-full">
          <CardContent className="text-center text-white pt-8">
            <p className="text-lg font-semibold">Registration Complete! 🎉</p>
            <p className="mt-2">You&apos;re already registered for the event.</p>
            <p className="mt-4 text-sm text-gray-400">
              Thank you for registering! A confirmation has been sent to your
              email.
            </p>
            <div className="my-8 py-10">
              <h2 className="font-semibold text-xl">Knowledge Quiz</h2>
              <p className="text-gray-400 mb-4">
                Test your React.js knowledge and get personalized recommendations
                to prepare for the workshop.
              </p>
              <Link href={`/events/${EVENT_ID}/prior-knowledge`}>
                <PrimaryButton>Test Your Skills</PrimaryButton>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="bg-black border-gray-700 shadow-lg max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Event Registration
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-gray-300">
                  Full Name*
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 ${
                    errors.name && touched.name ? "border-red-500" : ""
                  }`}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="department" className="text-gray-300">
                  Department*
                </Label>
                <Select
                  value={values.department}
                  onValueChange={(value) =>
                    setFieldValue("department", value, true)
                  }
                >
                  <SelectTrigger
                    className={`border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 ${
                      errors.department && touched.department
                        ? "border-red-500"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    {departmentList.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && touched.department && (
                  <p className="text-red-500 text-xs mt-1">{errors.department}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="classRollNo" className="text-gray-300">
                  Class Roll Number*
                </Label>
                <Input
                  id="classRollNo"
                  name="classRollNo"
                  value={values.classRollNo}
                  onChange={handleChange}
                  placeholder="Enter your roll number"
                  className={`border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 ${
                    errors.classRollNo && touched.classRollNo
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {errors.classRollNo && touched.classRollNo && (
                  <p className="text-red-500 text-xs mt-1">{errors.classRollNo}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phoneNumber" className="text-gray-300">
                  WhatsApp Number*
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your WhatsApp number"
                  className={`border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 ${
                    errors.phoneNumber && touched.phoneNumber
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-gray-300">
                  Email Address*
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 ${
                    errors.email && touched.email ? "border-red-500" : ""
                  }`}
                  disabled
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isUserLoading}
                className="w-full py-6 px-8 rounded-full font-medium text-sm text-gray-700 dark:text-white 
                          transition duration-200 hover:shadow-2xl border dark:border-white/10 
                          bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
              >
                {isUserLoading && (
                  <ImSpinner2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isUserLoading ? "Registering..." : "Register now"}
              </Button>
            </form>
          ) : (
            <div className="text-center text-white">
              <p className="text-lg">Registration Successful!</p>
              <p>Thank you for registering for the event.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventRegistrationForm;