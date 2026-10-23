# Fomenko starter — гайд для агента

Стартовый шаблон сайтов студии Fomenko. Из него собираются клиентские сайты: лендинги, сайты
студий, ЖК, магазины-витрины. Задача агента — быстро собрать сайт из готовых блоков так, чтобы он
**не выглядел сгенерированным** (no AI look).

Стек: Next.js 16 App Router (static export) · React 19 · TypeScript · Tailwind v4 · framer-motion ·
lenis. Next 16 отличается от того, что ты помнишь: перед правкой API читай
`node_modules/next/dist/docs/`.

## Карта проекта (project map)

| Где                               | Что                                                                                                                                                                                                     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/site.config.ts`              | имя, контакты, меню, соцсети, CTA, адрес формы (FormSubmit), домен для SEO                                                                                                                              |
| `src/styles/tokens.css`           | **вся тема**: цвета light/dark, шкала шрифтов `clamp()`, отступы, радиусы, easing                                                                                                                       |
| `src/app/layout.tsx`              | шрифты (`next/font/google`), metadata, OG                                                                                                                                                               |
| `src/lib/motion.ts`               | те же кривые и длительности для framer-motion (он не читает CSS-переменные)                                                                                                                             |
| `src/components/ui`               | атомы: Button, Container, Section, Eyebrow, Heading, Image, Accordion, Badge, Field (Input/Textarea/Checkbox), Marquee                                                                                  |
| `src/components/motion`           | Reveal, Parallax, SmoothScroll, ScrollSequence, StackOverlap + Pinned, StickyHeader                                                                                                                     |
| `src/components/blocks`           | Header, Hero (`big-type` / `media` / `sequence`), LogoStrip, Showcase, MediaText, FeatureGrid, Process, Pricing, Testimonials, FAQ, CTABand, Contact, ContactForm, Quiz, Footer, LegalPage, SectionHead |
| `src/app/page.tsx`                | демо-главная; `/sequence/` — пролёт по скроллу; `/media/` — фото-hero и квиз; `/privacy/`                                                                                                               |
| `src/app/sitemap.ts`, `robots.ts` | SEO; список страниц в `routes` дополнять руками                                                                                                                                                         |
| `public/demo/`                    | демо-картинки и кадры — **удалить в клиентском проекте**                                                                                                                                                |
| `.github/workflows/pages.yml`     | выкладка на GitHub Pages, basePath = `/<имя-репо>` сам                                                                                                                                                  |

## Новый клиентский сайт (start a client project)

1. Скопировать шаблон без истории и сборок:
   ```bash
   rsync -a --exclude node_modules --exclude '.next*' --exclude out --exclude .git \
     --exclude '._*' /Volumes/KINGSTON/Проекты/fomenko-starter/ /Volumes/KINGSTON/Проекты/<client>/
   cd /Volumes/KINGSTON/Проекты/<client> && git init && npm install
   ```
   В `package.json` поменять `name`.
2. `src/site.config.ts` — имя, домен, контакты, меню, соцсети, email для формы.
3. `src/styles/tokens.css` — палитра бренда (light и dark), при необходимости шкала и радиусы.
   Шрифты — в `src/app/layout.tsx` (имена переменных `--ff-display` и `--ff-body` не менять).
   `themeColor` в layout = `--bg` светлой темы.
4. `src/app/page.tsx` — собрать страницу из блоков, контент клиента вместо демо. Удалить
   `public/demo`, демо-роуты `src/app/sequence` и `src/app/media`, если не нужны; заменить
   `public/og.jpg` (1200×630) и `src/app/icon.svg`.
5. Проверки и выкладка — разделы ниже.

Если блока не хватает — сделать новый в `src/components/blocks` по образцу существующих: пропсы с
типами, `Section` + `Container`, цвета только токенами (`bg-bg`, `text-fg`, `text-muted`,
`border-line`, `bg-accent`), никаких hex в компонентах.

## Темы и шапка (themes)

- Каждая секция объявляет `data-theme="light" | "dark"` (через `<Section theme>`). Токены внутри
  переключаются сами: тёмная секция = светлый текст.
- `StickyHeader` смотрит, какая секция под шапкой, и берёт её тему. Над первым экраном шапка
  прозрачная (`transparentAtTop`), на страницах без hero — `<Header transparentAtTop={false} />`.
- Две `Section` одной темы подряд сами убирают двойной отступ между собой.
- Чередовать светлые и тёмные блоки ради ритма, но не через каждый.

## Анти-AI правила дизайна (avoid the AI look)

Нельзя по умолчанию:

- градиенты indigo→violet / purple-blue, «атмосферные» размытые пятна на фоне;
- градиентный текст (`bg-clip-text`), подсветка ключевых слов цветом, курсив-серифы для акцента;
- glassmorphism (`backdrop-blur` + полупрозрачные плашки) — только если это идея бренда;
- эмодзи в интерфейсе и тексте; иконки в пастельных квадратиках над каждым пунктом;
- Inter / Space Grotesk / системный «стартап»-шрифт как единственный — подбирать пару под бренд;
- выдуманные цифры («500+ клиентов», «98% довольны») — только реальные факты клиента;
- `01 / 02 / 03` и подписи-kicker над каждым заголовком; Eyebrow ставить, только если он сообщает
  что-то новое;
- скругления 16–32px на всём подряд (`rounded-2xl` везде), тени `shadow-2xl`, карточки в карточках;
- бейджи и пилюли на каждом элементе, светящиеся точки статуса, AI-нарисованные SVG-иконки;
- копирайт в духе «не просто X — это Y», «откройте для себя», «бесшовный», «инновационный».

Нужно:

- Типографика делает дизайн: крупный display, контраст размеров, узкие колонки текста (45–65ch).
- Асимметричная сетка на 12 колонок, разные пропорции фото (см. `Showcase`), воздух.
- Один акцентный цвет, остальное — нейтральные; линии `border-line` вместо карточек с тенью.
- Настоящие фото клиента, единая обработка; заглушки — лучше нейтральная плашка, чем сток.
- Тексты конкретные: сроки, материалы, адреса, цены «от». Короткие слова клеить к следующему:
  `nb()` из `src/lib/typo.ts` (Heading, Hero, CTABand, SectionHead делают это сами).
- Перед сдачей прогнать скилл `kill-ai-slop` по проекту.

## Мобильная вёрстка (mobile)

- Базовая ширина проверки — **390px**, поля страницы `--gutter` = 16px на телефоне.
- **Никакого горизонтального скролла**: `document.documentElement.scrollWidth === innerWidth`.
  Длинные слова в заголовках (например «конфиденциальности») — уменьшить размер на мобиле.
- Кнопки и пункты меню не ниже 44px по высоте; телефон и почта — кликабельные `tel:` / `mailto:`.
- Высоты экранов — `svh`, не `vh` (адресная строка iOS).
- Для пролёта по скроллу на телефоне видна только центральная треть 16:9 кадра — выноскам задавать
  `atMobile`, при необходимости `hideAtMobile`.

## Производительность (performance)

- Цель Lighthouse 90+ во всех категориях (mobile).
- Картинки — webp/avif, не шире 1920px (карточки 1200–1600), качество 72–80. Компонент `Image`
  ставит `loading="lazy"`; для первого экрана — `priority`.
- Кадры пролёта: webp, ширина 1600–1920, ≤ 150 КБ на кадр, 60–180 кадров. `ScrollSequence`
  грузит первый кадр сразу (`preload`), остальные — когда блок рядом, по 6 параллельно, проходами
  каждый 8-й → 4-й → 2-й → все; пока кадр не пришёл, рисуется ближайший загруженный.
- Не больше двух шрифтов и 3–4 начертаний; `display: 'swap'`.
- Видео в hero — `muted playsInline`, с `poster`, ≤ 4 МБ, h264/webm.

## Видео → пролёт по скроллу (video to scroll sequence)

Сгенерированный ролик (обычно 60 fps) режем на кадры: берём каждый второй, ширина 1920, webp:

```bash
mkdir -p public/sequence
ffmpeg -i clip.mp4 -vf "select='not(mod(n\,2))',scale=1920:-2" -vsync vfr \
  -c:v libwebp -quality 76 -start_number 0 public/sequence/%03d.webp
