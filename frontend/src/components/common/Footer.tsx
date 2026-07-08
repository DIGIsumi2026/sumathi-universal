import { Facebook, Instagram, Mail, MapPin, PhoneCall, Send, Twitter } from 'lucide-react';
import { imageAssets } from '../../data/imageAssets';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-orb footer-orb--one" />
      <div className="footer-orb footer-orb--two" />
      <div className="container footer-newsletter">
        <h2>Subscribe Our Newsletter to Get<br />Our Latest Update & News</h2>
        <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
          <input type="email" placeholder="Email address" aria-label="Email address" />
          <button type="submit" aria-label="Subscribe"><Send size={18} /></button>
        </form>
      </div>
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src={imageAssets.brand.logo} alt="Printop" />
          <p>The smartest platform to discover authentic influencers, launch viral campaigns, and scale your brand's reach globally.</p>
        </div>
        <div>
          <h4>Quick Link</h4>
          <a href="/">Home</a>
          <a href="/about">About Us</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
        </div>
        <div>
          <h4>More Link</h4>
          <a href="/">FAQs</a>
          <a href="/">Privacy Policy</a>
          <a href="/">How It's Work</a>
          <a href="/">Supports</a>
        </div>
        <div>
          <h4>Contact</h4>
          <p><Mail size={16} /> demoinfo@gmail.com</p>
          <p><PhoneCall size={16} /> (302) 555-0107</p>
          <p><MapPin size={16} /> 1901 Thornridge Cir. Hawaii 54126</p>
          <div className="socials"><Facebook /><Instagram /><Twitter /></div>
        </div>
      </div>
    </footer>
  );
}
