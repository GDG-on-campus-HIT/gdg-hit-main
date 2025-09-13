"use client";

import React from "react";

import Link from "next/link";
import { useEventByIDQuery, useGetEventContactsQuery } from "@/redux/features/api/event/eventApi";

interface FormData {
  name: string;
  email: string;
  phone: string;
  college: string;
  year: string;
  expectations: string;
}

interface ContactInfo {
  _id: string;
  name: string;
  mobile: string;
  year: string;
}

export default function EventRegistration({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = React.use(paramsPromise);

  const { isLoading, data, isError } = useEventByIDQuery(params.id);
  const {
    data: contactData,
    isLoading: contactLoading,
    isError: contactError
  } = useGetEventContactsQuery(params.id);

  if (isLoading || contactLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading event data</div>;
  if (contactError) return <div>Error loading contact information</div>;

  const eventData = data?.event;
  const contacts = contactData?.contactInfo || [];


  // Safety check: if no event data, show error
  if (!eventData) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Event Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400">
            The event you&apos;re looking for could not be found.
          </p>
          <Link href="/events" className="text-blue-500 hover:underline mt-4 inline-block">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen py-20 ">
      {/* Hero Section */}
      <section className="py-16  max-container">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 max-md:order-2 max-md:mt-10">
              <div className="inline-block bg-blue-600 text-sm px-3 py-1 rounded-full mb-4">
                UPCOMING EVENT
              </div>
              <h1 className="text-3xl md:text-5xl  font-bold mb-4">
                {eventData?.name || "Event Title"}
              </h1>
              <p className="text-lg max-sm:text-base text-gray-300 mb-8">
                {eventData?.description || "Event description not available"}
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gradient-card px-4 py-2 rounded-lg">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  {eventData?.eventDate}
                </div>
                <div className="flex items-center gradient-card px-4 py-2 rounded-lg">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  {eventData?.eventTime}
                </div>
                <div className="flex items-center gradient-card px-4 py-2 rounded-lg">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  {eventData?.venue}
                </div>
                <div className="flex items-center gradient-card px-4 py-2 rounded-lg uppercase">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  {eventData?.registrationFee}
                </div>
              </div>
              <div className="flex">
                {eventData?.is_upcoming ? (
                  <Link
                    href={`/events/${eventData?._id || params.id}/register`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl flex items-center"
                  >
                    Register Now
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 text-white font-medium py-3 px-6 rounded-lg cursor-not-allowed opacity-70 flex items-center"
                  >
                    Registration Ended
                    {/* <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg> */}
                  </button>
                )}

              </div>
            </div>
            <div className="md:w-1/2 md:pl-10">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img
                  src={eventData?.eventBanner?.url || "/img/events/image.png"}
                  alt="Event Poster"
                  width={600}
                  height={600}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16   max-container">
        <div
          dangerouslySetInnerHTML={{ __html: eventData?.details || "Event details not available" }}
          className="insert"
        ></div>
      </section>

      {/* About the Event */}
      {/* <section className="py-16 border-b border-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10">About The Event</h2>
          <div className="gradient-card rounded-xl p-8 shadow-lg">
            <p className="text-lg mb-6">{eventData.about}</p>
            <p className="text-lg mb-6">{eventData.description}</p>
            <p className="text-lg">{eventData.targetAudience}</p>
          </div>
        </div>
      </section> */}

      {/* {eventData.faq && eventData.faq.length > 0 && (
        <>
          <h1 className="text-3xl mb-8 mt-8 max-md:text-3xl text-center font-semibold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h1>

          <Accordion type="single" collapsible className="w-full">
            {eventData.faq.map((item: any, index: number) => (
              <AccordionItem value={`item-${index + 1}`} key={item._id}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </>
      )} */}

      {/* Event Schedule */}
      {/* <section className="py-16 border-b border-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10">Event Schedule</h2>
          <div className="grid gap-6">
            {eventData.schedule.map((item, index) => (
              <div key={index} className="gradient-card rounded-xl p-6 flex flex-col md:flex-row">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <div className="bg-gray-700 rounded-lg p-4 inline-block">
                    <div className="text-blue-400 font-medium">{item.time}</div>
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300 mb-2">{item.description}</p>
                  {item.speaker && (
                    <div className="flex items-center mt-3">
                      <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                        {item.speaker.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{item.speaker}</div>
                        <div className="text-sm text-gray-400">{item.role}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      {/* <section className="py-16 border-b border-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10">Frequently Asked Questions</h2>
          <div className="grid gap-4">
            {eventData.faqs.map((faq, index) => (
              <details key={index} className="gradient-card rounded-xl p-6 group">
                <summary className="list-none flex justify-between items-center cursor-pointer font-medium text-lg">
                  {faq.question}
                  <svg className="w-5 h-5 transform transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </summary>
                <div className="mt-4 text-gray-300">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section> */}

      {/* Contact Information */}
      <section className="py-16 max-container">
        <div className="">
          <h2 className="text-3xl font-bold  mb-10">Contact Information</h2>
          <div className="gradient-card rounded-xl p-8 shadow-lg">
            <p className="text-lg mb-6">
              For any queries or help, please feel free to contact:
            </p>
            {contacts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contacts.map((contact: ContactInfo, index: number) => (
                  <div key={contact._id || index} className="bg-white/5 rounded-lg p-4">
                    <div className="font-medium text-lg mb-1">{contact.name}</div>
                    <div className="text-gray-300 mb-1 text-sm">
                      {contact.year}
                    </div>
                    <div className="flex items-center text-blue-400">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        ></path>
                      </svg>
                      {contact.mobile}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">Contact information will be available soon.</p>
              </div>
            )}
            {/* <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#"
                className="flex items-center bg-white/5 hover:bg-gray-600 transition px-4 py-2 rounded-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Instagram
              </a>
              <a
                href="#"
                className="flex items-center bg-white/5 hover:bg-gray-600 transition px-4 py-2 rounded-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                </svg>
                Facebook
              </a>
              <a
                href="#"
                className="flex items-center bg-white/5 hover:bg-gray-600 transition px-4 py-2 rounded-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                </svg>
                Twitter
              </a>
              <a
                href="#"
                className="flex items-center bg-white/5 hover:bg-gray-600 transition px-4 py-2 rounded-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="#"
                className="flex items-center bg-white/5 hover:bg-gray-600 transition px-4 py-2 rounded-lg"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