ls public/sequence | wc -l   # это count
```

Через cwebp (иногда чуть меньше файлы):

```bash
ffmpeg -i clip.mp4 -vf "select='not(mod(n\,2))',scale=1920:-2" -vsync vfr -start_number 0 /tmp/f/%03d.png
for f in /tmp/f/*.png; do cwebp -q 76 "$f" -o "public/sequence/$(basename "${f%.png}").webp"; done
```

Подключение:

```tsx
<Hero
  variant="sequence"
  frames={{ dir: '/sequence', count: 120 }}
  length={8}
  // до 55% летим, дальше кадр стоит, пока появляются выноски
  keyframes={[[0, 0.55], [0, 119]]}
  callouts={[{ title: 'Кухня', at: [0.62, 0.65], atMobile: [0.55, 0.6], range: [0.6, 0.68] }]}
  title="…"
/>
<StackOverlap>…следующий блок наезжает на последний кадр…</StackOverlap>
```

Несколько роликов встык — пронумеровать кадры сквозь в одной папке. Координаты выносок — доли
исходного кадра; компонент сам пересчитывает их через cover-вписывание. Для обычного блока под
наезд — обернуть его в `<Pinned>`.

## Формы (forms)

`ContactForm` и `Quiz` отправляют JSON на `site.forms.endpoint` (FormSubmit AJAX:
`https://formsubmit.co/ajax/<email>`). Первая заявка придёт письмом-подтверждением — его надо
подтвердить у клиента, потом заменить email в адресе на выданный хеш. Если отправка упала,
форма предлагает ссылку `mailto:` с уже заполненным текстом. Есть honeypot `_honey` и чекбокс
согласия со ссылкой на `/privacy/` — текст политики проверять под клиента.

## Код (code style)

- Prettier: single quotes, ширина 100, trailing commas (`npm run format`).
- Комментарии — только ловушки, 1–2 строки, по-русски. Мёртвый код и неиспользуемые пропсы удалять.
- Пути из `public` в `<img>`/`<video>`/canvas — только через `asset()` или `Image`: на GitHub Pages
  сайт живёт под `/<repo>`, и без basePath картинки отвалятся. `next/link` basePath ставит сам.
- Диск KINGSTON — exFAT: macOS создаёт `._*` файлы, а дисковый кеш Turbopack на нём ломается,
  поэтому в `next.config.ts` он выключен для dev и build. Если сборка упала с «Failed to open
  database» — переименовать `.next` в `.next-broken-N` и собрать снова.

## Выкладка (deploy: GitHub Pages)

```bash
gh auth switch -u Aleksei1999
gh repo create Aleksei1999/<client> --public --source . --push
gh api -X POST repos/Aleksei1999/<client>/pages -f build_type=workflow
gh auth switch -u dahaty   # всегда возвращать обратно
```

Workflow `.github/workflows/pages.yml` сам собирает с `NEXT_PUBLIC_BASE_PATH=/<repo>` и кладёт
`.nojekyll`. Сайт: `https://aleksei1999.github.io/<client>/`. Для своего домена — `public/CNAME`
и пустой basePath (убрать env из workflow), `site.url` = домен.

Локально посмотреть экспорт: `npm run build && npx serve out`.

## Чек-лист перед сдачей (pre-delivery checklist)

1. `npx tsc --noEmit`, `npm run lint`, `npm run build` — зелёные.
2. Скриншоты Playwright 390 и 1440 (полная страница) с `npx serve out`; `chromium.launch({ channel:
'chrome' })` — встроенного браузера нет. Посмотреть глазами каждый блок, проверить
   `scrollWidth === innerWidth` на 390.
3. Пролёт и наезды — скриншоты на нескольких позициях скролла (начало, выноски, конец, после блока).
4. Lighthouse mobile ≥ 90: `npx lighthouse http://localhost:3000 --preset=perf --view`.
5. Тексты: нет демо-контента, «Северной мастерской», example.com, выдуманных цифр и отзывов.
6. Форма: тестовая заявка дошла клиенту, подтверждение FormSubmit пройдено.
7. SEO: `site.url`, title/description, `og.jpg`, `icon.svg`, `routes` в `sitemap.ts`.
8. Пройтись по анти-AI правилам выше (или скиллом `kill-ai-slop`).
