import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { userStats, weekDays, chapters } from "@/data/mockData";

export default function Dashboard() {
  const navigate = useNavigate();
  
  return (
    <AppLayout title="Dashboard">
      {/* Welcome Banner */}
      <div className="bg-ink rounded-xl p-8 relative overflow-hidden mb-7 flex items-center justify-between">
        <div className="absolute -top-[60px] -right-[60px] w-[250px] h-[250px] bg-[radial-gradient(circle,rgba(232,65,10,0.2)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-[80px] left-[300px] w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(255,108,53,0.1)_0%,transparent_70%)]" />
        <div className="flex-1 relative z-10">
          <div className="font-mono text-[11px] text-primary-foreground/40 tracking-[2px] uppercase mb-2">
            Good evening, {userStats.className} · {userStats.board}
          </div>
          <h2 className="font-heading text-[28px] font-extrabold text-primary-foreground mb-1.5">
            Welcome back, {userStats.name} 👋
          </h2>
          <p className="text-sm text-primary-foreground/50 mb-5">
            You're {userStats.currentProgress}% through Chapter 4 — {userStats.currentChapter}. {userStats.videosLeft} videos left.
          </p>
          <div className="flex gap-7">
            {[
              { num: userStats.videosWatched, lbl: "Videos Watched" },
              { num: `${userStats.quizAccuracy}%`, lbl: "Quiz Accuracy" },
              { num: userStats.badgesEarned, lbl: "Badges Earned" },
              { num: userStats.notesCreated, lbl: "Notes Created" },
            ].map((s) => (
              <div key={s.lbl}>
                <div className="font-mono text-[22px] text-brand-light font-medium leading-none">{s.num}</div>
                <div className="text-[11px] text-primary-foreground/35 mt-[3px] uppercase tracking-[1px]">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2.5 relative z-10">
          <div className="flex flex-col items-center bg-primary-foreground/[0.06] border border-primary-foreground/10 rounded-lg px-6 py-[18px] text-center">
            <div className="font-heading text-[40px] font-extrabold text-brand-light leading-none">{userStats.streak}</div>
            <div className="text-[11px] text-primary-foreground/40 mt-1 font-mono tracking-[1px] uppercase">Day Streak 🔥</div>
          </div>
          <div className="flex gap-1.5">
            {weekDays.map((d, i) => (
              <div key={i} className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold font-mono
                ${d.done ? "bg-brand text-primary-foreground" : d.today ? "bg-primary-foreground/[0.15] text-primary-foreground border-2 border-brand" : "bg-primary-foreground/[0.05] text-primary-foreground/30"}`}>
                {d.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-3.5 mb-7">
        {[
          { icon: "📖", num: "6/8", label: "NCERT Units Completed", delta: "↑ 2 this week" },
          { icon: "🎯", num: "78%", label: "Overall Quiz Accuracy", delta: "↑ 5% vs last week" },
          { icon: "⏱️", num: "4.2h", label: "Study Time This Week", delta: "↑ 30min vs last week" },
          { icon: "🏆", num: "#4", label: "Class Leaderboard Rank", delta: "↑ 2 spots this week" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-lg p-[18px_20px]">
            <div className="text-[22px] mb-2">{s.icon}</div>
            <div className="font-mono text-xl font-medium text-foreground">{s.num}</div>
            <div className="text-[11px] text-ink-50 mt-0.5 uppercase tracking-[1px]">{s.label}</div>
            <div className="text-[11px] text-ek-green font-semibold mt-1">{s.delta}</div>
          </div>
        ))}
      </div>

      {/* Continue Learning + Quick Actions */}
      <div className="grid grid-cols-2 gap-5 mb-7">
        <div>
          <div className="font-mono text-[10px] font-medium tracking-[2px] uppercase text-brand mb-1.5">Continue Learning</div>
          <h3 className="font-heading text-xl font-extrabold mb-4">Pick up where you left off</h3>
          <div className="space-y-3">
            {[
              { emoji: "📐", path: "Ch. 4 · Quadratic Equations", title: "Solution by Factorisation — Part 2", meta: "18 min · 74% watched", progress: 74 },
              { emoji: "📏", path: "Ch. 3 · Linear Equations", title: "Word Problems — Practice Set", meta: "Review flagged · 5 questions", progress: 100 },
            ].map((c, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-5 flex gap-4 items-center cursor-pointer hover:border-brand hover:shadow-ek-md transition-all" onClick={() => navigate("/topic/t-4-2")}>
                <div className="w-[90px] h-14 rounded-sm bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center text-2xl flex-shrink-0 relative">
                  {c.emoji}
                  <div className="absolute -bottom-1.5 -right-1.5 w-[22px] h-[22px] bg-gradient-to-br from-brand to-brand-light rounded-full flex items-center justify-center text-[9px] text-primary-foreground border-2 border-card">▶</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-brand font-semibold font-mono uppercase tracking-[1px] mb-1">{c.path}</div>
                  <div className="text-sm font-bold truncate mb-2">{c.title}</div>
                  <div className="text-[11px] text-ink-50 mb-2">{c.meta}</div>
                  <div className="h-[5px] bg-surface-2 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand to-brand-light rounded-full" style={{ width: `${c.progress}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-mono text-[10px] font-medium tracking-[2px] uppercase text-brand mb-1.5">My Courses</div>
          <h3 className="font-heading text-xl font-extrabold mb-4">Active Subjects</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: "📐", name: "Mathematics", chapters: 15, progress: 74, color: "brand" },
              { emoji: "🔬", name: "Science", chapters: 16, progress: 58, color: "blue" },
              { emoji: "📖", name: "English", chapters: 12, progress: 88, color: "green" },
              { emoji: "🌍", name: "Social Science", chapters: 20, progress: 38, color: "amber" },
            ].map((c) => (
              <div key={c.name} className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:border-brand hover:shadow-ek-md transition-all" onClick={() => navigate("/courses")}>
                <div className="text-2xl mb-2">{c.emoji}</div>
                <div className="text-sm font-bold">{c.name}</div>
                <div className="text-[11px] text-ink-50 font-mono">{c.chapters} chapters</div>
                <div className="mt-3 h-[5px] bg-surface-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand to-brand-light rounded-full" style={{ width: `${c.progress}%` }} />
                </div>
                <div className="text-[11px] text-brand font-mono font-semibold mt-1">{c.progress}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="bg-gradient-to-r from-ai-1/[0.07] to-ai-2/[0.04] border border-ai-1/[0.18] rounded-lg p-[13px_16px] flex gap-3 items-center">
        <span className="text-xl flex-shrink-0">🤖</span>
        <div>
          <div className="text-[13px] font-bold text-ai-1 mb-0.5">AI Learning Insight</div>
          <div className="text-xs text-ink-80 leading-relaxed">
            Your quiz accuracy drops 12% on word problems. We've queued a targeted practice set from Chapter 3 in your learning path.
            <span className="text-ai-1 font-semibold cursor-pointer ml-1" onClick={() => navigate("/learning-path")}>View Path →</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
