import React from 'react';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-500">
      <video
        autoPlay
        muted
        playsInline
        loop
        className="w-[80vw] md:w-[40vw] lg:w-[30vw] max-w-md object-contain"
        src="/video/YOUR_VIDEO_FILE.webm"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Preloader;
