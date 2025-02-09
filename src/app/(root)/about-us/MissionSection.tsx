import React from "react";

function MissionSection() {
  return (
    <section id="mission" className="py-20 ">
      <div className="max-container">
        <div className=" mb-8 flex flex-col items-center justify-center">
          <h2 className="text-6xl max-lg:text-5xl max-md:text-3xl white-gradient-text mb-3 leading-[1.25]">
            Our Mission & Values
          </h2>
          <p className="max-w-2xl text-base text-gray-700 dark:text-gray-400 leading-relaxed">
            Guided by innovation, driven by community, committed to excellence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 my-6">
          {/* <!-- Innovation Card --> */}
          <div className="group bg-neutral-800/50 backdrop-blur-sm p-8 rounded-xl border border-neutral-700 hover:border-blue-500 transition-all duration-300 animate__animated animate__fadeInUp">
            <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              Innovation First
            </h3>
            <p className="text-gray-300">
              Fostering a culture of innovation and creative problem-solving
              through technology and collaboration.
            </p>
          </div>

          {/* <!-- Community Card --> */}
          <div className="group bg-neutral-800/50 backdrop-blur-sm p-8 rounded-xl border border-neutral-700 hover:border-red-500 transition-all duration-300 animate__animated animate__fadeInUp">
            <div className="h-14 w-14 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              Community Growth
            </h3>
            <p className="text-gray-300">
              Building a strong, inclusive community of learners, developers,
              and tech enthusiasts.
            </p>
          </div>

          {/* <!-- Excellence Card --> */}
          <div className="group bg-neutral-800/50 backdrop-blur-sm p-8 rounded-xl border border-neutral-700 hover:border-green-500 transition-all duration-300 animate__animated animate__fadeInUp">
            <div className="h-14 w-14 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              Technical Excellence
            </h3>
            <p className="text-gray-300">
              Striving for excellence in everything we do, from code to
              community engagement.
            </p>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-neutral-800/50 backdrop-blur-sm p-8 rounded-xl border border-neutral-700 animate__animated animate__fadeInLeft">
            <h3 className="text-2xl font-bold text-white mb-6">Our Purpose</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 mr-3 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Empower students with technical skills
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 mr-3 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Foster innovation and creativity
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 mr-3 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Build a strong tech community
              </li>
            </ul>
          </div>

          <div className="bg-neutral-800/50 backdrop-blur-sm p-8 rounded-xl border border-neutral-700 animate__animated animate__fadeInRight">
            <h3 className="text-2xl font-bold text-white mb-6">
              Our Commitment
            </h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 mr-3 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Quality learning experiences
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 mr-3 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Inclusive and diverse community
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 mr-3 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Continuous improvement
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MissionSection;
