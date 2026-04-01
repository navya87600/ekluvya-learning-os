import { userStats } from "@/data/mockData";

interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  return (
    <header className="fixed left-[72px] right-0 top-0 h-[60px] bg-surface/92 backdrop-blur-xl border-b border-border flex items-center px-7 gap-4 z-40">
      <h1 className="font-heading text-lg font-bold text-foreground">{title}</h1>
      <div className="flex items-center gap-1.5 px-3 py-[5px] bg-ek-purple-pale border border-ai-1/20 rounded-full text-[11px] font-semibold text-ai-1 font-mono">
        <div className="w-[7px] h-[7px] bg-ai-1 rounded-full animate-ai-pulse" />
        Eklu AI — Active
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-[7px] text-[13px] text-ink-50 cursor-text hover:border-brand transition-colors min-w-[220px]">
          <span>🔍</span> Search chapters, topics...
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold font-mono bg-ek-amber-pale text-ek-amber border border-ek-amber/20">
          🔥 {userStats.streak} Day Streak
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold font-mono bg-ek-blue-pale text-ek-blue border border-ek-blue/20">
          ⭐ {userStats.xp.toLocaleString()} XP
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-sm font-bold text-primary-foreground cursor-pointer font-heading">
          {userStats.name[0]}
        </div>
      </div>
    </header>
  );
}
