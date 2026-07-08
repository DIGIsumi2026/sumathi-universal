import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import { imageAssets } from '../../data/imageAssets';

const posts = [
  { tag: 'Branding Ideas', author: 'Jerome', title: 'Best Materials for Product Packaging' },
  { tag: 'Printing Trends', author: 'Courtney Henry', title: 'Top Trends in Modern Printing System' },
  { tag: 'Design Tips', author: 'Bessie Cooper', title: 'How to Improve Print Quality System' },
  { tag: 'Creative Ideas', author: 'Robert Fox', title: 'Better Labels for Modern Product Launches' }
];

export default function BlogInsights() {
  return (
    <section className="blog-section section-pad">
      <div className="container section-head split-head">
        <div>
          <div className="eyebrow"><span /> Our Blog <b>News & Insights</b></div>
          <h2>Explore Expert Insights And Creative <u>Ideas</u></h2>
        </div>
        <div className="head-action"><p>Our blog is designed to help businesses and individuals make smarter printing decisions, improve design.</p><a className="gradient-btn" href="/"><ArrowRight size={17} /> See All Blogs</a></div>
      </div>
      <motion.div className="container blog-slider" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{ prevEl: '.blog-prev', nextEl: '.blog-next' }}
          autoplay={{ delay: 2800, disableOnInteraction: false }}
          loop
          spaceBetween={22}
          breakpoints={{ 0: { slidesPerView: 1 }, 720: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {posts.map((post, index) => (
            <SwiperSlide key={post.title}>
              <article className="blog-card">
                <span className="blog-tag">{post.tag}</span>
                <img src={index % 2 ? imageAssets.home.blogCards : imageAssets.home.serviceFace} alt={post.title} />
                <div className="date-badge"><strong>25</strong><span>May, 26</span></div>
                <p>{post.author} · 216 Comments</p>
                <h3>{post.title}</h3>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="blog-nav"><button className="blog-prev"><ChevronLeft /></button><span /><button className="blog-next"><ChevronRight /></button></div>
      </motion.div>
    </section>
  );
}
