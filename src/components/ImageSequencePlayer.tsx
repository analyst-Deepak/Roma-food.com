import React, { useEffect, useRef, useState } from 'react';

type SequenceType = 'droplets' | 'pour' | 'beans';

interface ImageSequencePlayerProps {
  initialSequence?: SequenceType;
  frameCount?: number;
  fps?: number;
  className?: string;
  overlayOpacity?: number;
  autoCycle?: boolean;
}

const SEQUENCE_LIST: SequenceType[] = ['droplets', 'pour', 'beans'];

export const ImageSequencePlayer: React.FC<ImageSequencePlayerProps> = ({
  initialSequence = 'droplets',
  frameCount = 80,
  fps = 26,
  className = '',
  overlayOpacity = 0.45,
  autoCycle = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [activeSequence, setActiveSequence] = useState<SequenceType>(initialSequence);
  const [isPlaying, setIsPlaying] = useState(true);

  // Active sequence ref to prevent closure staleness in requestAnimationFrame
  const activeSeqRef = useRef<SequenceType>(initialSequence);
  const isPlayingRef = useRef(true);
  const currentFrameRef = useRef(0);
  const lastTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // In-memory cache holding preloaded HTMLImageElement arrays for all 3 sequences
  const cacheRef = useRef<Record<SequenceType, HTMLImageElement[]>>({
    droplets: [],
    pour: [],
    beans: [],
  });

  // Preload all 3 sequences into memory (starts with droplets for immediate playback)
  useEffect(() => {
    const folderMap: Record<SequenceType, string> = {
      droplets: '/sequence/droplets',
      pour: '/sequence/pour',
      beans: '/sequence/beans',
    };

    // Helper to load sequence array
    const preloadSequence = (seq: SequenceType) => {
      const arr: HTMLImageElement[] = [];
      const basePath = folderMap[seq];
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const frameNum = String(i).padStart(3, '0');
        img.src = `${basePath}/frame_${frameNum}.jpg`;
        arr.push(img);
      }
      cacheRef.current[seq] = arr;
    };

    // Prioritize loading initial sequence first
    preloadSequence(initialSequence);

    // Stream other sequences in background
    SEQUENCE_LIST.forEach((seq) => {
      if (seq !== initialSequence) {
        preloadSequence(seq);
      }
    });
  }, [initialSequence, frameCount]);

  // Keep refs synced with React state
  useEffect(() => {
    activeSeqRef.current = activeSequence;
  }, [activeSequence]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Draw a frame from the specified sequence to canvas
  const drawFrame = (seq: SequenceType, frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const seqImages = cacheRef.current[seq];
    if (!seqImages || !seqImages[frameIndex]) return;

    const img = seqImages[frameIndex];
    if (!img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Maintain aspect ratio with object-fit: cover
    const scale = Math.max(cw / iw, ch / ih);
    const nw = iw * scale;
    const nh = ih * scale;
    const nx = (cw - nw) / 2;
    const ny = (ch - nh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, nx, ny, nw, nh);
  };

  // Continuous animation loop: plays frames and auto-transitions through the sequences
  useEffect(() => {
    const frameInterval = 1000 / fps;

    const render = (time: number) => {
      if (!isPlayingRef.current) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;

      if (delta >= frameInterval) {
        lastTimeRef.current = time - (delta % frameInterval);

        const currentSeq = activeSeqRef.current;
        const currentF = currentFrameRef.current;

        if (currentF + 1 < frameCount) {
          // Play next frame in current sequence
          const nextF = currentF + 1;
          currentFrameRef.current = nextF;
          setCurrentFrame(nextF);
          drawFrame(currentSeq, nextF);
        } else {
          // Reached frame 80! Auto advance to next sequence in line
          if (autoCycle) {
            const currentIdx = SEQUENCE_LIST.indexOf(currentSeq);
            const nextSeq = SEQUENCE_LIST[(currentIdx + 1) % SEQUENCE_LIST.length];
            activeSeqRef.current = nextSeq;
            setActiveSequence(nextSeq);
            currentFrameRef.current = 0;
            setCurrentFrame(0);
            drawFrame(nextSeq, 0);
          } else {
            // Loop current sequence
            currentFrameRef.current = 0;
            setCurrentFrame(0);
            drawFrame(currentSeq, 0);
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [fps, frameCount, autoCycle]);

  // Handle canvas resize with devicePixelRatio
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      drawFrame(activeSeqRef.current, currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Manual switch by user click (resets frame to 0 and continues auto-cycling from there)
  const handleManualSwitch = (type: SequenceType) => {
    activeSeqRef.current = type;
    setActiveSequence(type);
    currentFrameRef.current = 0;
    setCurrentFrame(0);
    drawFrame(type, 0);
  };

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* HTML5 Canvas Rendering High-Speed 1080p Image Sequence */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
      />

      {/* Cinematic Deep Roast Chocolate Ambient Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, rgba(56, 26, 14, ${overlayOpacity * 0.7}) 0%, rgba(36, 17, 8, ${overlayOpacity * 1.05}) 70%, rgba(20, 9, 4, 0.95) 100%)`,
        }}
      />

      {/* Soft Vignettes */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#381A0E] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#381A0E] via-[#381A0E]/80 to-transparent pointer-events-none" />

    </div>
  );
};
