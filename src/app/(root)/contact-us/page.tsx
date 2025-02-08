"use client";

import React from "react";
import { useState } from "react";
import { FiMail } from "react-icons/fi";
import Background from "@/components/ui/Background";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* <Background /> */}
      <div className="flex flex-col lg:flex-row p-4 md:p-9 gap-8">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 px-4 md:px-11">
          <h1 className="text-3xl md:text-5xl font-bold text-[#050409] dark:text-white mt-8 lg:mt-24">
            Contact Us
          </h1>
          <p className="mt-4 md:mt-8 text-xl md:text-2xl text-[#050409]/70 dark:text-gray-300">
            Email, call or complete the form to know how.
          </p>
          <p className="mt-6 md:mt-9 text-lg md:text-xl text-[#050409]/80 dark:text-gray-200">
            Email:{" "}
            <a href="mailto:info@gdg.com" className="underline">
              info@gdg.com
            </a>
          </p>

          <div className="mt-12 md:mt-20">
            <div className="flex flex-col md:flex-row gap-4 md:gap-9">
              {/* Customer Support Section */}
              <div className="flex-1 text-center p-4 md:p-6 bg-white/80 dark:bg-[#050409]/80 backdrop-blur-sm rounded-lg shadow-md">
                <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-[#050409] dark:text-white">Customer Support</h2>
                <p className="text-[#050409]/70 dark:text-gray-300 text-sm md:text-base">
                  If you need assistance, please reach out to our customer support team.
                </p>
              </div>
              {/* Feedback Section */}
              <div className="flex-1 text-center p-4 md:p-6 bg-white/80 dark:bg-[#050409]/80 backdrop-blur-sm rounded-lg shadow-md">
                <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-[#050409] dark:text-white">Feedback and Suggestions</h2>
                <p className="text-[#050409]/70 dark:text-gray-300 text-sm md:text-base">
                  We value your feedback. Let us know how we can improve our services.
                </p>
              </div>
              {/* Media Inquiries Section */}
              <div className="flex-1 text-center p-4 md:p-6 bg-white/80 dark:bg-[#050409]/80 backdrop-blur-sm rounded-lg shadow-md">
                <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-[#050409] dark:text-white">Media Inquiries</h2>
                <p className="text-[#050409]/70 dark:text-gray-300 text-sm md:text-base">
                  For media inquiries, feel free to contact our media team.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-white/90 dark:bg-[#050409]/90 backdrop-blur-sm shadow-md rounded-lg p-4 md:p-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#050409] dark:text-white mb-1">Get in Touch</h2>
            <p className="text-[#050409]/70 dark:text-gray-300 mb-4">We&apos;d love to hear from you.</p>

            {/* First Name & Last Name */}
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="w-full sm:w-1/2">
                <label htmlFor="firstName" className="block text-[#050409]/70 dark:text-gray-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#050409]/20 dark:border-gray-600 rounded-[50px] bg-white/80 dark:bg-[#050409]/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#050409] dark:text-white placeholder-[#050409]/50 dark:placeholder-gray-400"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label htmlFor="lastName" className="block text-[#050409]/70 dark:text-gray-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-[#050409]/20 dark:border-gray-600 rounded-[50px] bg-white/80 dark:bg-[#050409]/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#050409] dark:text-white placeholder-[#050409]/50 dark:placeholder-gray-400"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-[#050409]/70 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#050409]/40 dark:text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-2 border border-[#050409]/20 dark:border-gray-600 rounded-[50px] bg-white/80 dark:bg-[#050409]/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#050409] dark:text-white placeholder-[#050409]/50 dark:placeholder-gray-400"
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div className="mb-4">
              <label htmlFor="message" className="block text-[#050409]/70 dark:text-gray-300 mb-2">
                How can we help you?
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-[#050409]/20 dark:border-gray-600 rounded bg-white/80 dark:bg-[#050409]/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#050409] dark:text-white placeholder-[#050409]/50 dark:placeholder-gray-400"
                placeholder="Type your message here..."
                rows={5}
                maxLength={120}
                required
              ></textarea>
              <p className="text-sm text-[#050409]/60 dark:text-gray-400 text-right">
                {formData.message.length}/120 characters
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>

            {/* Links */}
            <p className="text-sm text-[#050409]/60 dark:text-gray-400 mt-4 text-center">
              By submitting, you agree to our{" "}
              <a href="/terms" className="text-blue-500 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;