// рваный край бумаги между блоками; одна ломаная для заливки, маски и светлых волокон
const JAG: [number, number][] = [
  [0, 22],
  [38, 30],
  [70, 14],
  [104, 26],
  [140, 8],
  [176, 24],
  [214, 12],
  [250, 28],
  [286, 6],
  [322, 22],
  [360, 16],
  [398, 30],
  [432, 10],
  [470, 24],
  [508, 4],
  [544, 20],
  [582, 14],
  [618, 30],
  [656, 10],
  [694, 26],
  [730, 8],
  [768, 22],
  [806, 16],
  [842, 30],
  [880, 6],
  [918, 24],
  [954, 12],
  [992, 28],
  [1030, 10],
  [1066, 22],
  [1104, 4],
  [1140, 20],
  [1178, 14],
  [1214, 28],
  [1252, 8],
  [1290, 24],
  [1326, 16],
  [1364, 30],
  [1400, 12],
  [1440, 24],
];
const line = (dy = 0) => JAG.map(([x, y]) => `${x} ${y + dy}`).join(' L');

// нижняя часть под линией: верх следующего блока
const BELOW = `M${line()} L1440 40 L0 40 Z`;
// верхняя часть над линией: маска для низа предыдущего блока
const ABOVE = `M0 0 L1440 0 L${[...JAG]
  .reverse()
  .map(([x, y]) => `${x} ${y}`)
  .join(' L')} Z`;

export const TEAR_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 40' preserveAspectRatio='none'><path d='${ABOVE}'/></svg>`,
)}")`;

const H = 'clamp(20px,2.8vw,40px)';

// верх блока со сплошным фоном: рваная кромка его цвета наезжает на блок выше
export function TearTop({ color, fibre = '#fffdf6' }: { color: string; fibre?: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 z-20"
      style={{ top: `calc(${H} * -1 + 2px)`, height: H }}
    >
      <svg
        viewBox="0 0 1440 40"
        preserveAspectRatio="none"
        className="h-full w-full drop-shadow-[0_-5px_8px_rgb(0_0_0/0.35)]"
      >
        <path d={`M${line(-3)} L1440 40 L0 40 Z`} fill={fibre} />
        <path d={BELOW} fill={color} />
      </svg>
    </div>
  );
}

// низ блока-картинки: сам блок обрезан маской, по кромке белые волокна бумаги
export const tearBottomStyle = {
  WebkitMaskImage: `linear-gradient(#000 0 0), ${TEAR_MASK}`,
  maskImage: `linear-gradient(#000 0 0), ${TEAR_MASK}`,
  WebkitMaskSize: `100% calc(100% - ${H} + 1px), 100% ${H}`,
  maskSize: `100% calc(100% - ${H} + 1px), 100% ${H}`,
  WebkitMaskPosition: 'top, bottom',
  maskPosition: 'top, bottom',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
} as const;

export function TearFibre() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
      style={{ height: H }}
    >
      <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="h-full w-full">
        <path
          d={`M${line(-1.5)}`}
          fill="none"
          stroke="#fffdf6"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export const TEAR_H = H;
