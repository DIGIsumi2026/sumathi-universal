import { imageAssets } from '../../data/imageAssets';

export default function FamilyLegacySection() {
  return (
    <section id="chairman-profile" className="family-legacy-section">
      <div className="family-legacy-inner">
        <div className="family-legacy-image-wrap">
          <img
            src={imageAssets.management.familyLegacy}
            alt="Sumathipala family legacy"
            className="family-legacy-image"
            draggable={false}
          />
        </div>

        <div className="family-legacy-content">
          <span>Family Legacy</span>

          <h2>
            A Legacy of Vision and Future of Innovation
          </h2>

          <p>
            In Sri Lanka&apos;s corporate landscape, the story of the
            Sumathipala family is defined by enduring vision and unwavering
            commitment. Grounded in a business legacy that spans over three
            decades, the foundation of the Sumathi Group was built on the core
            values of integrity, societal merit, and sustainable growth. It is a
            purpose driven enterprise inspired by the exemplary and benevolent
            life of the late Mrs. Milina Sumathipala.
          </p>

          <p>
            Guided by this profound heritage, Chairman Dr. Thilanga Sumathipala
            has been instrumental in strengthening and expanding this
            foundation. From his early days as an active member of the family
            business and a co-founder of the Group, to leading a vast array of
            diversified companies today, he has steered Sumathi Universal
            through evolving industries with strategic foresight and responsible
            leadership.
          </p>

          <p>
            Today, the family&apos;s shared purpose is carried forward by a
            dedicated board of directors, including Udhantha, Samadara,
            Dulantha  and Sajantha Sumathipala. Together, they represent the
            continuing momentum of the Sumathi legacy. In guiding the Group’s
            modern operations across sectors like technology, engineering,
            printing, and hospitality, they safeguard a conscious heritage 
            ensuring that innovation, stewardship and a commitment to Sri
            Lanka’s development are preserved and passed on with the same care
            as the business itself.
          </p>
        </div>
      </div>
    </section>
  );
}