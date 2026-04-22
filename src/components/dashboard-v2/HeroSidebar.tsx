import { BadgeCheck, Award, Clock, RefreshCw } from "lucide-react";
import { type DashboardData } from "./data";

function RingProgress({
  value,
  max,
  className = "",
}: {
  value: number;
  max: number;
  className?: string;
}) {
  const size = 120;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  const offset = c * (1 - pct);
  return (
    <div
      className={`relative grid place-items-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="hsl(var(--hero-border))"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="hsl(var(--hero-accent))"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{
            filter: "drop-shadow(0 0 8px hsl(var(--hero-accent) / 0.5))",
          }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center leading-none">
          <p className="text-3xl font-bold">{value}</p>
          <p className="mt-1 text-[10px] font-bold tracking-[0.2em] text-hero-muted">
            XP
          </p>
        </div>
      </div>
    </div>
  );
}

export function HeroSidebar({ data }: { data: DashboardData }) {
  return (
    <>
      {/* RANK */}
      <section className="relative overflow-hidden rounded-[var(--hero-radius)] border border-hero-border bg-hero-surface p-6 shadow-[var(--hero-shadow)]">
        <div className="relative">
          <p className="text-[10px] font-bold tracking-[0.2em] text-hero-dim">
            {data.rank.label}
          </p>
          <h3 className="mt-1 flex items-center gap-2 text-2xl font-bold">
            {data.rank.name}
            <BadgeCheck className="size-4 text-hero-accent" />
          </h3>
          <div className="absolute right-0 top-0 grid size-12 place-items-center rounded-full bg-hero-accent/10 ring-1 ring-hero-accent/40">
            <Award className="size-6 text-hero-accent" strokeWidth={2.2} />
          </div>
          <div className="mt-10 flex items-center justify-between text-[10px] font-bold tracking-[0.18em]">
            <span className="text-hero-muted">{data.rank.progressLabel}</span>
            <span className="text-hero-accent">{data.rank.progress}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-hero-border/60">
            <div
              className="h-full origin-left rounded-full xp-bar shadow-[0_0_12px_hsl(var(--hero-accent)/0.7)]"
              style={{ width: `${data.rank.progress}%` }}
            />
          </div>
        </div>
      </section>

      {/* DAILY GOAL */}
      <section className="rounded-[var(--hero-radius)] border border-hero-border bg-hero-surface p-6 text-center shadow-[var(--hero-shadow)]">
        <p className="text-[10px] font-bold tracking-[0.2em] text-hero-dim">
          {data.dailyGoal.label}
        </p>
        <RingProgress
          value={data.dailyGoal.xp}
          max={data.dailyGoal.target}
          className="mx-auto mt-4"
        />
        <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-hero-muted">
          <Clock className="size-3" />
          Reset in {data.dailyGoal.resetIn}
        </p>
        <p className="mt-2 text-[13px] font-medium text-hero-text">
          {data.dailyGoal.remaining}
        </p>
      </section>

      {/* NEURAL SYNC */}
      <section className="rounded-[var(--hero-radius)] border border-hero-border bg-hero-surface p-5 shadow-[var(--hero-shadow)]">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-base font-bold">
              {data.neuralSync.title}
              <span className="size-1.5 rounded-full bg-hero-accent" />
            </p>
            <p className="mt-0.5 truncate text-[11px] text-hero-dim">
              {data.neuralSync.refreshed}
            </p>
          </div>
          <button className="group flex shrink-0 items-center gap-1.5 rounded-full bg-hero-accent px-4 py-2.5 text-[11px] font-bold tracking-[0.15em] text-hero-bg transition-transform hover:scale-[1.05]">
            <RefreshCw
              className="size-3.5 transition-transform group-hover:rotate-180"
              strokeWidth={2.5}
            />
            {data.neuralSync.cta}
          </button>
        </div>
      </section>

      {/* AD */}
      <section className="rounded-[var(--hero-radius)] border border-hero-border bg-gradient-to-br from-hero-accent/30 via-hero-accent/10 to-hero-surface-2 p-6 shadow-[var(--hero-shadow)]">
        <h3 className="text-base font-bold tracking-wider">{data.ad.title}</h3>
        <p className="mt-3 text-[13px] leading-relaxed text-hero-text/80">
          {data.ad.body}
        </p>
      </section>
    </>
  );
}
