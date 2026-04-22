import { Rocket, Code2, Sigma, Lock, TrendingUp, Flame } from "lucide-react";
import { type DashboardData } from "./data";

const iconMap = {
  code: Code2,
  sigma: Sigma,
  lock: Lock,
};

function CornerBrackets() {
  const base =
    "pointer-events-none absolute size-6 border-hero-accent/80 drop-shadow-[0_0_6px_hsl(var(--hero-accent)/0.7)]";
  return (
    <>
      <span className={`${base} left-3 top-3 border-l-2 border-t-2`} />
      <span className={`${base} right-3 top-3 border-r-2 border-t-2`} />
      <span className={`${base} bottom-3 left-3 border-b-2 border-l-2`} />
      <span className={`${base} bottom-3 right-3 border-b-2 border-r-2`} />
    </>
  );
}

export function HeroMainContent({ data }: { data: DashboardData }) {
  return (
    <>
      {/* HERO CARD */}
      <section
        className="relative overflow-hidden rounded-[var(--hero-radius)] border border-hero-border bg-hero-surface shadow-[var(--hero-shadow)] animate-scale-in"
        style={{ animationDelay: "120ms" }}
      >
        <div className="relative h-[420px] w-full">
          <img
            src="/images/pixel-hero.jpg"
            alt="Pixel art landscape"
            className="absolute inset-0 size-full object-cover animate-fade-in"
            style={{
              imageRendering: "pixelated",
              animationDelay: "200ms",
              animationDuration: "1.2s",
            }}
          />
          <div className="pointer-events-none absolute inset-0 crt-scanlines mix-blend-overlay opacity-70" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-hero-accent/0 via-hero-accent/25 to-hero-accent/0 animate-scanline" />
          <div className="pointer-events-none absolute inset-0">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="absolute bottom-0 size-1.5 rounded-full bg-hero-accent shadow-[0_0_8px_hsl(var(--hero-accent))] animate-particle-rise"
                style={{
                  left: `${15 + i * 18}%`,
                  animationDelay: `${i * 0.7}s`,
                  animationDuration: `${3.5 + i * 0.4}s`,
                }}
              />
            ))}
          </div>
          <CornerBrackets />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-10">
            <p
              className="pixel-text text-[11px] font-bold tracking-[0.22em] text-hero-accent animate-fade-up"
              style={{ animationDelay: "450ms" }}
            >
              <span className="text-hero-accent/70">▸</span>{" "}
              {data.hero.eyebrow.prefix}{" "}
              <span className="text-hero-text">{data.hero.eyebrow.suffix}</span>
              <span className="ml-1 inline-block h-3 w-2 align-middle bg-hero-accent animate-blink-caret" />
            </p>
            <h1
              className="mt-3 text-[56px] font-extrabold leading-[1.05] tracking-tight animate-fade-up"
              style={{ animationDelay: "600ms", color: "white" }}
            >
              <span data-text={data.hero.title}>{data.hero.title}</span>
            </h1>
            <p
              className="mt-4 max-w-xl text-[15px] leading-relaxed text-hero-text/75 animate-fade-up"
              style={{ animationDelay: "750ms", color: "white" }}
            >
              {data.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* QUEST + LEADERBOARD */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        {/* QUEST TRACKER */}
        <section className="md:col-span-2 rounded-[var(--hero-radius)] border border-hero-border bg-hero-surface p-6 shadow-[var(--hero-shadow)]">
          <header className="mb-5 flex items-center justify-between">
            <h2 className="text-[11px] font-bold tracking-[0.18em] text-hero-muted">
              {data.quests.title}
            </h2>
            <span className="rounded-full bg-hero-accent/15 px-2.5 py-1 text-[10px] font-bold tracking-[0.15em] text-hero-accent">
              {data.quests.activeCount} ACTIVE
            </span>
          </header>
          <ul className="space-y-3">
            {data.quests.items.map((q) => {
              const Icon = iconMap[q.icon as keyof typeof iconMap];
              return (
                <li
                  key={q.id}
                  className={`rounded-2xl border border-hero-border p-4 transition-transform hover:-translate-y-0.5 ${
                    q.locked
                      ? "bg-hero-surface-2/40 opacity-60"
                      : "bg-hero-surface-2"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`grid size-11 place-items-center rounded-xl border border-hero-border ${
                        q.locked
                          ? "bg-hero-bg text-hero-dim"
                          : "bg-hero-bg text-hero-accent"
                      }`}
                    >
                      <Icon className="size-5" strokeWidth={2.2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-hero-text">
                        {q.title}
                      </p>
                      <p className="text-xs text-hero-dim">{q.meta}</p>
                    </div>
                  </div>
                  {!q.locked && (
                    <>
                      <div className="mt-3 flex items-center justify-between text-[10px] font-bold tracking-[0.15em]">
                        <span className="text-hero-accent">{q.status}</span>
                        <span className="text-hero-muted">{q.progress}%</span>
                      </div>
                      <div className="relative mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-hero-border/60">
                        <div
                          className="h-full origin-left rounded-full xp-bar shadow-[0_0_10px_hsl(var(--hero-accent)/0.7)]"
                          style={{ width: `${q.progress}%` }}
                        />
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
          <button className="group relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-hero-accent py-3 text-[12px] font-bold tracking-[0.15em] text-hero-bg shadow-[0_0_24px_hsl(var(--hero-accent)/0.45)] transition-transform hover:scale-[1.02]">
            <Rocket
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.4}
            />
            {data.quests.cta}
          </button>
        </section>

        {/* LEADERBOARD */}
        <section className="md:col-span-3 flex flex-col rounded-[var(--hero-radius)] border border-hero-border bg-hero-surface p-6 shadow-[var(--hero-shadow)]">
          <header className="mb-5 flex items-center justify-between">
            <h2 className="text-[11px] font-bold tracking-[0.18em] text-hero-muted">
              {data.leaderboard.title}
            </h2>
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="relative inline-flex size-2 rounded-full bg-hero-live" />
              </span>
              <span className="text-[10px] font-bold tracking-[0.18em] text-hero-accent">
                {data.leaderboard.liveLabel}
              </span>
            </div>
          </header>

          <ul className="flex-1 space-y-2">
            {data.leaderboard.entries.map((e) => (
              <li
                key={e.rank}
                className={`relative flex items-center gap-4 rounded-2xl px-4 py-3 transition-all hover:translate-x-1 hover:bg-hero-surface-2 ${
                  e.highlight
                    ? "bg-gradient-to-r from-hero-accent/15 via-hero-surface-2 to-hero-surface-2 ring-1 ring-hero-accent/30 overflow-hidden"
                    : ""
                }`}
              >
                <span
                  className={`w-6 text-sm font-bold tabular-nums ${e.highlight ? "text-hero-accent" : "text-hero-dim"}`}
                >
                  {String(e.rank).padStart(2, "0")}
                </span>
                <div
                  className={`relative size-10 overflow-hidden rounded-full bg-hero-bg ring-1 ${
                    e.highlight
                      ? "ring-hero-accent shadow-[0_0_14px_hsl(var(--hero-accent)/0.6)]"
                      : "ring-hero-border"
                  }`}
                >
                  <img
                    src={e.avatar}
                    alt={e.name}
                    className="size-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-hero-text">
                    {e.name}
                  </p>
                  <p className="text-[10px] font-bold tracking-[0.18em] text-hero-dim">
                    {e.title}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-base font-bold tabular-nums ${
                      e.highlight
                        ? "text-hero-accent drop-shadow-[0_0_8px_hsl(var(--hero-accent)/0.6)]"
                        : "text-hero-text"
                    }`}
                  >
                    {e.score.toLocaleString()}
                  </p>
                  {e.delta && (
                    <p className="flex items-center justify-end gap-1 text-[11px] text-hero-success">
                      <TrendingUp className="size-3" strokeWidth={2.5} />
                      {e.delta}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <footer className="mt-5 flex items-end justify-between border-t border-hero-border pt-4">
            <div>
              <p className="text-[10px] font-bold tracking-[0.18em] text-hero-dim">
                {data.leaderboard.stats.streakLabel}
              </p>
              <p className="mt-1 flex items-center gap-1 text-base font-bold text-hero-text">
                {data.leaderboard.stats.streak}
                <Flame className="size-4 text-hero-accent" />
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold tracking-[0.18em] text-hero-dim">
                {data.leaderboard.stats.avgLabel}
              </p>
              <p className="mt-1 flex items-center justify-end gap-1 text-base font-bold text-hero-text">
                {data.leaderboard.stats.avg}
                <span className="text-hero-accent">⚡</span>
              </p>
            </div>
          </footer>
        </section>
      </div>
    </>
  );
}
