import React from 'react';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent backdrop-blur-md transition-opacity duration-500">
      <img
        src="/preloader-logo.png"
        alt="Loading..."
        className="w-48 md:w-64 object-contain animate-pulse shadow-2xl rounded-sm"
      />
    </div>
  );
};

export default Preloader;
