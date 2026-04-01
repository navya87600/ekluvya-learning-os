import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { learningPathSteps, aiRecommendations, todaySession } from "@/data/mockData";

export default function LearningPath() {
  const navigate = useNavigate();

  return (
    <AppLayout title="AI Learning Path">
      <div className="font-mono text-[10px] font-medium tracking-[2px] uppercase text-brand mb-1.5">Adaptive AI Engine</div>
      <h1 className="font-heading text-2xl font-extrabold mb-1">Your Personalised Learning Path</h1>
      <p className="text-sm text-ink-50 mb-6">Built from your quiz results, watch time, and NCERT syllabus. Updated every week as you learn.</p>

      <div className="grid grid-cols-2 gap-6">
        {/* Left: Timeline */}
        <div className="bg-card border border-border rounded-xl p-[22px]">
          <div className="text-[13px] font-bold mb-1">Mathematics — Class 10 NCERT</div>
          <div className="text-[11px] text-brand font-mono font-semibold mb-5 tracking-[1px]">AI ADAPTIVE · CBSE / TS BOARD</div>

          <div className="flex flex-col relative">
            <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gradient-to-b from-brand to-border" />
            {learningPathSteps.map((step, i) => (
              <div key={i} className={`flex gap-4 mb-5 relative ${step.status === "locked" ? "opacity-50" : ""}`}>
                <div className={`w-[42px] h-[42px] rounded-full flex items-center justify-center text-sm flex-shrink-0 z-10 ${
                  step.status === "completed" ? "bg-ek-green text-primary-foreground" :
                  step.status === "current" ? "bg-brand text-primary-foreground" :
                  "bg-surface-2 text-ink-50 border-2 border-border"
                }`}>
                  {step.status === "completed" ? "✓" : step.status === "current" ? "▶" : step.chapterNumber}
                </div>
                <div className={`pt-2 ${step.status === "current" ? "bg-brand/[0.05] border border-brand/[0.15] rounded-lg px-3.5 py-2.5 flex-1" : ""}`}>
                  <div className={`text-[13px] font-bold ${step.status === "current" ? "text-brand" : ""}`}>
                    Ch. {step.chapterNumber} — {step.chapterName} {step.status === "current" && "← NOW"}
                  </div>
                  <div className={`text-[11px] font-mono ${
                    step.status === "completed" ? "text-ek-green" : "text-ink-50"
                  }`}>
                    {step.status === "completed" ? `Completed · ${step.mastery}% mastery` :
                     step.status === "current" ? `${step.progress}% through · Est. 4 videos left` :
                     `Locked · Unlocks after Ch. ${step.chapterNumber - 1} completion`}
                    {step.note && <span className="text-ek-amber"> · {step.note}</span>}
                  </div>
                  {step.status === "current" && step.progress && (
                    <div className="h-[5px] bg-surface-2 rounded-full overflow-hidden mt-1.5">
                      <div className="h-full bg-gradient-to-r from-brand to-brand-light rounded-full" style={{ width: `${step.progress}%` }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recommendations + Session */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="text-[13px] font-bold mb-3">🤖 AI Recommendations This Week</div>
            <div className="space-y-2.5">
              {aiRecommendations.map((rec, i) => (
                <div key={i} className={`p-3 rounded-sm border-l-[3px] ${
                  rec.color === "amber" ? "bg-ek-amber-pale border-ek-amber" :
                  rec.color === "blue" ? "bg-ek-blue-pale border-ek-blue" :
                  "bg-ek-green-pale border-ek-green"
                }`}>
                  <div className={`text-xs font-bold ${
                    rec.color === "amber" ? "text-ek-amber" :
                    rec.color === "blue" ? "text-ek-blue" :
                    "text-ek-green"
                  }`}>{rec.icon} {rec.title}</div>
                  <div className="text-xs text-ink-80 mt-0.5 leading-relaxed">{rec.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5">
            <div className="text-[13px] font-bold mb-3">📅 Today's Suggested Session (45 min)</div>
            <div className="space-y-2">
              {todaySession.map((item, i) => (
                <div key={i} className="flex gap-2.5 items-center p-2.5 bg-surface rounded-sm">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <div className="text-[12.5px] font-semibold">{item.title}</div>
                    <div className="text-[11px] text-ink-50 font-mono">{item.meta}</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="w-full mt-3.5 py-2.5 rounded-full text-[13px] font-semibold bg-gradient-to-r from-brand to-brand-light text-primary-foreground hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(232,65,10,0.35)] transition-all"
              onClick={() => navigate("/topic/t-4-2")}
            >
              ▶ Start This Session
            </button>
          </div>

          {/* Path Modes */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="text-[13px] font-bold mb-3">🎯 Learning Path Modes</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: "🌱", name: "Beginner", desc: "Full step-by-step", active: true },
                { icon: "⚡", name: "Fast Track", desc: "Skip what you know" },
                { icon: "📝", name: "Exam Revision", desc: "Board exam focused" },
                { icon: "🔧", name: "Weak Repair", desc: "Fix problem areas" },
              ].map((mode) => (
                <div key={mode.name} className={`p-2.5 border rounded-sm cursor-pointer text-center transition-all ${mode.active ? "border-brand bg-brand/[0.05]" : "border-border bg-surface hover:border-brand"}`}>
                  <div className="text-xl mb-1">{mode.icon}</div>
                  <div className="text-[11.5px] font-bold">{mode.name}</div>
                  <div className="text-[10px] text-ink-50 mt-0.5">{mode.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
