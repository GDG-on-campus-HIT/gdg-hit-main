import { BorderBeam } from '@/components/magicui/border-beam'
import React from 'react'

function NewsletterSection() {
  return (
    <section id="newsletter" className="py-20 max-sm:py-5">
    <div className="max-container">
      <div className="gradient-card rounded-2xl overflow-hidden relative">
        <div className="px-6 py-12 md:px-12 md:py-16 text-center relative">
          {/* <!-- Background Pattern --> */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" ></div>
          </div>

          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold white-gradient-text mb-4 animate__animated animate__fadeInUp">Stay Updated with GDG HIT</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto animate__animated animate__fadeInUp animate__delay-1s">
              Subscribe to our newsletter for the latest updates on events, workshops, and opportunities in the tech community.
            </p>
            
            <form id="newsletter-form" className="max-w-lg mx-auto animate__animated animate__fadeInUp animate__delay-2s">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input type="email" 
                         placeholder="Enter your email" 
                         className="w-full px-6 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                         required/>
                </div>
                <button type="submit" 
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 group">
                  <span>Subscribe</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>

            <div className="mt-12 flex flex-col items-center space-y-6">
              <p className="text-gray-400">Follow us on social media</p>
              <div className="flex space-x-6">
                <a href="https://www.instagram.com/gdg_hit/" className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.334-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.538-.204 1.006.121.832.953z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.374 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.626-5.374-12-12-12z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
    </div>
  </section>
  )
}

export default NewsletterSection