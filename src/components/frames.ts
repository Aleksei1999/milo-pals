import { asset } from '@/lib/asset';

export const frameSrc = (dir: string, i: number) =>
  asset(`${dir}/${String(i).padStart(3, '0')}.webp`);

// кадр вписан как object-fit: cover; focusX — какая доля ширины кадра встаёт в центр, если кадр шире экрана
export function drawCover(c: HTMLCanvasElement, img: HTMLImageElement, focusX = 0.5) {
  const ctx = c.getContext('2d');
  if (!ctx) return;
  const s = Math.max(c.width / img.naturalWidth, c.height / img.naturalHeight);
  const w = img.naturalWidth * s;
  const h = img.naturalHeight * s;
  const x = Math.min(0, Math.max(c.width - w, c.width / 2 - focusX * w));
  ctx.drawImage(img, x, (c.height - h) / 2, w, h);
}

export function fitCanvas(c: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  c.width = Math.round(c.clientWidth * dpr);
  c.height = Math.round(c.clientHeight * dpr);
}

export function loadFrames(dir: string, count: number, onLoad: (i: number) => void) {
  const imgs: HTMLImageElement[] = [];
  for (let i = 0; i < count; i++) {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => onLoad(i);
    img.src = frameSrc(dir, i);
    imgs[i] = img;
  }
  return imgs;
}
