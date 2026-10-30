import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Vertical travel distance in px for the entrance (default 28). */
  y?: number;
  /** Seconds to delay the entrance (useful for sequencing sibling blocks). */
  delay?: number;
  /** When true, direct children animate in with a gentle cascade. */
  stagger?: boolean;
  /** Per-child stagger interval in seconds (default 0.09). */
  staggerDelay?: number;
}

// Shared luxury ease: smooth exponential deceleration (matches the Hero).
const luxuryEase = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll-triggered entrance wrapper. Fades and lifts content into view a single
 * time as the user scrolls, bringing the cinematic feel of the Hero to every
 * section. Honors prefers-reduced-motion and never clips its content.
 *
 * NOTE: On completion framer-motion leaves an identity transform on the element,
 * which would reparent any `position: fixed` descendant. Only wrap presentational
 * blocks (headers, grids) — never a container that renders a fixed modal.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  y = 28,
  delay = 0,
  stagger = false,
  staggerDelay = 0.09,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  if (stagger) {
    const container: Variants = {
      hidden: {},
      visible: {
        transition: { staggerChildren: staggerDelay, delayChildren: delay },
      },
    };
    const child: Variants = {
      hidden: { opacity: 0, y },
      visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: luxuryEase } },
    };

    return (
      <motion.div
        className={className}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {React.Children.map(children, (c, i) => (
          <motion.div key={i} variants={child}>
            {c}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.95, ease: luxuryEase, delay }}
    >
      {children}
    </motion.div>
  );
};
