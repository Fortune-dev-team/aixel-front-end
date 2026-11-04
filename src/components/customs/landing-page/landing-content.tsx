import React from 'react'
import CtaSection from './sections/cta-section';
import HeroSection from './sections/hero-section';
import FeatureSection from './sections/feature-section';
import FlowSection from './sections/flow-section';
import AboutSection from './sections/about-section';

export default function LandingContent() {
    return (
        <div className='flex flex-col w-full'>
            <HeroSection />
            <FeatureSection />
            <FlowSection/>
            <CtaSection />
            <AboutSection />
        </div>
    )
}
