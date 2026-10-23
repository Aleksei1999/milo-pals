import { LookHero } from '@/components/LookHero';
import { Reveal } from '@/components/Reveal';
import { TearTop } from '@/components/Tear';
import { ZeroG } from '@/components/ZeroG';
import { asset } from '@/lib/asset';

// тексты и характеры — с листов персонажей
const CREW = [
  {
    id: 'milo',
    name: 'Milo',
    role: 'Leader / Explorer',
    text: 'Curious, kind and brave. Milo loves exploring new worlds and always finds a way to turn problems into adventures.',
    quote: 'Let’s see what’s out there!',
    facts: ['Age 10–12', 'Human', 'Curious, impulsive, optimistic'],
    color: '#ffd94a',
    tilt: -2,
  },
  {
    id: 'zoe',
    name: 'Zoe',
    role: 'Creative thinker / Problem solver',
    text: 'Smart, creative and full of ideas. Zoe always sees the bright side, keeps the team smiling and never gives up.',
    quote: 'I have an idea!',
    facts: ['Age 10–12', 'Human', 'Energetic, confident'],
    color: '#ff8fc4',
    tilt: 1.5,
  },
  {
    id: 'bibo',
    name: 'Bibo',
    role: 'Comic relief / Explorer',
    text: 'A funny alien from another galaxy. Loyal, curious and always excited to discover new things. He gets into trouble, but his big heart brings the team together.',
    quote: 'Ooooh! What’s this?',
    facts: ['Age unknown', 'Alien', 'Playful, unpredictable'],
    color: '#7fe0f7',
    tilt: -1,
  },
  {
    id: 'nova',
    name: 'Nova',
    role: 'Explorer / Problem solver',
    text: 'A smart and fearless cat. Nova is great at solving puzzles, finding hidden things and getting the team out of trouble.',
    quote: 'Meow!',
    facts: ['Age unknown', 'Cat', 'Brave, observant, loyal'],
    color: '#ffb36b',
    tilt: 2,
  },
];

const WORLDS = [
  {
    id: 'explorer',
    name: 'The Explorer',
    tag: 'Small crew. Big adventures.',
    text: 'A small but amazing spaceship that takes Milo & Pals to new worlds. Not just a vehicle: it is their home, their base and the start of every adventure.',
    wide: true,
  },
  {
    id: 'treehouse',
    name: 'Secret Treehouse',
    tag: 'Same friends. Bigger adventures.',
    text: 'A hidden home and a big imagination. Where Milo, Zoe, Bibo and Nova plan, explore, create and dream about new worlds.',
  },
  {
    id: 'gateway',
    name: 'Gateway Station',
    tag: 'Between worlds. Beyond limits.',
    text: 'A floating station that connects different worlds, where travellers and explorers meet before their next journey.',
  },
  {
    id: 'home',
    name: 'Milo’s Home',
    tag: 'A place to come back to.',
    text: 'A cosy house in a peaceful neighbourhood. A familiar place, but full of small adventures.',
  },
  {
    id: 'park',
    name: 'Earth Park',
    tag: 'Explore. Play. Be kind.',
    text: 'The local park where the friends meet, have fun and discover that even small moments can turn into big adventures.',
  },
];

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <LookHero />
      <ZeroG />

      {/* герои на кремовой бумаге, как листы персонажей; наезжает на стоп-кадр невесомости */}
      <section
        id="crew"
        className="relative z-10 -mt-[100svh] bg-paper pb-28 pt-24 text-ink md:pb-36 md:pt-32"
      >
        <TearTop color="#f6f1e3" />
        <div className="wrap">
          <Reveal className="text-center">
            <p className="hand text-[28px] text-ink-2">Meet the crew</p>
            <h2 className="title mt-1 text-[clamp(48px,7vw,104px)]">
              Four friends. One tiny ship.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CREW.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.08} tilt={c.tilt}>
                <article className="flex h-full flex-col rounded-[28px] border-[3px] border-ink bg-white p-6 shadow-[6px_6px_0_var(--color-ink)]">
                  <div
                    className="relative flex aspect-[4/5] items-end justify-center overflow-hidden rounded-[20px]"
                    style={{ background: c.color }}
                  >
                    <img
                      src={asset(`/cast/${c.id}.webp`)}
                      alt={`${c.name}, ${c.role.toLowerCase()}`}
                      loading="lazy"
                      className="relative max-h-[92%] w-auto max-w-[88%] object-contain drop-shadow-[0_8px_0_rgb(19_41_74/0.25)] transition-transform duration-300 hover:-translate-y-2 hover:rotate-2"
                    />
                  </div>
                  <h3 className="title mt-5 text-[48px]">{c.name}</h3>
                  <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-ink-2">
                    {c.role}
                  </p>
                  <p className="mt-3 flex-1 text-[16px] leading-snug">{c.text}</p>
                  <p
                    className="hand swash mt-5 self-start text-[24px]"
                    style={{ background: c.color }}
                  >
                    “{c.quote}”
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 border-t-2 border-dashed border-ink/20 pt-4 text-[13px] text-ink-2">
                    {c.facts.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* миры: снова космос, рваный край тёмной бумаги */}
      <section id="worlds" className="relative bg-space-2 py-28 md:py-36">
        <TearTop color="#171a45" fibre="#f6f1e3" />
        <div className="wrap">
          <Reveal className="text-center">
            <p className="hand text-[28px] text-sun">Where they go</p>
            <h2 className="logo mt-2 text-[clamp(48px,7vw,104px)]">Different worlds</h2>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {WORLDS.map((w, i) => (
              <Reveal
                key={w.id}
                delay={(i % 2) * 0.08}
                tilt={i % 2 ? 1 : -1}
                className={w.wide ? 'md:col-span-2' : ''}
              >
                <article className="overflow-hidden rounded-[28px] border-[3px] border-white/90 bg-space shadow-[6px_6px_0_rgb(185_242_63/0.9)]">
                  <img
                    src={asset(`/worlds/${w.id}.webp`)}
                    alt={w.name}
                    loading="lazy"
                    className={`w-full object-cover ${w.wide ? 'aspect-[16/8]' : 'aspect-[16/10]'}`}
                  />
                  <div className="p-6 md:p-8">
                    <h3 className="title text-[clamp(32px,3.4vw,48px)]">{w.name}</h3>
                    <p className="hand mt-1 text-[24px] text-sun">{w.tag}</p>
                    <p className="mt-3 max-w-[52ch] text-white/80">{w.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* финал: постер целиком */}
      <section className="relative bg-space pb-20 pt-24 text-center">
        <TearTop color="#0c0f2e" fibre="#171a45" />
        <Reveal className="wrap">
          <img
            src={asset('/worlds/banner.webp')}
            alt="Milo, Zoe, Bibo and Nova on an alien planet next to The Explorer, with the title Milo & Pals"
            loading="lazy"
            className="mx-auto w-full max-w-[1100px] rounded-[28px] border-[3px] border-white/90"
          />
          <p className="title mt-12 text-[clamp(28px,3.4vw,44px)]">
            New worlds. New friends. New stories.
          </p>
          <p className="hand mt-2 text-[26px] text-sun">Coming soon ♥</p>
        </Reveal>
        <p className="mt-20 text-[13px] text-white/50">
          © {new Date().getFullYear()} Milo &amp; Pals. Website by{' '}
          <a href="https://fomenko.store" className="underline">
            Fomenko
          </a>
          .
        </p>
      </section>
    </main>
  );
}
