'use client';

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import { drawCover, fitCanvas, loadFrames } from './frames';
import { TEAR_H } from './Tear';

const COUNT = 97;
const LENGTH = 4; // экранов прокрутки; последний держит кадр, пока сверху наезжает следующий блок

const LINES = [
  { text: 'Gravity: off.', at: [0.04, 0.12, 0.3, 0.36] },
  { text: 'Snacks: everywhere.', at: [0.36, 0.42, 0.56, 0.62] },
  { text: 'Hold on to something!', at: [0.6, 0.66, 0.8, 0.86] },
];

function Line({ p, text, at }: { p: MotionValue<number>; text: string; at: number[] }) {
  const opacity = useTransform(p, at, [0, 1, 1, 0]);
  const y = useTransform(p, at, [40, 0, 0, -40]);
  const rotate = useTransform(p, [at[0], at[3]], [-6, 4]);
  return (
    <motion.p
      style={{ opacity, y, rotate }}
      className="logo absolute inset-x-0 top-[42%] text-center text-[clamp(44px,8vw,120px)]"
    >
      {text}
    </motion.p>
  );
}

export function ZeroG() {
  const section = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const imgs = useRef<HTMLImageElement[]>([]);
  const loaded = useRef<boolean[]>([]);
  const current = useRef(0);

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] });
  const frame = useTransform(scrollYProgress, [0, 1 - 1 / LENGTH], [0, COUNT - 1], { clamp: true });

  const draw = (i: number) => {
    const c = canvas.current;
    if (!c) return;
    for (let d = 0; d < COUNT; d++) {
      const j = loaded.current[i - d] ? i - d : loaded.current[i + d] ? i + d : -1;
      if (j >= 0) return drawCover(c, imgs.current[j]);
    }
  };

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    imgs.current = loadFrames('/zerog', COUNT, (i) => {
      loaded.current[i] = true;
      if (Math.abs(i - current.current) < 4) draw(current.current);
    });
    const resize = () => {
      fitCanvas(c);
      draw(current.current);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useMotionValueEvent(frame, 'change', (v) => {
    const i = Math.round(v);
    if (i === current.current) return;
    current.current = i;
    requestAnimationFrame(() => draw(i));
  });

  return (
    <section
      ref={section}
      aria-label="The crew floating inside The Explorer"
      className="relative"
      style={{ height: `${LENGTH * 100}svh`, marginTop: `calc(${TEAR_H} * -1)` }}
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-space">
        <canvas ref={canvas} aria-hidden className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-space/25" />
        {LINES.map((l) => (
          <Line key={l.text} p={scrollYProgress} {...l} />
        ))}
      </div>
    </section>
  );
}
