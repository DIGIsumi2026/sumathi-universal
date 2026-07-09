//home 
import logoRevealVideo from "../assets/videos/Logo_reveal.mp4";

export const videoAssets = {
  home: {
    preview: '/videos/home-preview.mp4'
  },

  video:{
    logoReveal: logoRevealVideo
  }
};

export type VideoAssets = typeof videoAssets;
