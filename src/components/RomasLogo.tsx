import React from 'react';

interface RomasLogoProps {
  variant?: 'gold' | 'brown' | 'yellow' | 'white' | 'cream' | 'badge';
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isSubmark?: boolean;
}

export const RomasLogo: React.FC<RomasLogoProps> = ({
  variant = 'brown',
  showTagline = true,
  size = 'md',
  className = '',
  isSubmark = false,
}) => {
  // Dimension styles matching proportions of the official ROMAS asset
  const heightClasses = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-20 sm:h-24',
  };

  const currentHeight = heightClasses[size] || heightClasses.md;

  // Submark variant: circular emblem
  if (isSubmark) {
    const submarkSizes = {
      sm: 'w-12 h-12 text-[10px]',
      md: 'w-16 h-16 text-xs',
      lg: 'w-24 h-24 text-base',
      xl: 'w-32 h-32 text-xl',
    };

    return (
      <div
        className={`inline-flex flex-col items-center justify-center rounded-full border-2 p-2 text-center aspect-square select-none shadow-sm transition-transform hover:scale-105 ${submarkSizes[size]} ${className}`}
        style={{
          borderColor: variant === 'white' ? '#FFFFFF' : '#D4AF37',
          backgroundColor: variant === 'brown' || variant === 'badge' ? '#FCDD7A' : '#381305',
          color: variant === 'brown' || variant === 'badge' ? '#381305' : '#FCDD7A',
        }}
        title="ROMAS Official Submark"
        role="img"
        aria-label="ROMAS Official Submark"
      >
        <span className="font-serif font-black tracking-tight leading-none">ROMAS</span>
        <span className="text-[5px] sm:text-[6px] tracking-widest uppercase font-semibold mt-0.5 opacity-90">
          HAPPINESS
        </span>
      </div>
    );
  }

  // Official Yellow Badge variant (with signature yellow background card)
  if (variant === 'badge' || variant === 'yellow') {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-2xl overflow-hidden shadow-sm border border-[#D4AF37]/30 bg-[#FAD674] p-1.5 transition-transform hover:scale-[1.02] ${className}`}
      >
        <img
          src="/assets/romas-logo-badge.jpg"
          alt="ROMAS™ Spreading Happiness"
          className={`${currentHeight} w-auto object-contain select-none`}
          loading="eager"
        />
      </div>
    );
  }

  // Select transparent asset based on variant
  let logoSrc = '/assets/romas-logo-brown.png';
  if (variant === 'white') {
    logoSrc = '/assets/romas-logo-white.png';
  } else if (variant === 'gold') {
    logoSrc = '/assets/romas-logo-gold.png';
  } else if (variant === 'cream') {
    logoSrc = '/assets/romas-logo-white.png';
  }

  return (
    <div
      className={`inline-flex items-center justify-center select-none ${className}`}
      role="img"
      aria-label="ROMAS™ Spreading Happiness"
    >
      <img
        src={logoSrc}
        alt="ROMAS™ Spreading Happiness"
        className={`${currentHeight} w-auto object-contain transition-opacity duration-200`}
        loading="eager"
        draggable={false}
      />
    </div>
  );
};
