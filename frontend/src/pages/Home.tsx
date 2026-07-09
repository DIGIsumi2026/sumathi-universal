import '../styles/pages/home.css';
import Preloader from '../components/home/Preloader';
import ServicesGalleryCarousel from '../components/home/ServicesGalleryCarousel';
import IntroLogoVideo from '../components/home/IntroLogoVideo';
import WhatWeDoSection from '../components/home/WhatWeDoSection';
import CompanyLogoBanner from '../components/home/CompanyLogoBanner';



import Hero from '../components/home/Hero';
import TrustStats from '../components/home/TrustStats';
import AboutPreview from '../components/home/AboutPreview';
import ServicesCarousel from '../components/home/ServicesCarousel';
import ProcessSteps from '../components/home/ProcessSteps';
import Testimonials from '../components/home/Testimonials';
import CategoryShowcase from '../components/home/CategoryShowcase';
import BlogInsights from '../components/home/BlogInsights';
import ContactCTA from '../components/home/ContactCTA';
import ClientsStrip from '../components/home/ClientsStrip';

export default function Home() {
  return (
    <>
      <Preloader />

      <ServicesGalleryCarousel/>
      <IntroLogoVideo/>
      <WhatWeDoSection/>
      <CompanyLogoBanner/>





      
      <Hero />
      <TrustStats />
      <AboutPreview />
      <ServicesCarousel />
      <ProcessSteps />
      <Testimonials />
      <CategoryShowcase />
      <BlogInsights />
      <ContactCTA />
      <ClientsStrip />
    </>
  );
}
