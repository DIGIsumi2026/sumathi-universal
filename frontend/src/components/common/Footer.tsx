import React from 'react';
import '../../styles/global.css'
import { Link } from 'react-router-dom';
import { imageAssets } from '../../data/imageAssets';
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      
      {/* Background Watermark */}
      <div className="site-footer-watermark">
        sumathiuniversal
      </div>

      <div className="site-footer-container">
        <div className="site-footer-grid">
          
          {/* Section 1: Company Info */}
          <div className="site-footer-col">
            <img src={imageAssets.brand.companyLogo} alt="Sumathi Universal Logo" className="site-footer-logo" />
            <p className="site-footer-description">
              Sumathi Universal delivers specialized services across diverse sectors with a commitment to excellence, innovation and unwavering reliability.
            </p>
            <div className="site-footer-socials">
              <a href="https://www.facebook.com/share/1KtpK2xGdT/?mibextid=wwXIfr" className="site-footer-social-icon">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/sumathi_universal?igsh=NnB6OWJjZmlwcnA3" className="site-footer-social-icon">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/company/sumathi-universal/" className="site-footer-social-icon">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div className="site-footer-col">
            <h3 className="site-footer-heading">Quick Links</h3>
            <ul className="site-footer-links-list">
              <li><Link to="/" className="footer-link" onClick={scrollToTop}>Home</Link></li>
              <li><Link to="/about" className="footer-link" onClick={scrollToTop}>About Us</Link></li>
              <li><Link to="/management" className="footer-link" onClick={scrollToTop}>Management</Link></li>
              <li><Link to="/csr" className="footer-link" onClick={scrollToTop}>CSR</Link></li>
              <li><Link to="/contact" className="footer-link" onClick={scrollToTop}>Contact</Link></li>
            </ul>
          </div>

          {/* Section 3: Contact Us */}
          <div className="site-footer-col">
            <h3 className="site-footer-heading">Contact Us</h3>
            <ul className="site-footer-contact-list">
              <li>
                <MapPin size={20} className="site-footer-contact-icon" />
                <span>
                  No. 02, Dr. Milina Sumathipala Mawatha,<br />
                  Colombo 10. Sri Lanka.
                </span>
              </li>
              <li>
                <Phone size={20} className="site-footer-contact-icon" />
                <a href="tel:+94112697106">+94 11 269 7106</a>
              </li>
              <li>
                <Mail size={20} className="site-footer-contact-icon" />
                <a href="mailto:info@sumathiuniversal.com">info@sumathiuniversal.com</a>
              </li>
            </ul>
          </div>

          {/* Section 4: Google Map */}
          <div className="site-footer-col">
            <h3 className="site-footer-heading">Google Map</h3>
            <div className="site-footer-map-container">
              <iframe
                title="Sumathi Universal Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7686888206144!2d79.8631024!3d6.918231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTUnMDUuNiJOIDc5wrA1MSc0Ny4yIkU!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p className="site-footer-map-text">
              Open In Google Maps
            </p>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="site-footer-bottom">
          <p>© {new Date().getFullYear()} Sumathi Universal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;