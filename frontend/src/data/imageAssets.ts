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

// home - gallery 
import technologyIt from "../assets/images/home/technology-it.png";
import printing from "../assets/images/home/printing.png";
import securityFacility from "../assets/images/home/security-facility-services.png";
import engineeringTechnical from "../assets/images/home/engineering-technical-services.png";
import architectureDesign from "../assets/images/home/architecture-design.png";
import tradingCommerce from "../assets/images/home/trading-commerce.png";

//home service 
import printingCard from "../assets/images/home/printing-card.png";
import servicesCard from "../assets/images/home/services-card.png";
import managementInvestmentCard from "../assets/images/home/management-investment-card.png";
import csrCard from "../assets/images/home/csr-card.png";


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
  },

  services: {
  gallery: {
    technologyIt,
    printing,
    securityFacility,
    engineeringTechnical,
    architectureDesign,
    tradingCommerce,
  },
   whatWeDo: {
    printingCard,
    servicesCard,
    managementInvestmentCard,
    csrCard,
  },
},

};

export type ImageAssets = typeof imageAssets;
