import '../styles/pages/Csr.css';
import CSRHero from '../components/csr/CSRHero';
import CSRDescriptionSection from '../components/csr/CSRDescriptionSection';
import CSRFoundationSection from '../components/csr/CSRFoundationShowcase';
import CSRCompanyBanner from '../components/csr/CSRCompanyBanner';
import CSRContactCTA from '../components/csr/CSRContactCTA';
export default function About() {
  return (
    <>
    <CSRHero/>
    <CSRDescriptionSection/>
    <CSRFoundationSection/>
    <CSRCompanyBanner/>
    <CSRContactCTA/>
    </>
  );
}