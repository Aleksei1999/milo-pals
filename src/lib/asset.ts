const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

// next/image и <img> в static export не знают про basePath — пути из public ведём через этот хелпер
export function asset(path: string) {
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
