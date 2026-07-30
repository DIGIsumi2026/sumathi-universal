import '../styles/pages/home.css';
import ServicesGalleryCarousel from '../components/home/ServicesGalleryCarousel';
import IntroLogoVideo from '../components/home/IntroLogoVideo';
import WhatWeDoSection from '../components/home/WhatWeDoSection';
import CompanyLogoBanner from '../components/home/CompanyLogoBanner';
import HomeContactCTA from '../components/home/HomeContactCTA';

export default function Home() {
  return (
    <>
      <ServicesGalleryCarousel/>
      <IntroLogoVideo/>
      <WhatWeDoSection/>
      <HomeContactCTA/>
      <CompanyLogoBanner/>
      
    </>
  );
}
