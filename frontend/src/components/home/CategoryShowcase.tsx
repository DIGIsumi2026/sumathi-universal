import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { imageAssets } from '../../data/imageAssets';

const categories = [
  'Custom Apparel',
  'Marketing Materials',
  'Product Packaging',
  'Label and Sticker',
  'Large Format',
  'Promotional Products'
];

export default function CategoryShowcase() {
  return (
    <section className="category-section section-pad">
      <div className="category-watermark">CATEGORY</div>
      <div className="container category-layout">
        <motion.div className="category-cards" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          {categories.map((item, index) => (
            <article key={item} className="category-card">
              <div className="category-thumb"><img src={index % 2 ? imageAssets.home.serviceFace : imageAssets.home.serviceHoodie} alt={item} /></div>
              <h3>{item}</h3>
              <span>2.5k+ Design Styles</span>
              <button type="button" aria-label={`Open ${item}`}><ArrowRight size={16} /></button>
            </article>
          ))}
        </motion.div>
        <motion.div className="category-offer" initial={{ opacity: 0, x: 45 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <img src={imageAssets.home.categoryGrid} alt="Printing category offer" />
          <div className="offer-copy">
            <span>55% | Trending Hot Offers</span>
            <h2>Enjoy High-Quality<br />Printing Services</h2>
            <a className="gradient-btn" href="/contact">Click & Order Now</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
