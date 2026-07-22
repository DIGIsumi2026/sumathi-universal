import '../styles/pages/management.css';
import ManagementHero from '../components/management/ManagementHero';
import FamilyLegacySection from '../components/management/FamilyLegacySection';
import ManagementProfileSection from '../components/management/ManagementProfilesSection';
export default function About() {
  return (
    <>
      <ManagementHero/>
      <FamilyLegacySection/>
      <ManagementProfileSection/>
    </>
  );
}