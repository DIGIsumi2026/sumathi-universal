import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { imageAssets } from '../../data/imageAssets';

export default function HomeContactCTA() {
  const whatsappNumber = '947XXXXXXXX';

  return (
    <section className="home-contact-cta">
      <img
        src={imageAssets.home.contactCtaBg}
        alt="Contact Sumathi Universal"
        className="home-contact-cta__bg"
        draggable={false}
      />

      <div className="home-contact-cta__soft-overlay" />

      <div className="home-contact-cta__inner">
        <motion.div
          className="home-contact-cta__content"
          initial={{ opacity: 0, x: 52 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>
            Connect with Sumathi Universal for business inquiries,
            partnerships, service support, and group company information. Our
            team is ready to guide you with professional assistance and prompt
            communication.
          </p>

          <div className="home-contact-cta__actions">
            <Link to="/contact" className="home-contact-cta__btn primary">
              Contact Us
              <ArrowRight size={18} strokeWidth={2.2} />
            </Link>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="home-contact-cta__btn whatsapp"
            >
              <MessageCircle size={19} strokeWidth={2.2} />
              Chat With Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}