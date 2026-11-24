import React, { useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export const Gr8rHero: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [posterSettled, setPosterSettled] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#381A0E] select-none"
    >
      <picture>
        <source media="(max-width: 768px)" srcSet="/assets/video/hero-chocolate-small.webp" />
        <img
          src="/assets/video/hero-chocolate.webp"
          alt=""
          fetchPriority="high"
          onLoad={() => setPosterSettled(true)}
          onError={() => setPosterSettled(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      {posterSettled && !reduceMotion && (
        <video
          src="/assets/video/hero-chocolate.mp4"
          autoPlay
          muted
          playsInline
          loop
          aria-hidden="true"
          onPlaying={() => setVideoPlaying(true)}
          onError={() => setVideoPlaying(false)}
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${videoPlaying ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(56, 26, 14, 0.175) 0%, rgba(36, 17, 8, 0.2625) 70%, rgba(20, 9, 4, 0.95) 100%)',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#381A0E] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#381A0E] via-[#381A0E]/80 to-transparent" />
    </section>
  );
};
