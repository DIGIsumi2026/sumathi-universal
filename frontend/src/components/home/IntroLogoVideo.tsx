import { Link } from 'react-router-dom';
import { videoAssets } from '../../data/videoAssets';

export default function IntroLogoVideo() {
  return (
    <section className="intro-logo-video-section">
      <video
        className="intro-logo-video"
        src={videoAssets.video.logoReveal}
        autoPlay
        muted
        loop
        playsInline
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
          institutions, multinational corporations, private enterprises and
          consumers across Sri Lanka.
        </p>

        <Link to="/about" className="intro-logo-btn">
          Learn More
        </Link>
      </div>
    </section>
  );
}