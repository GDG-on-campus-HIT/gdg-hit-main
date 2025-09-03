"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
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
  useGetEventPosterQuery,
} from "@/redux/features/api/event/eventApi";
import { ImSpinner2 } from "react-icons/im";
import { Bounce, toast } from "react-toastify";
import { useTheme } from "next-themes";
import { Rocket } from "lucide-react";
import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// ✅ Schema
const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  classRollNo: Yup.string().required("Enter your class roll number"),
  department: Yup.string().required("Select your department"),
  batch: Yup.string().required("Select your batch"),
  year: Yup.string().required("Select your year"),
  session: Yup.string().required("Select your session"),
  email: Yup.string().required("Email is required").email("Invalid email format"),
  whatsappNo: Yup.string()
    .required("Enter your WhatsApp number")
    .matches(/^\d{10}$/, "WhatsApp number must be 10 digits"),
  paymentUTRNo: Yup.string(),
});

// ✅ Department mapping (short → full)
const departmentMapping: { [key: string]: string } = {
  ChE: "Chemical Engineering",
  CE: "Civil Engineering",
  ME: "Mechanical Engineering",
  EE: "Electrical Engineering",
  ECE: "Electronics & Communication Engineering",
  AEIE: "Applied Electronics & Instrumentation Engineering",
  CSE: "Computer Science & Engineering",
  IT: "Information Technology",
  "CSE-AIML": "Computer Science & Engineering - Artificial Intelligence and Machine Learning",
  "CSE-DS": "Computer Science & Engineering - Data Science",
  "CSE-CS": "Computer Science & Engineering - Cyber Security",
  BT: "Biotechnology",
  FT: "Food Technology",
};

interface FormValues {
  name: string;
  classRollNo: string;
  department: string;
  batch: string;
  year: string;
  session: string;
  email: string;
  whatsappNo: string;
  paymentUTRNo: string;
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

  const batchOptions = ["1st", "2nd", "3rd", "4th"];
  const yearOptions = ["1st", "2nd", "3rd", "4th"];
  const sessionOptions = ["2024-25", "2025-26", "2026-27"];

  // ✅ Queries
  const { data: dataEventRegisterCheck, refetch: refetchEventRegisterCheck } =
    useCheckIfEventRegisteredQuery(EVENT_ID);
  const { data: posterData, isLoading: isPosterLoading } =
    useGetEventPosterQuery(EVENT_ID);

  const [eventRegister, { isSuccess, error, isLoading: isUserLoading }] =
    useEventRegisterMutation();

