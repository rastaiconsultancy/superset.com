import { ParticlesBackground } from "../particles-background";
import { dashboardData, type DashboardData } from "./data";
import { HeroMainContent } from "./HeroMainContent";
import { HeroSidebar } from "./HeroSidebar";

interface HeroDashboardProps {
  data?: DashboardData;
}

export default function HeroDashboard({
  data = dashboardData,
}: HeroDashboardProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-hero-bg font-sans text-hero-text antialiased">
      <ParticlesBackground />
      <div className="relative mx-auto max-w-[1280px] px-6 py-6">
        <div className="mt-4 grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-9 space-y-6">
            <HeroMainContent data={data} />
          </div>
          <aside className="col-span-12 lg:col-span-3 space-y-6">
            <HeroSidebar data={data} />
          </aside>
        </div>
      </div>
    </div>
  );
}
