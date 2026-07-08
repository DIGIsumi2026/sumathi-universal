import { ArrowRight, CheckCircle2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { imageAssets } from '../../data/imageAssets';
import FloatingShapesCanvas from './FloatingShapesCanvas';

const rotatingWords = ['Trending', 'Modern', 'Creative'];

export default function Hero() {
  return (
    <section className="hero-section section-pad">
      <FloatingShapesCanvas />
      <div className="hero-watermark">PRINTOP</div>
      <motion.div
        className="hero-content container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="eyebrow center"><span /> Print Beyond Limits <b>Trusted By 50K+ Clients</b></div>
        <h1>
          Find <span className="word-rotator">{rotatingWords.map((word) => <em key={word}>{word}</em>)}</span> Printing<br />For Your Brand
        </h1>
        <p>The smartest platform to discover authentic influencers, launch viral campaigns, and scale your brand's.</p>
        <div className="hero-buttons">
          <a className="gradient-btn" href="/contact"><ArrowRight size={18} /> Get Started</a>
          <a className="outline-btn" href="/contact"><ArrowRight size={18} /> Get In Touch</a>
        </div>
        <div className="hero-badges">
          <span><CheckCircle2 size={16} /> 10K+ Prints Delivered</span>
          <span><CheckCircle2 size={16} /> 24–48 Hour Fast Delivery</span>
          <span><CheckCircle2 size={16} /> 99% Client Satisfaction</span>
        </div>
      </motion.div>

      <motion.div
        className="hero-products container"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.9 }}
      >
        <img src={imageAssets.home.heroProducts} alt="Printed product mockups" />
      </motion.div>
      <div className="hero-avatar"><Plus size={34} /><span /><span /><span /></div>
      <div className="sale-sticker">SALE<br /><strong>MOCK</strong></div>
    </section>
  );
}
