import '../styles/pages/contact.css';
import ContactHero from '../components/contact/ContactHero';
import CorporateHeadquarters from '../components/contact/CorporateHeadquarters';
import ContactMapFormSection from '../components/contact/ContactMapFormSection';
import SubsidiaryContactSection from '../components/contact/SubsidiaryDirectory';
export default function Contact() {
  return (
    <>
      <ContactHero />
      <CorporateHeadquarters />
      <ContactMapFormSection/>
      <SubsidiaryContactSection/>
    </>
  );
}
