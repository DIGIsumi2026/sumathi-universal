import printopLogo from '../assets/images/brand/printop-logo.svg';
import heroProducts from '../assets/images/home/hero-products.jpg';
import aboutCollage from '../assets/images/home/about-collage.jpg';
import serviceFace from '../assets/images/home/service-face.jpg';
import serviceHoodie from '../assets/images/home/service-hoodie.jpg';
import testimonialCard from '../assets/images/home/testimonial-card.jpg';
import categoryGrid from '../assets/images/home/category-grid.jpg';
import blogCards from '../assets/images/home/blog-cards.jpg';
import ctaPerson from '../assets/images/home/cta-person.jpg';
import footerReference from '../assets/images/home/footer-reference.jpg';


// home 
import companyLogo from "../assets/images/brand/company-logo.png";

export const imageAssets = {
  brand: {
    companyLogo
  },
  home: {
    heroProducts,
    aboutCollage,
    serviceFace,
    serviceHoodie,
    testimonialCard,
    categoryGrid,
    blogCards,
    ctaPerson,
    footerReference
  }
};

export type ImageAssets = typeof imageAssets;
