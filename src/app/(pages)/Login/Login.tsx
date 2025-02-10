"use client";
import React, { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeInput, setActiveInput] = useState("");

  const handleEmailLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle email login logic here
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
  };

  return (
    <div className="w-full min-h-screen  flex items-center justify-center p-4 overflow-hidden">
      <Spotlight
        className="hidden md:block -top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="w-full max-w-[95%] sm:max-w-md relative">
        {/* Background Effects - Adjusted for mobile */}
        <div className="absolute -top-20 -right-20 w-48 md:w-64 h-48 md:h-64 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-48 md:w-64 h-48 md:h-64 bg-blue-500/10 rounded-full blur-3xl" />

        {/* Main Container - Added mobile padding adjustments */}
        <div className="relative backdrop-blur-xl bg-gray-950/50 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8">
          {/* Header - Responsive text sizes */}
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-3xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 mb-2 md:mb-4">
              GDG HIT
            </h2>
            <p className="text-gray-400 text-xs md:text-sm">
              Join our developer community
            </p>
          </div>

          {/* Login Form - Adjusted spacing for mobile */}
          <form onSubmit={handleEmailLogin} className="space-y-4 md:space-y-6">
            {/* Email Input */}
            <div
              className={`
                relative transition-all duration-300
                ${activeInput === "email" ? "scale-[1.02]" : ""}
              `}
            >
              <div className="relative bg-gray-900/80 rounded-xl backdrop-blur-sm">
                <div className="flex items-center p-2 md:p-3 rounded-lg">
                  <Mail
                    className={`w-4 md:w-5 h-4 md:h-5 ${
                      activeInput === "email"
                        ? "text-green-400"
                        : "text-gray-500"
                    } transition-colors`}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setActiveInput("email")}
                    onBlur={() => setActiveInput("")}
                    placeholder="Enter your email"
                    className="w-full bg-transparent border-none focus:outline-none text-gray-100 placeholder-gray-500 ml-3 text-sm md:text-base"
                  />
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div
              className={`
                relative transition-all duration-300
                ${activeInput === "password" ? "scale-[1.02]" : ""}
              `}
            >
              <div className="relative bg-gray-900/80 rounded-xl backdrop-blur-sm">
                <div className="flex items-center p-2 md:p-3 rounded-lg">
                  <Lock
                    className={`w-4 md:w-5 h-4 md:h-5 ${
                      activeInput === "password"
                        ? "text-green-400"
                        : "text-gray-500"
                    } transition-colors`}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setActiveInput("password")}
                    onBlur={() => setActiveInput("")}
                    placeholder="Enter your password"
                    className="w-full bg-transparent border-none focus:outline-none text-gray-100 placeholder-gray-500 ml-3 text-sm md:text-base"
                  />
                </div>
              </div>
            </div>

            {/* Login Button - Adjusted padding and text size */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-400/80 to-blue-500/80 text-white rounded-xl py-2.5 md:py-3 px-4 text-sm md:text-base font-medium transition-all duration-300 hover:opacity-90 active:scale-[0.98] md:hover:scale-[1.02] backdrop-blur-sm"
            >
              <span className="flex items-center justify-center">
                <LogIn className="w-4 md:w-5 h-4 md:h-5 mr-2" />
                Sign In
              </span>
            </button>
          </form>

          {/* Divider - Adjusted margins */}
          <div className="relative my-6 md:my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-xs md:text-sm">
              <span className="px-2 bg-gray-950 text-gray-500">
                or continue with
              </span>
            </div>
          </div>

          {/* Google Login - Adjusted padding and text size */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-gray-900/80 text-gray-200 rounded-xl py-2.5 md:py-3 px-4 text-sm md:text-base font-medium transition-all duration-300 hover:bg-gray-800/80 active:scale-[0.98] backdrop-blur-sm"
          >
            <span className="flex items-center justify-center">
              <svg className="w-4 md:w-5 h-4 md:h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  className="fill-blue-400"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  className="fill-green-400"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  className="fill-yellow-400"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  className="fill-red-400"
                />
              </svg>
              Continue with Google
            </span>
          </button>

          {/* Footer Links - Adjusted text size and spacing */}
          <div className="mt-6 md:mt-8 text-center text-xs md:text-sm">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-400 transition-colors"
            >
              Forgot password?
            </a>
            <span className="mx-2 text-gray-800">•</span>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-400 transition-colors"
            >
              Sign up for an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
