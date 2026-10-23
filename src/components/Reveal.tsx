'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

// появление с пружинкой, как будто наклейку прилепили
export function Reveal({
  children,
  className,
  delay = 0,
  tilt = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  tilt?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 50, rotate: tilt * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: tilt }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ type: 'spring', stiffness: 110, damping: 14, delay }}
    >
      {children}
    </motion.div>
  );
}
