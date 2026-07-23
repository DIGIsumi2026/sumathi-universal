//home 
import logoRevealVideo from "../assets/videos/Logo_reveal.mp4";

//about us
import aboutHeroVideo from "../assets/videos/sumathi-universal-about-hero.mp4";

//csr
import csrHeroVideo from "../assets/videos/csr-hero-video.mp4";


export const videoAssets = {
  home: {
    preview: '/videos/home-preview.mp4'
  },

  video:{
    logoReveal: logoRevealVideo
  },

   about: {
    heroVideo: aboutHeroVideo
  },

  csr:{
    heroVideo: csrHeroVideo
  },
};

export type VideoAssets = typeof videoAssets;
