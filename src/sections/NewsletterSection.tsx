"use client"
import { BorderBeam } from '@/components/magicui/border-beam'
import React, { useState } from 'react'

function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('loading');
  
  try {
    // Send the request
    await fetch(process.env.NEXT_PUBLIC_NEWSLETTER_API_URL!, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `email=${encodeURIComponent(email)}`
    });

    setStatus('success');
    setEmail('');
    
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
    }
  };

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
            
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto animate__animated animate__fadeInUp animate__delay-2s">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input 
                         type="email" 
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         placeholder="Enter your email" 
                         className="w-full px-6 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" 
                         required
                         disabled={status === 'loading'}
                    />
                </div>
                <button 
                        type="submit" 
                        disabled={status === 'loading'}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2 group"
                  >
                    <span>{status === 'loading' ? 'Subscribing...' : 'Subscribe'}</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
              </div>
              
              <div className="mt-4 animate__animated animate__fadeIn">
                {status === 'success' && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20">
                    <svg 
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-sm font-medium">Successfully subscribed to our newsletter!</p>
                  </div>
                )}
                
                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <p className="text-sm font-medium">Failed to subscribe. Please try again.</p>
                  </div>
                )}
              </div>
            </form>

            
          </div>
        </div>
        <BorderBeam size={250} duration={12} delay={9} />
      </div>
    </div>
  </section>
  )
}

export default NewsletterSection