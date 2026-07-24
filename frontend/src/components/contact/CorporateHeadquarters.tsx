import { Mail, MapPin, PhoneCall } from 'lucide-react';

function ContactNetworkBackground() {
  return (
    <div className="contact-headquarters-network-bg" aria-hidden="true">
      <span className="contact-network-orb orb-1" />
      <span className="contact-network-orb orb-2" />

      <span className="contact-network-line line-1" />
      <span className="contact-network-line line-2" />
      <span className="contact-network-line line-3" />
      <span className="contact-network-line line-4" />
      <span className="contact-network-line line-5" />

      <span className="contact-network-node node-1" />
      <span className="contact-network-node node-2" />
      <span className="contact-network-node node-3" />
      <span className="contact-network-node node-4" />
      <span className="contact-network-node node-5" />
      <span className="contact-network-node node-6" />
      <span className="contact-network-node node-7" />
    </div>
  );
}

export default function CorporateHeadquarters() {
  return (
    <section id="contact-content" className="contact-headquarters-section">
      <ContactNetworkBackground />

      <div className="contact-headquarters-grid">
        <a
          href="https://maps.app.goo.gl/uHPmr2QALxE5RN9HA"
          target="_blank"
          rel="noreferrer"
          className="contact-headquarters-card contact-headquarters-link"
          aria-label="Open Sumathi Universal Corporate Headquarters on Google Maps"
        >
          <div className="contact-headquarters-icon">
            <MapPin size={38} />
          </div>

          <div className="contact-headquarters-divider" />

          <p>
            No. 02, Dr. Milina Sumathipala
            <br />
            Mawatha, Colombo 10.
            <br />
            Sri Lanka.
          </p>
        </a>

        <a
          href="mailto:info@sumathiuniversal.com"
          className="contact-headquarters-card contact-headquarters-link"
          aria-label="Email Sumathi Universal"
        >
          <div className="contact-headquarters-icon">
            <Mail size={38} />
          </div>

          <div className="contact-headquarters-divider" />

          <p>info@sumathiuniversal.com</p>
        </a>

        <a
          href="tel:+94112697106"
          className="contact-headquarters-card contact-headquarters-link"
          aria-label="Call Sumathi Universal"
        >
          <div className="contact-headquarters-icon">
            <PhoneCall size={38} />
          </div>

          <div className="contact-headquarters-divider" />

          <p>+(94) 11 269 7106</p>
        </a>
      </div>
    </section>
  );
}