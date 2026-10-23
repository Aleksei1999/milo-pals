import type { ReactNode } from 'react';

// короткие слова (предлоги, союзы, частицы) приклеиваем неразрывным пробелом к следующему слову
const SHORT = /(^|[\s(«"])([а-яёa-z]{1,2}|без|для|над|под|при|про|что|это|или)\s+/giu;

export function nb<T extends ReactNode>(text: T): T {
  if (typeof text !== 'string') return text;
  return text.replace(SHORT, '$1$2 ').replace(SHORT, '$1$2 ') as T;
}
