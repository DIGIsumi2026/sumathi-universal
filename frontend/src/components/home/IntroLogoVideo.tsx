import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { imageAssets } from '../../data/imageAssets';
import { videoAssets } from '../../data/videoAssets';

export default function IntroLogoVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayedRef.current) {
          hasPlayedRef.current = true;
          video.currentTime = 0;

          video.play().catch((error) => {
            console.log('Video autoplay prevented:', error);
          });
        }
      },
      {
        threshold: 0.45,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="intro-logo-video-section">
      <video
        ref={videoRef}
        className="intro-logo-video"
        src={videoAssets.video.logoReveal}
        muted
        playsInline
        preload="auto"
      />

      <div className="intro-logo-video-overlay" />

      <div className="intro-logo-video-content">
        <span className="intro-logo-small-heading">Who We Are</span>

        <h2>
          Driven by Purpose. <br />
          Built on Excellence.
        </h2>

        <p>
          Sumathi Universal (Pvt) Ltd serves as the management and holding
          company of one of Sri Lanka&apos;s most diversified business groups.
          With a business legacy spanning more than three decades, the Group has
          established a strong presence across multiple industries through
          strategic investments, operational excellence, and long-term
          partnerships.
        </p>

        <p>
          Today, the Group operates a portfolio of businesses serving government
          institutions, multinational corporations, private enterprises  and
          consumers across Sri Lanka.
        </p>

        <Link to="/about" className="intro-logo-btn">
          Learn More
        </Link>
      </div>
    </section>
  );
}