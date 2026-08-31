import React from 'react';
import { motion, type Variants } from 'framer-motion';

type Art = 'auf' | 'maske' | 'blende';

interface Props {
  children: React.ReactNode;
  className?: string;
  art?: Art;
  delay?: number;
  as?: 'div' | 'span' | 'li' | 'section' | 'h2' | 'p';
}

const varianten: Record<Art, Variants> = {
  auf: {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  },
  maske: {
    hidden: { clipPath: 'inset(0 0 100% 0)', y: 12 },
    show: {
      clipPath: 'inset(0 0 -10% 0)',
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  },
  blende: {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1 } },
  },
};

/** Blendet Inhalt beim Scrollen ein. `maske` = redaktioneller Clip-Reveal. */
export const Reveal: React.FC<Props> = ({ children, className, art = 'auf', delay = 0, as = 'div' }) => {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={varianten[art]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
};

export default Reveal;
