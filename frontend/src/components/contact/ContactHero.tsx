import { ArrowDown, Mail, PhoneCall } from 'lucide-react';
import { imageAssets } from '../../data/imageAssets';

export default function ContactHero() {
  const scrollToContact = () => {
    const section = document.getElementById('contact-content');

    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="contact-hero-section">
      <img
        src={imageAssets.contact.hero}
        alt="Contact Sumathi Universal"
        className="contact-hero-image"
        draggable={false}
      />

      <div className="contact-hero-overlay" />

      <div className="contact-hero-content">
        <h1>
          Let&apos;s Start a Conversation
        </h1>

        <p>
          We&apos;re here to help you connect with Sumathi Universal for
          inquiries, partnerships, corporate communication, and business support.
        </p>

        <div className="contact-hero-actions">
          <button
            type="button"
            className="contact-hero-btn primary"
            onClick={scrollToContact}
          >
            Send an Inquiry
            <ArrowDown size={18} />
          </button>

          <a href="tel:+94770000000" className="contact-hero-btn secondary">
            <PhoneCall size={18} />
            Call Us
          </a>

          <a
            href="mailto:info@sumathiuniversal.com"
            className="contact-hero-btn ghost"
          >
            <Mail size={18} />
            Email Us
          </a>
        </div>
      </div>
    </section>
  );
}