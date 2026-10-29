import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const BrandLogoMark: React.FC<{ className?: string }> = ({
  className = 'w-14 h-10',
}) => {
  return (
    <img
      src="/assets/chirag-logo.png"
      alt="Chirag Enterprises Logo"
      className={`${className} object-contain shrink-0`}
      loading="eager"
    />
  );
};

export type HeadlineStyle =
  | 'fade-up'
  | 'word-stagger'
  | 'scale-up'
  | 'mask-reveal'
  | 'line-slide';

interface AnimatedHeadlineProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3';
  variant?: HeadlineStyle;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
}

const FAST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const AnimatedHeadline: React.FC<AnimatedHeadlineProps> = ({
  text,
  as: Tag = 'h2',
  variant = 'fade-up',
  className = '',
  highlightWords = [],
  highlightClassName = 'text-orange-600',
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  if (variant === 'word-stagger') {
    const words = text.split(' ');
    return (
      <Tag className={className} aria-label={text}>
        {words.map((word, idx) => {
          const cleanWord = word.replace(/[.,?!]/g, '');
          const isHighlighted = highlightWords.some(
            (hw) => hw.toLowerCase() === cleanWord.toLowerCase()
          );
          return (
            <span
              key={idx}
              className="inline-block overflow-hidden align-bottom mr-[0.26em] last:mr-0"
            >
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.24,
                  delay: idx * 0.025,
                  ease: FAST_EASE,
                }}
                className={`inline-block will-change-transform ${
                  isHighlighted ? highlightClassName : ''
                }`}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </Tag>
    );
  }

  if (variant === 'line-slide') {
    const sentences = text
      .split(/(?<=\.)\s+/)
      .filter((s) => s.trim().length > 0);

    return (
      <Tag className={className} aria-label={text}>
        {sentences.map((line, idx) => (
          <span key={idx} className="block overflow-hidden">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.28,
                delay: idx * 0.05,
                ease: FAST_EASE,
              }}
              className={`block will-change-transform ${
                idx > 0 ? 'mt-1 text-orange-600' : ''
              }`}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  if (variant === 'mask-reveal') {
    return (
      <Tag className={`overflow-hidden ${className}`}>
        <motion.span
          initial={{ y: '60%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.26, ease: FAST_EASE }}
          className="inline-block will-change-transform"
        >
          {text}
        </motion.span>
      </Tag>
    );
  }

  if (variant === 'scale-up') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 8 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.24, ease: FAST_EASE }}
        className="will-change-transform"
      >
        <Tag className={className}>{text}</Tag>
      </motion.div>
    );
  }

  // Default: fast fade-up
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.24, ease: FAST_EASE }}
      className="will-change-transform"
    >
      <Tag className={className}>{text}</Tag>
    </motion.div>
  );
};

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  yOffset = 10,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: 0.24,
        delay: Math.min(delay * 0.4, 0.12),
        ease: FAST_EASE,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};
