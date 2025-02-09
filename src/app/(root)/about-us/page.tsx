import React from 'react';
import { Users, Code, Rocket, Target, Globe, Sparkles } from 'lucide-react';
import HeroSection from './HeroSection';
import MissionSection from './MissionSection';


const AboutUsPage = () => {
    return (
        <main className='w-full min-h-screen'>
            <HeroSection/>
            <MissionSection/>
        </main>
    );
};

export default AboutUsPage;