  // ✅ Toast handling
  useEffect(() => {
    if (isSuccess) {
      toast.success("Registration Successful! 🎉", {
        position: "top-right",
        autoClose: 5000,
        theme: theme,
        transition: Bounce,
      });
      refetchEventRegisterCheck();
      setIsSubmitted(true);
    }
    if (error) {
      const errorMessage = isFetchBaseQueryError(error)
        ? (error.data as { message?: string })?.message ||
          "Registration failed. Please try again."
        : "Registration failed. Please try again.";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        theme: theme,
        transition: Bounce,
      });
    }
  }, [isSuccess, error, theme, refetchEventRegisterCheck]);

  const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError =>
    error != null && "status" in error;

  // ✅ Formik setup
  const formik = useFormik<FormValues>({
    initialValues: {
      name: user?.name || "",
      classRollNo: user?.classRollNo || "",
      department: user?.department || "",
      batch: user?.batch || "",
      year: user?.year || "",
      session: "2025-26",
      email: user?.email || "",
      whatsappNo: user?.whatsappNo || "",
      paymentUTRNo: "",
    },
    validationSchema: schema,
 onSubmit: async (values) => {
  const data = {
    name: values.name,
    eventId: EVENT_ID,
    classRollNo: values.classRollNo,
    department: departmentMapping[values.department], 
    batch: values.batch,
    year: values.year,
    session: values.session,
    email: values.email,
    whatsappNo: Number(values.whatsappNo)
  };

  await eventRegister(data);
  
},

  });

  const { errors, touched, values, handleChange, handleSubmit, setFieldValue } =
    formik;

  // ✅ Already registered
  if (dataEventRegisterCheck?.success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 py-20 space-y-4">
        <Card className="gradient-card shadow-lg max-w-md w-full">
          <CardContent className="text-center text-white pt-8">
            <p className="text-lg font-semibold">Registration Completed! 🎉</p>
            <p className="mt-4 text-sm text-gray-400">
              Thank you for registering! A confirmation email will be sent to
              you shortly.
            </p>
            <div className="py-8">
              <h2 className="font-semibold text-xl">Join Our Community</h2>
              <p className="text-gray-400 mb-4 text-sm">
                Stay connected with fellow participants and get event updates.
              </p>
              <Link href={`https://chat.whatsapp.com/FNpP3TgzwTiKQW8jUdLtRE`}>
                <button className="px-8 py-2 rounded-full relative bg-gradient-to-bl from-green-600 to-green-950 text-white text-sm">
                  <span className="relative z-20 font-medium">Join Now</span>
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 mx-6">
      <Card className="gradient-card shadow-lg max-w-2xl w-full">
        {/* Poster */}
        <div className="rounded-lg overflow-hidden m-2">
          {isPosterLoading ? (
            <div className="w-full h-48 bg-gray-700 animate-pulse rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Loading poster...</span>
            </div>
          ) : (
            <img
              src={posterData?.poster?.url || "/img/banner_reacrtjs_final.png"}
              alt="Event Poster"
              className="w-full"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/img/banner_reacrtjs_final.png";
              }}
            />
          )}
        </div>

        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Event Registration
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
              {/* Full Name */}
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
                  className="border-gray-600 gradient-card text-white"
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Department */}
              <div className="space-y-1.5">
                <Label htmlFor="department" className="text-gray-300">
                  Department*
                </Label>
                <Select
                  value={values.department}
                  onValueChange={(value) => setFieldValue("department", value, true)}
                >
                  <SelectTrigger className="border-gray-600 gradient-card text-white">
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                  <SelectContent className="gradient-card border-gray-700 text-white">
                    {Object.keys(departmentMapping).map((short) => (
                      <SelectItem key={short} value={short}>
                        {short} {/* 👈 only short form shown */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && touched.department && (
                  <p className="text-red-500 text-xs mt-1">{errors.department}</p>
                )}
              </div>

              {/* Class Roll Number */}
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
                  className="border-gray-600 gradient-card text-white"
                />
                {errors.classRollNo && touched.classRollNo && (
                  <p className="text-red-500 text-xs mt-1">{errors.classRollNo}</p>
                )}
              </div>

              {/* Batch & Year */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-gray-300">Batch*</Label>
                  <Select
                    value={values.batch}
                    onValueChange={(value) => setFieldValue("batch", value, true)}
                  >
                    <SelectTrigger className="border-gray-600 gradient-card text-white">
                      <SelectValue placeholder="Select batch" />
                    </SelectTrigger>
                    <SelectContent className="gradient-card border-gray-700 text-white">
                      {batchOptions.map((batch) => (
                        <SelectItem key={batch} value={batch}>
                          {batch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.batch && touched.batch && (
                    <p className="text-red-500 text-xs mt-1">{errors.batch}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-gray-300">Year*</Label>
                  <Select
                    value={values.year}
                    onValueChange={(value) => setFieldValue("year", value, true)}
                  >
                    <SelectTrigger className="border-gray-600 gradient-card text-white">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="gradient-card border-gray-700 text-white">
                      {yearOptions.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.year && touched.year && (
                    <p className="text-red-500 text-xs mt-1">{errors.year}</p>
                  )}
                </div>
              </div>

              {/* Session */}
              <div className="space-y-1.5">
                <Label htmlFor="session" className="text-gray-300">
                  Session*
                </Label>
                <Select
                  value={values.session}
                  onValueChange={(value) => setFieldValue("session", value, true)}
                >
                  <SelectTrigger className="border-gray-600 gradient-card text-white">
                    <SelectValue placeholder="Select your session" />
                  </SelectTrigger>
                  <SelectContent className="gradient-card border-gray-700 text-white">
                    {sessionOptions.map((session) => (
                      <SelectItem key={session} value={session}>
                        {session}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.session && touched.session && (
                  <p className="text-red-500 text-xs mt-1">{errors.session}</p>
                )}
              </div>

              {/* WhatsApp No & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-gray-300">WhatsApp Number*</Label>
                  <Input
                    id="whatsappNo"
                    name="whatsappNo"
                    value={values.whatsappNo}
                    onChange={handleChange}
                    placeholder="Enter your WhatsApp number"
                    className="border-gray-600 gradient-card text-white"
                  />
                  {errors.whatsappNo && touched.whatsappNo && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.whatsappNo}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label className="text-gray-300">Email*</Label>
                  <Input
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    disabled={Boolean(user?.email)}
                    className="border-gray-600 gradient-card text-white"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isUserLoading}
                className="w-full py-6 rounded-full font-medium text-sm bg-gradient-to-r from-blue-600 to-blue-800 text-white"
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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventRegistrationForm;
