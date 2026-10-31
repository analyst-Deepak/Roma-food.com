import React, { useEffect, useRef, useState } from 'react';

export const Gr8rStatement: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLVideoElement>(null);
  const bootRef = useRef<HTMLDivElement>(null);
  const bootBarRef = useRef<HTMLElement>(null);
  const bootPctRef = useRef<HTMLParagraphElement>(null);
  const meterRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<(HTMLElement | null)[]>([]);

  // On phones, skip the heavy scroll-scrub video entirely for a fast, lag-free load.
  const [isMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  );

  useEffect(() => {
    // Chocolate-bar crushing sequence, all-intra (every frame a keyframe) so the scroll scrub lands on an exact frame instantly. Portrait clip on phones, landscape on desktop.
    const VIDEO_URL = isMobile
      ? '/assets/video/choco_crush_mobile.mp4'
      : '/assets/video/choco_crush.mp4';
    const FALLBACK_URL = VIDEO_URL;

    const track = trackRef.current;
    const clip = clipRef.current;
    const boot = bootRef.current;
    const bootBar = bootBarRef.current;
    const bootPct = bootPctRef.current;
    const meter = meterRef.current;
    const panels = panelsRef.current.filter(Boolean) as HTMLElement[];

    if (!track || !clip || !boot || !bootBar || !bootPct || !meter) return;
    const videoEl = clip;

    // Cue table: Each panel owns [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd] in 0..1 scroll progress.
    // The gaps between one panel's fadeOutEnd and the next's fadeInStart are deliberate dead zones — video only — so two panels are never readable at once.
    const CUES = [
      [0.00, 0.00, 0.15, 0.23],
      [0.35, 0.43, 0.57, 0.65],
      [0.77, 0.85, 1.10, 1.20],
    ];
    const DRIFT = 22; // px of counter-scroll travel per panel

    // Helpers
    function clamp(v: number, a: number, b: number) {
      return Math.max(a, Math.min(b, v));
    }
    function smooth(t: number) {
      return t * t * (3 - 2 * t); // smoothstep
    }
    function ramp(p: number, a: number, b: number) {
      if (b <= a) return p >= b ? 1 : 0;
      return smooth(clamp((p - a) / (b - a), 0, 1));
    }

    // State variables
    let progress = 0;
    let seekTo = 0;
    let seekAt = 0;
    let duration = 0;
    let ready = false;
    let started = false;
    let attached = false;
    let animId = 0;

    function readScroll() {
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const maxScroll = track.offsetHeight - window.innerHeight;
      progress = maxScroll > 0 ? clamp(-rect.top / maxScroll, 0, 1) : 0;
      if (duration) seekTo = progress * duration;
    }

    function paint() {
      if (!meter) return;
      meter.style.transform = `scaleX(${progress})`;
      for (let i = 0; i < panels.length; i++) {
        const c = CUES[i];
        const el = panels[i];
        if (!c || !el) continue;
        const enter = ramp(progress, c[0], c[1]);
        const leave = ramp(progress, c[2], c[3]);
        const o = enter * (1 - leave);
        const y = (1 - enter) * DRIFT - leave * DRIFT;
        el.style.opacity = `${o}`;
        el.style.transform = `translate3d(0,${y}px,0)`;
        el.style.pointerEvents = o > 0.6 ? 'auto' : 'none';
      }
    }

    // Frame rAF loop — easing currentTime toward the scroll target (rather than snapping) turns a jumpy scrub into a smooth one.
    function frame() {
      if (ready && duration && clip) {
        const gap = seekTo - seekAt;
        if (Math.abs(gap) > 0.0008) {
          seekAt += gap * 0.115; // easing factor — do not change
          if (clip.readyState >= 2 && !clip.seeking) {
            try {
              clip.currentTime = seekAt;
            } catch (e) {
              // Ignore seek collisions
            }
          }
        }
      }
      paint();
      animId = requestAnimationFrame(frame);
    }

    function setProgress(f: number) {
      if (bootBar) bootBar.style.transform = `scaleX(${f})`;
      if (bootPct) bootPct.textContent = `LOADING ${Math.round(f * 100)}%`;
    }

    function start() {
      if (started) return;
      started = true;
      ready = true;
      if (boot) boot.classList.add('done');
      readScroll();
      seekAt = seekTo;
    }

    function attach(src: string) {
      if (attached) return;
      attached = true;

      videoEl.addEventListener('loadedmetadata', function () {
        duration = videoEl.duration || 0;
        videoEl.pause();
        readScroll();
        seekAt = seekTo;
        try {
          videoEl.currentTime = seekAt;
        } catch (e) {}
      });
      videoEl.addEventListener('loadeddata', start);
      videoEl.addEventListener('canplaythrough', start);
      videoEl.addEventListener('error', () => {
        // Fallback to local copy if remote fails
        if (src !== FALLBACK_URL) {
          attached = false;
          attach(FALLBACK_URL);
        } else {
          start();
        }
      });

      videoEl.src = src;
      videoEl.load();
      setTimeout(start, 12000); // Failsafe so a stalled decode never strands page behind preloader
    }

    // Fetching mp4 as a fully buffered blob first: seeking inside a buffered blob is near instant, while range requests over the network are a slideshow.
    function preload() {
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
      const signal = controller ? controller.signal : undefined;

      const bail = setTimeout(function () {
        if (!attached) {
          if (controller) controller.abort();
          setProgress(1);
          attach(VIDEO_URL);
        }
      }, 15000);

      fetch(VIDEO_URL, { signal })
        .then((res) => {
          if (!res.ok || !res.body) throw new Error('Fetch failed');
          const total = Number(res.headers.get('content-length')) || 0;
          const reader = res.body.getReader();
          const chunks: any[] = [];
          let got = 0;

          function pump(): Promise<Blob> {
            return reader.read().then((result) => {
              if (result.done) {
                return new Blob(chunks, { type: 'video/mp4' });
              }
              chunks.push(result.value);
              got += result.value.byteLength;
              setProgress(total ? got / total : Math.min(got / 11e6, 0.95));
              return pump();
            });
          }
          return pump();
        })
        .then((blob) => {
          clearTimeout(bail);
          setProgress(1);
          attach(URL.createObjectURL(blob));
        })
        .catch(() => {
          clearTimeout(bail);
          setProgress(1);
          // Try remote first, fallback handles local
          attach(VIDEO_URL);
        });
    }

    // iOS unlock: iOS will not paint a frame from a video that has never been played, so nudge it once on first interaction and pause immediately.
    function unlock() {
      if (!clip) return;
      const p = clip.play();
      if (p && p.then) {
        p.then(function () {
          clip.pause();
        }).catch(function () {});
      } else {
        clip.pause();
      }
    }
    const unlockEvents = ['touchstart', 'pointerdown', 'wheel', 'keydown'] as const;
    unlockEvents.forEach((ev) => {
      window.addEventListener(ev, unlock, { once: true, passive: true });
    });

    // Wiring listeners
    window.addEventListener('scroll', readScroll, { passive: true });
    window.addEventListener('resize', readScroll);

    readScroll();
    paint();
    preload();
    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', readScroll);
      window.removeEventListener('resize', readScroll);
    };
  }, [isMobile]);

  return (
    <section
      id="about"
      ref={trackRef}
      className="cnr-track relative z-10 w-full select-none"
      style={{
        height: isMobile ? '300vh' : '520vh',
        minHeight: isMobile ? '1700px' : '3000px',
        backgroundColor: '#edecea',
      }}
    >
      {/* Fixed/Sticky Full-Screen Viewport Layer */}
      <div className="sticky top-0 h-screen w-full overflow-hidden text-[#0d0c0b]" style={{ backgroundColor: '#edecea' }}>
        {/* Scoped CSS styling matching Cast & Render specs */}
        <style>{`
          .cnr-track {
            --fg: #0d0c0b;
            --fg-soft: rgba(13,12,11,.64);
            --fg-faint: rgba(13,12,11,.42);
            --shade: #edecea;
            --rule: rgba(13,12,11,.16);
            --ease: cubic-bezier(.22,.61,.36,1);
            --pill-bg: #0a0908;
            --pill-fg: #ffffff;
            font-family: 'Inter Tight', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          }

          /* PRELOADER */
          .cnr-boot {
            position: absolute;
            inset: 0;
            z-index: 90;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
            background: var(--shade);
            transition: opacity .7s var(--ease), visibility .7s;
          }
          .cnr-boot.done {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
          }
          .cnr-boot p {
            font-size: 12.5px;
            letter-spacing: .05em;
            color: var(--fg-faint);
            font-weight: 500;
          }
          .cnr-bar {
            width: 150px;
            height: 1px;
            background: var(--rule);
            overflow: hidden;
          }
          .cnr-bar i {
            display: block;
            height: 100%;
            width: 100%;
            background: var(--fg);
            transform: scaleX(0);
            transform-origin: 0 50%;
            transition: transform .15s ease-out;
          }

          /* STAGE VIDEO & VEIL */
          .cnr-stage {
            position: absolute;
            inset: 0;
            z-index: 0;
            overflow: hidden;
            background: var(--shade);
          }
          .cnr-stage video {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            transform: translate(-50%, -50%) scale(1.02);
            object-fit: cover;
            filter: contrast(1.02);
            will-change: transform;
          }
          .cnr-veil {
            position: absolute;
            inset: 0;
            pointer-events: none;
            background:
              linear-gradient(to bottom, rgba(237,236,234,.70) 0%, rgba(237,236,234,.10) 22%, rgba(237,236,234,.10) 78%, rgba(237,236,234,1) 100%),
              radial-gradient(100% 80% at 50% 48%, rgba(237,236,234,0) 0%, rgba(237,236,234,.25) 100%),
              rgba(237,236,234,.18);
          }
          .cnr-grain {
            position: absolute;
            inset: -50%;
            opacity: .06;
            pointer-events: none;
            background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/></filter><rect width='140' height='140' filter='url(%23n)' opacity='.5'/></svg>");
          }

          /* HAIRLINE SCROLL METER */
          .cnr-meter {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 50;
            height: 2px;
            width: 100%;
            transform: scaleX(0);
            transform-origin: 0 50%;
            background: var(--fg);
            opacity: .55;
          }

          /* PANEL SYSTEM */
          .cnr-panels {
            position: absolute;
            inset: 0;
            z-index: 20;
            pointer-events: none;
          }
          .cnr-panel {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: max(104px, calc(env(safe-area-inset-top, 0px) + 88px)) clamp(20px, 5vw, 60px) max(96px, calc(env(safe-area-inset-bottom, 0px) + 80px));
            opacity: 0;
            will-change: opacity, transform;
          }
          .cnr-eyebrow {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 6px 12px;
            font-size: clamp(11.5px, 0.9vw, 13px);
            letter-spacing: .08em;
            text-transform: uppercase;
            color: #8C4724;
            margin-bottom: clamp(12px, 1.6vw, 18px);
            max-width: min(48ch, 100%);
            text-align: center;
            font-weight: 600;
          }
          .cnr-h1 {
            font-weight: 500;
            font-size: clamp(28px, 4.2vw, 58px);
            line-height: 1.04;
            letter-spacing: -.028em;
            max-width: 16ch;
            text-wrap: balance;
            color: var(--fg);
          }
          .cnr-sub {
            margin-top: clamp(14px, 1.8vw, 22px);
            font-size: clamp(14px, 1.1vw, 17px);
            line-height: 1.55;
            letter-spacing: -.008em;
            color: var(--fg-soft);
            max-width: min(44ch, 100%);
            text-wrap: pretty;
          }
          .cnr-cta {
            margin-top: clamp(20px, 2.4vw, 32px);
            pointer-events: auto;
            width: 100%;
            display: flex;
            justify-content: center;
          }
          .cnr-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 44px;
            padding: 0 24px;
            border-radius: 999px;
            background: var(--pill-bg);
            color: #ffffff !important;
            font-size: 14px;
            font-weight: 500;
            letter-spacing: -.008em;
            text-decoration: none;
            white-space: nowrap;
            opacity: 1;
            border: 1px solid rgba(10,9,8,.12);
            box-shadow: 0 1px 0 rgba(255,255,255,.10) inset;
            -webkit-text-fill-color: #ffffff !important;
            transition: transform .4s var(--ease), background .3s var(--ease), color .3s var(--ease);
            max-width: min(100%, 300px);
            cursor: pointer;
          }
          .cnr-pill:hover,
          .cnr-pill:focus-visible {
            transform: translateY(-2px);
            background: #000;
            color: #ffffff !important;
            -webkit-text-fill-color: #ffffff !important;
          }
          .cnr-pill:focus-visible {
            outline: 2px solid var(--fg);
            outline-offset: 2px;
          }

          /* RESPONSIVE BREAKPOINTS */
          @media (max-width: 900px) {
            .cnr-veil {
              background:
                linear-gradient(to bottom, rgba(242,240,236,.72) 0%, rgba(242,240,236,.18) 24%, rgba(242,240,236,.18) 76%, rgba(242,240,236,.74) 100%),
                radial-gradient(100% 80% at 50% 48%, rgba(242,240,236,0) 0%, rgba(242,240,236,.40) 100%),
                rgba(242,240,236,.24);
            }
          }
          @media (max-width: 720px) {
            .cnr-h1 {
              max-width: 14ch;
              font-size: clamp(26px, 6.8vw, 38px);
            }
            .cnr-sub {
              font-size: 14px;
              max-width: 32ch;
            }
            .cnr-panel {
              padding: max(92px, calc(env(safe-area-inset-top, 0px) + 76px)) 18px max(88px, calc(env(safe-area-inset-bottom, 0px) + 72px));
            }
          }
          @media (max-width: 420px) {
            .cnr-h1 {
              max-width: 12ch;
              font-size: clamp(22px, 7.5vw, 32px);
            }
            .cnr-eyebrow {
              font-size: 11px;
              letter-spacing: .05em;
              max-width: 28ch;
            }
            .cnr-cta .cnr-pill {
              width: 100%;
              max-width: 260px;
              height: 42px;
              padding: 0 18px;
              font-size: 13.5px;
            }
          }
          @media (max-height: 520px) and (orientation: landscape) {
            .cnr-panel {
              padding: max(72px, calc(env(safe-area-inset-top, 0px) + 56px)) 24px max(64px, calc(env(safe-area-inset-bottom, 0px) + 48px));
            }
            .cnr-h1 {
              font-size: clamp(28px, 8vh, 44px);
            }
            .cnr-sub {
              margin-top: 12px;
              font-size: 14px;
            }
            .cnr-cta {
              margin-top: 16px;
            }
          }
        `}</style>

        {/* 1. Preloader */}
        <div ref={bootRef} className="cnr-boot" id="boot">
          <div className="cnr-bar">
            <i ref={bootBarRef} id="bootBar"></i>
          </div>
          <p ref={bootPctRef} id="bootPct">
            LOADING 0%
          </p>
        </div>

        {/* 2. Fixed Background Video Stage — chocolate-bar crushing scrub */}
        <div className="cnr-stage">
          <video
            ref={clipRef}
            id="clip"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
          ></video>
          <div className="cnr-veil"></div>
          <div className="cnr-grain"></div>
        </div>

        {/* 3. Scroll Progress Hairline */}
        <i ref={meterRef} className="cnr-meter" id="meter"></i>

        {/* 4. Three Cross-Fading Text Panels */}
        <div className="cnr-panels">
          {/* Panel 1 */}
          <section
            ref={(el) => {
              panelsRef.current[0] = el;
            }}
            className="cnr-panel"
            data-panel
          >
            <div className="cnr-eyebrow">
              Artisan Chocolate Atelier <span>&middot;</span> Kurod Works
            </div>
            <h1 className="cnr-h1">
              Crafted from bean.
              <br />
              Tempered to shine.
            </h1>
            <p className="cnr-sub">
              Single-origin cocoa beans slow-roasted and stone-conched with pure cocoa butter. No shortcuts, no compromises.
            </p>
            <div className="cnr-cta">
              <a
                className="cnr-pill"
                href="#menu"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore our Range
              </a>
            </div>
          </section>

          {/* Panel 2 */}
          <section
            ref={(el) => {
              panelsRef.current[1] = el;
            }}
            className="cnr-panel"
            data-panel
          >
            <div className="cnr-eyebrow">The Art of Conching</div>
            <h1 className="cnr-h1">Pure velvet melt.</h1>
            <p className="cnr-sub">
              Micro-refined below twenty microns for an immaculate melt curve. Every drop releases rich roasted cocoa and golden caramel notes.
            </p>
            <div className="cnr-cta">
              <a
                className="cnr-pill"
                href="#branches"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('branches')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Discover the Craft
              </a>
            </div>
          </section>

          {/* Panel 3 */}
          <section
            ref={(el) => {
              panelsRef.current[2] = el;
            }}
            className="cnr-panel"
            data-panel
          >
            <div className="cnr-eyebrow">Master Patisserie Standard</div>
            <h1 className="cnr-h1">
              Smooth enough for
              <br />
              the mirror glaze.
            </h1>
            <p className="cnr-sub">
              From non-temper easy-melt compounds to 70% dark single-origin couvertures, engineered for master bakers and luxury chocolatiers.
            </p>
            <div className="cnr-cta">
              <a
                className="cnr-pill"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start a Trade Brief
              </a>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};
