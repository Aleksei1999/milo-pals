// рваный край бумаги: неровная кромка с волокнами, как будто лист надорвали руками
const W = 1440;
const VH = 100;

// детерминированный шум, чтобы край был одинаковым при каждой сборке
function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

function edge(seed: number, base: number, amp: number, step: number, grain: number) {
  const r = rand(seed);
  const pts: [number, number][] = [];
  const phase = r() * 10;
  for (let x = 0; x <= W; x += step + r() * step) {
    const wave = Math.sin(x / 210 + phase) * amp + Math.sin(x / 67 + phase * 2) * amp * 0.45;
    pts.push([Math.min(x, W), base + wave + (r() - 0.5) * grain]);
  }
  pts.push([W, base]);
  return pts;
}

const MAIN = edge(7, 62, 14, 5, 9);
// светлый слой бумаги с волокнами чуть выше основной кромки
const fr = rand(31);
let drift = 8;
const FIBRE = MAIN.map(([x, y]) => {
  // ширина белого надрыва гуляет от 4 до 20px, с мелкими волокнами
  drift = Math.min(20, Math.max(4, drift + (fr() - 0.5) * 5));
  return [x, y - drift - fr() * 3] as [number, number];
});

const poly = (pts: [number, number][]) =>
  pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L');
const below = (pts: [number, number][]) => `M0 ${VH} L${poly(pts)} L${W} ${VH} Z`;
const above = (pts: [number, number][]) => `M0 0 L${W} 0 L${poly([...pts].reverse())} Z`;

export const TEAR_H = 'clamp(44px,7vw,100px)';

const svgUrl = (d: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${W} ${VH}' preserveAspectRatio='none'><path d='${d}'/></svg>`,
  )}")`;

// верх блока со сплошным фоном: рваная кромка его цвета с белым надрывом наезжает на блок выше
export function TearTop({ color, fibre = '#fffaf0' }: { color: string; fibre?: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 z-20"
      style={{ top: `calc(${TEAR_H} * -1 + 2px)`, height: TEAR_H }}
    >
      <svg
        viewBox={`0 0 ${W} ${VH}`}
        preserveAspectRatio="none"
        className="h-full w-full drop-shadow-[0_-8px_14px_rgb(0_0_0/0.4)]"
      >
        <path d={below(FIBRE)} fill={fibre} />
        <path d={below(MAIN)} fill={color} />
      </svg>
    </div>
  );
}

// низ блока-картинки: сам блок обрезан по кромке, у самого края белый надрыв бумаги
const MASK = svgUrl(above(MAIN));
export const tearBottomStyle = {
  WebkitMaskImage: `linear-gradient(#000 0 0), ${MASK}`,
  maskImage: `linear-gradient(#000 0 0), ${MASK}`,
  WebkitMaskSize: `100% calc(100% - ${TEAR_H} + 1px), 100% ${TEAR_H}`,
  maskSize: `100% calc(100% - ${TEAR_H} + 1px), 100% ${TEAR_H}`,
  WebkitMaskPosition: 'top, bottom',
  maskPosition: 'top, bottom',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
} as const;

// белая полоса оторванной бумаги по нижней кромке картинки
export function TearFibre() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
      style={{ height: TEAR_H }}
    >
      <svg viewBox={`0 0 ${W} ${VH}`} preserveAspectRatio="none" className="h-full w-full">
        <path d={`M${poly(FIBRE)} L${poly([...MAIN].reverse())} Z`} fill="#fffaf0" />
      </svg>
    </div>
  );
}
