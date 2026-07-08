import { ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { imageAssets } from '../../data/imageAssets';

export default function Testimonials() {
  return (
    <section className="testimonial-section section-pad">
      <div className="container section-head split-head">
        <div>
          <div className="eyebrow"><span /> Testimonial <b>What Our Clients Say</b></div>
          <h2>High-Quality Services With Fast <u>Delivery.</u></h2>
        </div>
        <div className="head-action"><p>We take pride in delivering high-quality printing solutions that exceed expectations.</p><a className="gradient-btn" href="/contact"><ArrowRight size={17} /> Get In Touch</a></div>
      </div>
      <motion.div className="container testimonial-card" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
        <img src={imageAssets.home.testimonialCard} alt="Customer testimonial" />
        <div className="testimonial-overlay">
          <div className="stars">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={16} fill="currentColor" />)}</div>
          <h3>Fast & Reliable Printing Service</h3>
          <p>“We were impressed by their speed and precision. Every order was delivered on time without compromising quality.”</p>
          <ul><li>Quick Turnaround Time</li><li>Dependable Service Quality</li><li>Customer Satisfaction Focused</li></ul>
          <div className="quote-mark">”</div>
          <div className="mini-nav"><ChevronLeft /><ChevronRight /></div>
        </div>
      </motion.div>
    </section>
  );
}
