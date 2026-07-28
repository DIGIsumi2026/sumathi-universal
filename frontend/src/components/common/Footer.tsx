import React from 'react';
import '../../styles/global.css'
import { Link } from 'react-router-dom';
import { imageAssets } from '../../data/imageAssets';
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#283059] text-white pt-16 pb-6 relative overflow-hidden">
      
      {/* Background Watermark */}
      <div className="absolute bottom-10 left-0 w-full text-[9vw] font-black text-white/[0.03] pointer-events-none select-none text-center leading-none z-0 tracking-widest uppercase">
        sumathiuniversal.com
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Section 1: Company Info */}
          <div className="flex flex-col">
            <img src={imageAssets.brand.companyLogo} alt="Sumathi Universal Logo" className="h-14 object-contain mb-6 self-start" />
            <p className="text-gray-300 text-sm mb-8 leading-relaxed">
              Sumathi Universal delivers specialized services across diverse sectors with a commitment to excellence, innovation, and unwavering reliability.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-500 flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all duration-300">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="flex flex-col space-y-4">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/management" className="footer-link">Management</Link></li>
              <li><Link to="/csr" className="footer-link">CSR</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Section 3: Contact Us */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
            <ul className="flex flex-col space-y-5 text-sm text-gray-300">
              <li className="flex items-start gap-4">
                <MapPin size={20} className="text-[#FBBF24] shrink-0 mt-1" />
                <span className="leading-relaxed">
                  No. 02, Dr. Milina Sumathipala Mawatha,<br />
                  Colombo 10. Sri Lanka.
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={20} className="text-[#FBBF24] shrink-0" />
                <a href="tel:+94112697106" className="hover:text-white transition-colors duration-300">+94 11 269 7106</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={20} className="text-[#FBBF24] shrink-0" />
                <a href="mailto:info@sumathiuniversal.com" className="hover:text-white transition-colors duration-300">info@sumathiuniversal.com</a>
              </li>
            </ul>
          </div>

          {/* Section 4: Google Map */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Google Map</h3>
            <div className="w-full h-48 rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <iframe
                title="Sumathi Universal Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.7686888206144!2d79.8631024!3d6.918231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNTUnMDUuNiJOIDc5wrA1MSc0Ny4yIkU!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter brightness-90 contrast-125 grayscale-[20%]"
              ></iframe>
            </div>
            <p className="text-xs text-gray-400 mt-3 hover:text-white transition-colors cursor-pointer inline-block">
              Open In Google Maps
            </p>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-white/10 pt-6 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Sumathi Universal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;