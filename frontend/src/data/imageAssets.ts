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

//companies
import Logo1 from "../assets/images/home/company1.png";
import Logo2 from "../assets/images/home/company2.png";
import Logo3 from "../assets/images/home/company3.png";
import Logo4 from "../assets/images/home/company4.png";
import Logo5 from "../assets/images/home/company5.png";
import Logo6 from "../assets/images/home/company6.png";
import Logo7 from "../assets/images/home/company7.png";
import Logo8 from "../assets/images/home/company8.png";
import Logo9 from "../assets/images/home/company9.png";
import Logo10 from "../assets/images/home/company10.png";
import Logo11 from "../assets/images/home/company11.png";
import Logo12 from "../assets/images/home/company12.png";
import Logo13 from "../assets/images/home/company13.png";
import Logo14 from "../assets/images/home/company14.png";
import Logo15 from "../assets/images/home/company15.png";
import Logo16 from "../assets/images/home/company16.png";

//contact cta
import contactCtaBg from "../assets/images/home/contact-cta-bg.png";



export const imageAssets = {
  brand: {
    companyLogo
  },
  home: {
    contactCtaBg,

    
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

companies: {
  Logo1,
  Logo2,
  Logo3,
  Logo4,
  Logo5,
  Logo6,
  Logo7,
  Logo8,
  Logo9,
  Logo10,
  Logo11,
  Logo12,
  Logo13,
  Logo14,
  Logo15,
  Logo16
},



};

export type ImageAssets = typeof imageAssets;
