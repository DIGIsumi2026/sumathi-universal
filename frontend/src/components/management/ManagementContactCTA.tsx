import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { imageAssets } from '../../data/imageAssets';

export default function ManagementContactCTA() {
  const whatsappNumber = '94770000000';

  return (
    <section className="management-contact-cta-section">
      <div className="management-contact-cta-card">
        <img
          src={imageAssets.management.contactBanner}
          alt="Contact Sumathi Universal"
          className="management-contact-cta-image"
          draggable={false}
        />

        <div className="management-contact-cta-overlay" />

        <div className="management-contact-cta-content">

          <h2>
            Let&apos;s Start a Conversation
          </h2>

          <p>
            Reach out to Sumathi Universal for business inquiries,
            partnerships, and corporate communication.
          </p>

          <div className="management-contact-cta-actions">
            <Link to="/contact" className="management-contact-cta-btn primary">
              Contact Us
              <ArrowRight size={18} />
            </Link>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="management-contact-cta-btn whatsapp"
            >
              <MessageCircle size={19} />
              Chat with Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}