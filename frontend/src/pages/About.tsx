import { lazy, Suspense } from 'react';
import '../styles/pages/about.css';
import AboutHeroVideo from '../components/about/AboutHeroVideo';
import AboutIntroSection from '../components/about/AboutIntroSection';
import VisionMissionSection from '../components/about/VisionMissionSection';

// GroupAtGlanceSection pulls in GroupGlanceParticles (Three.js) — lazy-load
const GroupAtGlanceSection = lazy(() => import('../components/about/GroupAtGlanceSection'));
// Load the interactive company showcase when the About page is displayed.
const CompanyTimelineHero = lazy(() => import('../components/about/CompanyTimelineHero'));


export default function About() {
  return (
    <>
      <AboutHeroVideo />
      <AboutIntroSection/>
      <VisionMissionSection/>
      <Suspense fallback={null}>
        <GroupAtGlanceSection/>
      </Suspense>
      <Suspense fallback={null}>
        <CompanyTimelineHero/>
      </Suspense>
    </>
  );
}