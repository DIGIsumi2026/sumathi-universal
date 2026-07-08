import { CreditCard, Mail, PhoneCall, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { imageAssets } from '../../data/imageAssets';

export default function ContactCTA() {
  return (
    <section className="contact-cta section-pad">
      <div className="container cta-grid">
        <motion.div className="cta-image" initial={{ opacity: 0, x: -45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <img src={imageAssets.home.ctaPerson} alt="Creative product print" />
        </motion.div>
        <motion.div className="cta-copy" initial={{ opacity: 0, x: 45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="eyebrow"><span /> Get In Touch <b>Printing Team</b></div>
          <h2>Bringing Creativity And Quality Together</h2>
          <p>Take your printing to the next level with Printop. Whether you need business materials, custom products, or large-scale prints, our team is ready.</p>
          <div className="cta-benefits">
            <article><Truck /><strong>Enjoy free shipping on all orders with no minimum required</strong></article>
            <article><CreditCard /><strong>Secure payments with fast, reliable, and easy processing</strong></article>
            <article><ShieldCheck /><strong>Premium support and print-ready quality checks</strong></article>
          </div>
        </motion.div>
      </div>
      <div className="container purple-contact-bar">
        <a href="mailto:demo@gmail.com"><Mail /> <span>Get In Touch:</span><strong>demo@gmail.com</strong></a>
        <b>OR</b>
        <a href="tel:+2095550104"><PhoneCall /> <span>24/7 Support</span><strong>(209) 555-0104</strong></a>
      </div>
    </section>
  );
}
