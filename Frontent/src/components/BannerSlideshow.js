import React from "react";
import "./BannerSlideshow.css";

/**
 * Static Banner Component
 *
 * Usage:
 * - Place the provided banner image at: public/images/banners/custom-banner.jpg
 * - The component will render that single image as the page banner.
 */

const BannerSlideshow = () => {
  const src = "/images/banners/custom-banner.jpg"; // <-- add your attached image here
  const alt = "Banner";

  const handleClick = () => {
    // Optionally navigate to home or another page
    window.location.href = "/";
  };

  return (
    <div className="banner-slideshow-container">
      <div className="banner-slideshow">
        <div className="banner-slide active" onClick={handleClick}>
          <img src={src} alt={alt} />
          <div className="banner-overlay">
            {/* Keeping overlay empty for clean static banner - remove if undesired */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSlideshow;
