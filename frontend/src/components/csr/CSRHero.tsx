import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { imageAssets } from '../../data/imageAssets';
import { videoAssets } from '../../data/videoAssets';

export default function CSRHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const desktopMode = window.innerWidth >= 1025;

      setIsDesktop(desktopMode);

      if (!desktopMode) {
        setShowThumbnail(true);
      } else {
        setShowThumbnail(false);
      }
    };

    checkDevice();

    window.addEventListener('resize', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop || !videoRef.current) return;

    const video = videoRef.current;

    const playVideo = async () => {
      try {
        video.currentTime = 0;
        await video.play();
      } catch {
        setShowThumbnail(true);
      }
    };

    playVideo();
  }, [isDesktop]);

  const handleVideoEnd = () => {
    setShowThumbnail(true);
  };

  const scrollToContent = () => {
    const section = document.getElementById('csr-content');

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="csr-hero-section">
      <div className="csr-hero-media">
        {isDesktop && !showThumbnail && (
          <video
            ref={videoRef}
            className="csr-hero-video"
            src={videoAssets.csr.heroVideo}
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
          />
        )}

        <img
          src={imageAssets.csr.heroThumbnail}
          alt="CSR community support in Sri Lanka"
          className={`csr-hero-thumbnail ${
            showThumbnail || !isDesktop ? 'thumbnail-visible' : ''
          }`}
          draggable={false}
        />
      </div>

      <div className="csr-hero-content">
        <p>
          We are committed to empowering the people of Sri Lanka and giving back
          to the country while securing its future.
        </p>

        <button type="button" className="csr-hero-see-more" onClick={scrollToContent}>
          See More
          <ArrowDown size={18} />
        </button>
      </div>
    </section>
  );
}