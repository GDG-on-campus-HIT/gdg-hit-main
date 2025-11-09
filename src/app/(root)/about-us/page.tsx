import React from 'react';
import HeroSection from './HeroSection';
import MissionSection from './MissionSection';


const AboutUsPage = () => {
    return (
        <main className='w-full min-h-screen overflow-x-hidden'>
            <HeroSection/>
            <MissionSection/>
        </main>
    );
};

export default AboutUsPage;