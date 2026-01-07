'use client';

import Header from '@/components/Header';
import HeroSimple from '@/components/HeroSimple';
import RecentTasks from '@/components/RecentTasks';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowItWorksHero from '@/components/HowItWorksHero';
import ServiceShowcase from '@/components/ServiceShowcase';
import StatsCounter from '@/components/StatsCounter';
import FeaturedTaskers from '@/components/FeaturedTaskers';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <HeroSimple />
      <RecentTasks />
      <WhyChooseUs />
      <HowItWorksHero />
      <ServiceShowcase />
      <StatsCounter />
      <FeaturedTaskers />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}
