'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const TOTAL_DURATION = 3000; // 3 seconds
const FADE_OUT_DURATION = 700; // ms, should match CSS

const BRAND_COLOR = '#001a33';

interface PreloaderProps {
  showOnHomeOnly?: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ showOnHomeOnly = true }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  // Only show preloader on home page if showOnHomeOnly is true
  const shouldShow = showOnHomeOnly ? pathname === '/' : true;

  useEffect(() => {
    if (!shouldShow) {
      setHidden(true);
      return;
    }

    const fadeOutTimer = setTimeout(() => setFadeOut(true), TOTAL_DURATION);
    const hideTimer = setTimeout(() => setHidden(true), TOTAL_DURATION + FADE_OUT_DURATION);
    
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, [shouldShow]);

  if (hidden || !shouldShow) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-700${fadeOut ? ' animate-fadeOut' : ''}`}
      style={{ backgroundColor: BRAND_COLOR }}
    >
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