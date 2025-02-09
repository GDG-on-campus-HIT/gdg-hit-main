import React from 'react'

function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[40rem] h-screen max-md:h-auto flex items-center ">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-red-600/20 mix-blend-multiply"></div>
    </div>
    
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div className="animate__animated animate__fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center">
          Empowering Innovators,<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500">Building the Future</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mb-8 text-center">
          Join GDG On Campus HIT - where innovation meets technology. We&apos;re a community of passionate developers, designers, and tech enthusiasts shaping the future of technology.
        </p>
        <div className="flex gap-4 justify-center">
          <a href="#join" className="animate__animated animate__fadeInUp bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors">
            Join Our Community
          </a>
          <a href="#about" className="animate__animated animate__fadeInUp bg-neutral-800 hover:bg-neutral-700 text-white px-8 py-3 rounded-full font-medium transition-colors">
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>
  )
}

export default HeroSection