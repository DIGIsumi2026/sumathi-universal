import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { imageAssets } from '../../data/imageAssets';

const services = [
  {
    image: imageAssets.home.serviceFace,
    title: 'Custom Caps And Hat Printing Services',
    text: 'Create vibrant accessories with high-quality detail, premium inks, and durable finishes.'
  },
  {
    image: imageAssets.home.serviceHoodie,
    title: 'Hoodie And Sweatshirt Custom Printing Services',
    text: 'Premium hoodie and sweatshirt printing with comfortable fabrics and bold designs.'
  },
  {
    image: imageAssets.home.heroProducts,
    title: 'Packaging And Label Printing Services',
    text: 'Beautiful mockups and packaging layouts for retail products, stickers, and launch campaigns.'
  }
];

export default function ServicesCarousel() {
  return (
    <section className="services-section section-pad">
      <div className="container section-head split-head">
        <div>
          <div className="eyebrow"><span /> Our Services <b>Creative Printing Solutions</b></div>
          <h2>High-Quality Services With Fast <u>Delivery.</u></h2>
        </div>
        <div className="head-action">
          <p>We offer a wide range of professional printing services designed to meet business needs and individual impact.</p>
          <a className="gradient-btn" href="/services"><ArrowRight size={17} /> See All Services</a>
        </div>
      </div>
      <div className="container service-slider-wrap">
        <button className="swiper-prev round-nav" aria-label="Previous service"><ChevronLeft /></button>
        <button className="swiper-next round-nav round-nav--next" aria-label="Next service"><ChevronRight /></button>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{ prevEl: '.swiper-prev', nextEl: '.swiper-next' }}
          loop
          autoplay={{ delay: 2600, disableOnInteraction: false }}
          slidesPerView={1}
          className="service-swiper"
        >
          {services.map((service) => (
            <SwiperSlide key={service.title}>
              <motion.article className="service-slide" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="service-main-image"><img src={service.image} alt={service.title} /></div>
                <div className="service-text">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <a href="/contact"><ArrowRight size={18} /></a>
                </div>
                <div className="service-stack">
                  {services.map((item, index) => <img key={`${item.title}-${index}`} src={item.image} alt="Service preview" />)}
                </div>
              </motion.article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
