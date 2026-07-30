import React from 'react';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm transition-opacity duration-500">
      <img
        src="/preloader-logo.png"
        alt="Loading..."
        className="w-24 sm:w-32 md:w-44 object-contain animate-pulse drop-shadow-2xl rounded-sm"
      />
    </div>
  );
};

export default Preloader;
