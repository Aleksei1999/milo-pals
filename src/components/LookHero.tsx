'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { drawCover, fitCanvas, frameSrc, loadFrames } from './frames';
import { TearFibre, tearBottomStyle } from './Tear';

const COUNT = 43;
// кадр 0 — Майло смотрит вправо, последний — влево
const lookAt = (x: number) => (1 - x) * (COUNT - 1);
// Майло стоит левее центра кадра: на узком экране держим его посередине
const FOCUS_X = 0.36;

export function LookHero() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const loaded: boolean[] = [];
    let target = (COUNT - 1) / 2;
    let current = target;
    let drawn = -1;
    let touched = false;
    let raf = 0;

    const draw = (i: number) => {
      // кадр ещё не пришёл — берём ближайший готовый
      for (let d = 0; d < COUNT; d++) {
        const j = loaded[i - d] ? i - d : loaded[i + d] ? i + d : -1;
        if (j >= 0) {
          drawCover(c, imgs[j], FOCUS_X);
          drawn = i;
          return;
        }
      }
    };
    const imgs = loadFrames('/look', COUNT, (i) => {
      loaded[i] = true;
      if (Math.abs(i - Math.round(current)) < 3) draw(Math.round(current));
    });

    const onMove = (x: number) => {
      touched = true;
      target = lookAt(Math.min(1, Math.max(0, x / window.innerWidth)));
    };
    const mouse = (e: PointerEvent) => onMove(e.clientX);
    const touch = (e: TouchEvent) => onMove(e.touches[0].clientX);
    window.addEventListener('pointermove', mouse, { passive: true });
    window.addEventListener('touchmove', touch, { passive: true });

    const start = performance.now();
    const loop = (t: number) => {
      // без мыши (телефон) Майло сам медленно оглядывается
      if (!touched) target = lookAt(0.5 + 0.5 * Math.sin((t - start) / 1800));
      current += (target - current) * 0.12;
      const i = Math.round(current);
      if (i !== drawn) draw(i);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const resize = () => {
      fitCanvas(c);
      drawn = -1;
    };
    resize();
    window.addEventListener('resize', resize);
    const hide = setTimeout(() => setHint(false), 6000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hide);
      window.removeEventListener('pointermove', mouse);
      window.removeEventListener('touchmove', touch);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      className="relative z-10 h-svh min-h-[560px] overflow-hidden bg-space"
      style={tearBottomStyle}
    >
      {/* первый кадр картинкой, пока canvas не нарисовал */}
      <img
        src={frameSrc('/look', 21)}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-[36%_50%]"
        fetchPriority="high"
      />
      <canvas ref={canvas} aria-hidden className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-space/70 via-transparent to-space/60" />

      <div className="relative flex h-full flex-col items-center px-4 pt-[9svh] text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          className="logo text-[clamp(64px,11vw,168px)]"
        >
          Milo <span className="text-[0.7em]">&amp;</span> Pals
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="hand mt-3 text-[clamp(22px,2.6vw,36px)] text-sun"
        >
          Different Worlds. Same Friends.
        </motion.p>

        {/* на десктопе справа, чтобы не закрывать Майло */}
        <div className="mt-6 md:mt-auto md:self-end md:pb-[7svh] md:pr-[6vw] md:text-right">
          <p className="title text-[clamp(15px,2vw,26px)] uppercase tracking-[0.12em] text-white/90">
            A new animated series · Coming soon
          </p>
          <a href="#crew" className="btn btn-slime pointer-events-auto mt-5">
            Meet the crew ↓
          </a>
        </div>
      </div>

      <motion.p
        animate={{ opacity: hint ? 1 : 0 }}
        className="hand pointer-events-none absolute right-6 top-[42%] hidden max-w-[180px] rotate-[4deg] text-[22px] leading-tight text-white/85 md:block"
      >
        Move your mouse. Milo is watching ✦
      </motion.p>
      <TearFibre />
    </section>
  );
}
