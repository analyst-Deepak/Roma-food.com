import React from 'react';
import { motion } from 'framer-motion';
import { ImageSequencePlayer } from './ImageSequencePlayer';

export const Gr8rHero: React.FC = () => {
  const marqueeItems = [
    'MILK COMPOUND BUTTONS',
    '55% DARK COUVERTURE',
    '70% SINGLE ORIGIN NOIR',
    'HAZELNUT PRALINE',
    'DUTCH ALKALIZED COCOA',
    'SILK CHOCOLATE GANACHE',
    'CARAMEL BUTTERSCOTCH',
    'MIRROR GLAZE',
    'ARTISAN DARK TRUFFLES',
    'PURE COCOA BUTTER SLABS',
  ];

  return (
    <section
      id="home"
      className="relative bg-[#381A0E] text-[#FEE8B4] min-h-screen flex flex-col justify-between overflow-hidden select-none"
    >
      {/* 1080p High-Speed Cinematic Chocolate Sequence (Droplets / Stream / Beans) */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <ImageSequencePlayer
          initialSequence="droplets"
          frameCount={80}
          fps={26}
          overlayOpacity={0.25}
        />
      </div>
    </section>
  );
};

