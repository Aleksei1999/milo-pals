# Fomenko starter

Стартовый шаблон сайтов студии Fomenko: Next.js 16 (static export), Tailwind v4, framer-motion,
lenis. Готовые блоки (hero трёх видов, проекты, этапы, цены, отзывы, FAQ, форма и квиз), пролёт по
скроллу из кадров ролика, тема в одном файле, выкладка на GitHub Pages. Правила для AI-агента —
в `CLAUDE.md`.

## Новый сайт за 5 шагов

1. Скопировать шаблон: `rsync -a --exclude node_modules --exclude '.next*' --exclude out --exclude .git --exclude '._*' fomenko-starter/ <client>/`, затем `npm install`.
2. Заполнить `src/site.config.ts`: имя, домен, контакты, меню, email для заявок.
3. Задать тему в `src/styles/tokens.css` и шрифты в `src/app/layout.tsx`.
4. Собрать `src/app/page.tsx` из блоков `src/components/blocks`, удалить `public/demo` и демо-роуты.
5. Проверить (`npx tsc --noEmit`, `npm run lint`, `npm run build`, скриншоты 390/1440) и выложить
   на GitHub Pages — workflow уже в `.github/workflows/pages.yml`.

## Команды

```bash
npm run dev      # разработка
npm run build    # статичная сборка в out/
npm start        # раздать out/ локально
npm run format   # prettier
```

Демо: `/` — главная, `/sequence/` — пролёт по скроллу, `/media/` — hero на фото и квиз.
