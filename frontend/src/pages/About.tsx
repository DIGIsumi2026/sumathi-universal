import '../styles/pages/about.css';
import AboutHeroVideo from '../components/about/AboutHeroVideo';
import AboutIntroSection from '../components/about/AboutIntroSection';
import VisionMissionSection from '../components/about/VisionMissionSection';



export default function About() {
  return (
    <>
      <AboutHeroVideo />
      <AboutIntroSection/>
      <VisionMissionSection/>
    </>
  );
}