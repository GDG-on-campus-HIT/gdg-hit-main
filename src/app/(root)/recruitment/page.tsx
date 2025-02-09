"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Users, Mail } from 'lucide-react';


const RecruitmentPage = () => {
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    // Show cards after a delay
    const timeout = setTimeout(() => setShowCards(true), 2500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden ">      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 text-center">
        {/* Google-inspired logo section */}
        <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
          <h1 className="inline-flex text-6xl font-bold">
            <span className="text-blue-600 hover:animate-bounce">G</span>
            <span className="text-red-500 hover:animate-bounce">D</span>
            <span className="text-yellow-500 hover:animate-bounce">G</span>
          </h1>
          <span className="block mt-2 text-xl font-medium text-gray-600 dark:text-gray-300">
            Haldia Institute of Technology
          </span>
        </div>

        {/* Main announcement */}
        <div className="max-w-2xl p-8 mx-auto mb-8 gradient-card rounded-2xl shadow-lg backdrop-blur-sm
          transition-all duration-500 hover:shadow-2xl">
          <div className=" mb-8">
          <h2 className="text-4xl max-lg:text-3xl max-md:text-2xl text-center white-gradient-text mb-3 leading-[1.25]">
            Words from Our {" "}
            <span className="from-blue-400  to-blue-600 bg-gradient-to-b bg-clip-text text-transparent">
              Community
            </span>
          </h2>
          <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed">
          Join us in building the future of technology at HIT. 
            We&apos;re looking for passionate developers, designers, and tech enthusiasts.
          </p>
        </div>
          

          {/* Info cards */}
          <div className={`grid grid-cols-1 gap-4 md:grid-cols-3 transition-all duration-500
            ${showCards ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default RecruitmentPage;