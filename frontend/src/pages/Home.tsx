import { lazy, Suspense } from 'react';
import '../styles/pages/home.css';
import ServicesGalleryCarousel from '../components/home/ServicesGalleryCarousel';
import IntroLogoVideo from '../components/home/IntroLogoVideo';
import CompanyLogoBanner from '../components/home/CompanyLogoBanner';
import HomeContactCTA from '../components/home/HomeContactCTA';

// WhatWeDoSection pulls in WhatWeDoOrbit (Three.js) — lazy-load for a smaller initial chunk
const WhatWeDoSection = lazy(() => import('../components/home/WhatWeDoSection'));

export default function Home() {
  return (
    <>
      <ServicesGalleryCarousel/>
      <IntroLogoVideo/>
      <Suspense fallback={null}>
        <WhatWeDoSection/>
      </Suspense>
      <HomeContactCTA/>
      <CompanyLogoBanner/>
      
    </>
  );
}
