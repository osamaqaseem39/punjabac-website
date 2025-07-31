'use client';
import React, { useEffect, useState } from 'react';

const TOTAL_DURATION = 10000; // 10 seconds
const VIDEO_DURATION = 9500; // 9.5 seconds
const FADE_OUT_DURATION = 700; // ms, should match CSS

const BRAND_COLOR = '#001a33';

const Preloader = () => {
  const [showVideo, setShowVideo] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const videoTimer = setTimeout(() => setShowVideo(false), VIDEO_DURATION);
    const fadeOutTimer = setTimeout(() => setFadeOut(true), TOTAL_DURATION);
    const hideTimer = setTimeout(() => setHidden(true), TOTAL_DURATION + FADE_OUT_DURATION);
    return () => {
      clearTimeout(videoTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-700${fadeOut ? ' animate-fadeOut' : ''}`}
      style={{ backgroundColor: BRAND_COLOR }}
    >
      {showVideo && (
        <>
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/images/preloadervideo.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            style={{ zIndex: 1 }}
          />
          <div className="absolute inset-0" style={{ backgroundColor: BRAND_COLOR, opacity: 0.6, zIndex: 2 }} />
        </>
      )}
      {/* Logo always visible, centered */}
      <img
        src="/images/logo-dark.png"
        alt="Punjab AC Logo"
        className="relative z-10 w-40 md:w-56 drop-shadow-xl animate-fadeIn"
        style={{ zIndex: 3 }}
      />
    </div>
  );
};

export default Preloader; 