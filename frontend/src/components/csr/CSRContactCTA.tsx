import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, MessageCircle } from 'lucide-react';
import { imageAssets } from '../../data/imageAssets';

export default function CSRContactCTA() {
  const whatsappNumber = '94770000000';

  return (
    <section className="csr-contact-cta-section">
      <div className="csr-contact-cta-card">
        <img
          src={imageAssets.csr.contactCtaBg}
          alt="CSR community support"
          className="csr-contact-cta-image"
          draggable={false}
        />

        <div className="csr-contact-cta-overlay" />

        <div className="csr-contact-cta-content">
          <h2>
            Join Us in Creating a Better Tomorrow
          </h2>

          <p>
            Partner with Sumathi Universal to support meaningful CSR initiatives
            that empower communities, uplift lives and create lasting social
            impact across Sri Lanka.
          </p>

          <div className="csr-contact-cta-actions">
            <Link to="/contact" className="csr-contact-cta-btn primary">
              Contact Us
              <ArrowRight size={18} />
            </Link>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="csr-contact-cta-btn whatsapp"
            >
              <MessageCircle size={19} />
              Start a Partnership
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}