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
    // с мышью Майло ждёт её движения и смотрит в камеру; сам оглядывается только на тач-экранах
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

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
      if (!touched && !hasMouse) target = lookAt(0.5 + 0.5 * Math.sin((t - start) / 1800));
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
      {/* затемнение под текстом справа, чтобы читался поверх светлого гриба */}
      <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(48%_60%_at_82%_78%,rgb(12_15_46/0.75),transparent)] md:block" />

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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 max-w-[520px] md:mt-auto md:self-end md:pb-[9svh] md:pr-[5vw] md:text-left"
        >
          <p className="title text-[clamp(14px,1.4vw,18px)] uppercase tracking-[0.14em] text-sky">
            A new animated series · Coming soon
          </p>
          <h2 className="title mt-3 hidden text-[clamp(34px,3.4vw,52px)] text-white md:block">
            Somewhere out there, a door is open.
          </h2>
          <p className="mt-4 text-[clamp(15px,1.25vw,18px)] leading-relaxed text-white/90 [text-shadow:0_2px_12px_rgb(12_15_46/0.9)]">
            Milo is ten and can’t sit still. One night he finds a little ship that flies between
            worlds, and three friends just as curious as he is: Zoe, Bibo and Nova. Every episode a
            new planet, and every planet a new problem only friends can solve.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a href="#crew" className="btn btn-slime pointer-events-auto">
              Meet the crew ↓
            </a>
            <a
              href="#worlds"
              className="title pointer-events-auto inline-flex min-h-12 items-center px-3 text-[19px] text-white underline decoration-sun decoration-[3px] underline-offset-[6px]"
            >
              See the worlds
            </a>
          </div>
        </motion.div>
      </div>

      <motion.p
        animate={{ opacity: hint ? 1 : 0 }}
        className="hand pointer-events-none absolute left-[46%] top-[50%] hidden max-w-[170px] rotate-[4deg] text-[22px] leading-tight text-white/85 md:block"
      >
        Move your mouse. Milo is watching ✦
      </motion.p>
      <TearFibre />
    </section>
  );
}
