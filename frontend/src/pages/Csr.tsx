import '../styles/pages/Csr.css';
import CSRHero from '../components/CSR/CSRHero';
import CSRDescriptionSection from '../components/CSR/CSRDescriptionSection';
import CSRFoundationSection from '../components/CSR/CSRFoundationShowcase';
import CSRCompanyBanner from '../components/CSR/CSRCompanyBanner';
import CSRContactCTA from '../components/CSR/CSRContactCTA';
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