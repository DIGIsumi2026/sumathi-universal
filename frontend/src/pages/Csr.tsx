import '../styles/pages/Csr.css';
import CSRHero from '../components/csr/CSRHero';
import CSRDescriptionSection from '../components/csr/CSRDescriptionSection';
import CSRFoundationSection from '../components/csr/CSRFoundationShowcase'

export default function About() {
  return (
    <>
    <CSRHero/>
    <CSRDescriptionSection/>
    <CSRFoundationSection/>
    </>
  );
}