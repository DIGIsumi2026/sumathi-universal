import { imageAssets } from '../../data/imageAssets';

export default function ManagementHero() {
  const scrollToChairman = () => {
    const chairmanSection = document.getElementById('chairman-profile');

    if (chairmanSection) {
      chairmanSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="management-hero-section">
      <img
        src={imageAssets.management.hero}
        alt="Management leadership"
        className="management-hero-image"
        draggable={false}
      />

      <div className="management-hero-overlay" />

      <div className="management-hero-content">
        

        <h1>Management</h1>

        <p>
          Guiding the group with strategic direction, professional governance
          and long term business vision.
        </p>

        <button
          type="button"
          className="management-hero-btn"
          onClick={scrollToChairman}
        >
          See More
        </button>
      </div>
    </section>
  );
}