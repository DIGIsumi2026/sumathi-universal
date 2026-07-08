import { motion } from 'framer-motion';
import { BadgeCheck, PenTool } from 'lucide-react';
import { imageAssets } from '../../data/imageAssets';

export default function AboutPreview() {
  return (
    <section className="about-preview section-pad">
      <div className="container two-col">
        <motion.div className="about-copy" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="eyebrow"><span /> Who We Are <b>About Our Company</b></div>
          <h2>High-Quality Modern Printing <u>Solutions</u></h2>
          <div className="counter-row"><PenTool /> <strong>55.6k+</strong><span>Prints Delivered Globally</span></div>
          <p>Printop is a modern printing company dedicated to delivering high-quality, reliable, and creative printing solutions with expert craftsmanship.</p>
          <a className="soft-pill" href="/about"><BadgeCheck size={16} /> Premium Quality Printing You Trust</a>
        </motion.div>
        <motion.div className="about-visual" initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <img src={imageAssets.home.aboutCollage} alt="Reliable platform collage" />
          <span className="ribbon-label">Reliable Platform</span>
          <div className="vertical-lines" />
        </motion.div>
      </div>
      <div className="sticky-service-strip">
        <div><span>Fast Turnaround</span><strong>24–48 Hours</strong></div>
        <div><span>Prints Delivered</span><strong>5000+</strong></div>
        <div><span>Happy Clients</span><strong>43+</strong></div>
        <a href="/contact">Talk to an expert</a>
      </div>
    </section>
  );
}
