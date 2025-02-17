"use client";

import React from "react";
import { Mail } from "lucide-react";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen  dark:text-white p-8 transition-colors duration-200">
      <div className="max-container  my-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column */}
        <div className="space-y-2">
          <div className="bg-gray-200 dark:bg-blue-600/10 w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-200">
            <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" /> 
          </div>

          <div className=" ">
            <h2 className="text-5xl max-lg:text-4xl max-md:text-3xl white-gradient-text mb-3 leading-[1.25]">
              Contact us
            </h2>
            <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed">
              A student-led community exploring Google Developer technologies,
              fostering innovation, and empowering students through hands-on
              learning.
            </p>
          </div>

          <div className="space-x-4 text-gray-500 dark:text-gray-400">
            <span>gdgoncamputhit@gmail.com</span>
            <span>•</span>
            <span>+91 9508971070</span>
            {/* <span>•</span>
            <span>support@i</span> */}
          </div>

          {/* Map section - hidden on mobile, visible from md breakpoint */}
          <div className="hidden md:block relative">
            <img
              src="/world.svg"
              alt="World Map"
              className="opacity-70 dark:opacity-50 transition-opacity duration-200"
            />

            <div className="absolute top-[50px] left-[345px]">
              <div className="relative">
                <div className="bg-blue-500/20 w-24 h-24 rounded-full absolute animate-ping" />
                <div className="bg-blue-500 px-6 py-2 rounded-full text-sm relative z-10 text-white">
                  We are here
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="gradient-card p-8 rounded-3xl transition-colors duration-200 mx-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Full name</label>
              <input
                type="text"
                className="w-full bg-gray-100 dark:bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Email Address</label>
              <input
                type="email"
                className="w-full bg-gray-100 dark:bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                placeholder="your@gmail.com"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Phone Number</label>
              <input
                type="text"
                className="w-full bg-gray-100 dark:bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                placeholder="Your Phone number"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Message</label>
              <textarea
                className="w-full bg-gray-100 dark:bg-white/5 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors duration-200"
                placeholder="Type your message here"
              />
            </div>

            <button
              type="submit"
              className="bg-gray-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:bg-white drk:hover:bg-gray-200 transition-colors duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
