'use client';

import Header from '@/components/Header';
import HeroSimple from '@/components/HeroSimple';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowItWorksHero from '@/components/HowItWorksHero';
import ServiceShowcase from '@/components/ServiceShowcase';
import RecentTasks from '@/components/RecentTasks';
import StatsCounter from '@/components/StatsCounter';
import FeaturedTaskers from '@/components/FeaturedTaskers';
import Testimonials from '@/components/Testimonials';
import BlogSection from '@/components/BlogSection';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <Header />
      <HeroSimple />
      <WhyChooseUs />
      <HowItWorksHero />
      <ServiceShowcase />
      <RecentTasks />
      <StatsCounter />
      <FeaturedTaskers />
      <Testimonials />
      <BlogSection />
      <FAQ />
      <CTASection />
      <Newsletter />
      <Footer />
    </div>
  );
}
