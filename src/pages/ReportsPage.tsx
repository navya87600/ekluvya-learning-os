import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";

const reportViews = ["📖 Student View", "🎓 Teacher Brief", "👪 Parent Brief", "🏫 Principal View"];

function StudentView() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-bold text-foreground">Week of 24–31 March 2026 · Arjun Reddy · Class 10B</div>
        <span className="text-[11px] font-bold font-mono px-3 py-1 rounded-full bg-ek-green-pale text-ek-green">On Track</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { subject: "Mathematics", chapter: "Ch. 4 · Quadratic Equations", score: 74, color: "ek-green", status: "3 concepts mastered" },
          { subject: "Science", chapter: "Ch. 3 · Metals & Non-Metals", score: 58, color: "ek-amber", status: "⚠ Needs revision" },
          { subject: "English", chapter: "Lesson 12 · First Flight", score: 88, color: "ek-green", status: "✓ Excellent" },
          { subject: "Social Science", chapter: "Ch. 2 · Nationalism in India", score: 38, color: "destructive", status: "⚠ Urgent: Teacher notified" },
        ].map((s) => (
          <div key={s.subject} className="bg-card border border-border rounded-xl p-4">
            <div className="text-[11px] font-bold font-mono tracking-[1px] uppercase text-ink-50 mb-1">{s.subject}</div>
            <div className="text-[12px] font-semibold text-foreground mb-2">{s.chapter}</div>
            <div className={`text-2xl font-heading font-extrabold mb-2 ${
              s.score >= 70 ? "text-ek-green" : s.score >= 50 ? "text-ek-amber" : "text-destructive"
            }`}>{s.score}%</div>
            <div className="h-[5px] bg-secondary rounded-full overflow-hidden mb-1.5">
              <div className={`h-full rounded-full ${
                s.score >= 70 ? "bg-ek-green" : s.score >= 50 ? "bg-ek-amber" : "bg-destructive"
              }`} style={{ width: `${s.score}%` }} />
            </div>
            <div className={`text-[11px] font-semibold ${
              s.score >= 70 ? "text-ek-green" : s.score >= 50 ? "text-ek-amber" : "text-destructive"
            }`}>{s.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeacherView() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 p-5 border-b border-border">
          <div className="w-10 h-10 rounded-full bg-ek-amber-pale flex items-center justify-center text-xl">🎓</div>
          <div>
            <div className="text-sm font-bold">AI Brief — For Teacher</div>
            <div className="text-[11px] text-ink-50 font-mono">Technical diagnostic · Week 24–31 Mar</div>
          </div>
          <span className="text-[9px] font-bold font-mono px-2.5 py-1 rounded-full bg-brand/10 text-brand ml-auto">AI Written</span>
        </div>
        <div className="p-5">
          <div className="text-[13px] text-ink-80 leading-relaxed border-l-[3px] border-brand pl-4">
            Arjun mastered 3 concepts in Maths this week with strong procedural fluency in factorisation (74% accuracy). However, his word-problem translation accuracy dropped to 38% — this is a <strong className="text-foreground">conceptual gap</strong>, not a calculation error: he can execute algorithms but cannot map real-world scenarios to mathematical notation. <strong className="text-foreground">Recommended action:</strong> 10-minute word-problem translation practice before the next chapter. His peak study window is 8–10 PM; schedule revision reminders then. Flag for Science: Chapter 3 quiz accuracy (58%) suggests he's confusing metal reactivity series ordering.
          </div>
          <div className="flex gap-2 mt-4">
            <button className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-border bg-card text-ink-50 hover:border-brand transition-colors">📊 Full Class Report</button>
            <button className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-border bg-card text-ink-50 hover:border-brand transition-colors">✉️ Message Parent</button>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <div className="text-sm font-bold">Class 10B — Mastery Heatmap</div>
          <div className="text-[11px] text-ink-50 font-mono">Red = struggling · Amber = partial · Green = mastered</div>
        </div>
        <div className="p-5 overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 text-ink-50 font-semibold">Student</th>
                <th className="py-2 px-2 text-ink-50 font-semibold">Factorisation</th>
                <th className="py-2 px-2 text-ink-50 font-semibold">Word Probs</th>
                <th className="py-2 px-2 text-ink-50 font-semibold">Discriminant</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Arjun R.", scores: [74, 38, null] },
                { name: "Priya K.", scores: [91, 82, 78] },
                { name: "Rohan M.", scores: [62, 41, null] },
                { name: "Sneha V.", scores: [88, 76, 55] },
              ].map((row) => (
                <tr key={row.name} className="border-b border-border/50">
                  <td className="py-2 px-2 font-semibold text-foreground">{row.name}</td>
                  {row.scores.map((s, i) => (
                    <td key={i} className="py-2 px-2 text-center">
                      {s !== null ? (
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          s >= 70 ? "bg-ek-green-pale text-ek-green" : s >= 50 ? "bg-ek-amber-pale text-ek-amber" : "bg-ek-red-pale text-destructive"
                        }`}>{s}%</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-secondary text-ink-50">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 p-3 bg-ek-amber-pale rounded-lg text-[12px] text-ek-amber">
            ⚠ <strong>AI flag:</strong> Word problem translation accuracy is below 50% for 3 students. Consider a re-teach session on Ex. 4.2 Q3-Q7.
          </div>
        </div>
      </div>
    </div>
  );
}

function ParentView() {
  return (
    <div className="max-w-[620px]">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 p-5 border-b border-border">
          <div className="w-10 h-10 rounded-full bg-ek-blue-pale flex items-center justify-center text-xl">👪</div>
          <div>
            <div className="text-sm font-bold">Weekly Update — For You, Arjun's Parent</div>
            <div className="text-[11px] text-ink-50 font-mono">Plain language · Week 24–31 Mar 2026</div>
          </div>
        </div>
        <div className="p-5">
          <div className="text-[13px] text-ink-80 leading-relaxed border-l-[3px] border-brand pl-4 mb-4">
            Arjun had a productive week! He spent <strong className="text-foreground">4.2 hours studying</strong> and watched 12 videos on his own — that's above average. He's making good progress in Maths and English. He's finding Social Studies a little harder right now, but his teacher has been informed and will give him some extra practice problems this week. <strong className="text-foreground">No action needed from your side</strong> — he's on track for the month's learning goal. 🎉
          </div>

          <div className="bg-secondary rounded-lg p-4 mb-4">
            <div className="text-[11px] font-bold text-ink-50 font-mono tracking-[1px] mb-3">SUBJECTS AT A GLANCE</div>
            <div className="space-y-3">
              {[
                { name: "Maths", pct: 74, color: "bg-ek-green", label: "Good", labelColor: "text-ek-green" },
                { name: "Science", pct: 58, color: "bg-ek-amber", label: "Improving", labelColor: "text-ek-amber" },
                { name: "English", pct: 88, color: "bg-ek-green", label: "Excellent", labelColor: "text-ek-green" },
                { name: "SST", pct: 38, color: "bg-destructive", label: "Needs help", labelColor: "text-destructive" },
              ].map((s) => (
                <div key={s.name} className="flex items-center gap-3">
                  <span className="w-16 text-[12px] font-semibold">{s.name}</span>
                  <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.pct}%` }} />
                  </div>
                  <span className={`text-[12px] font-bold ${s.labelColor}`}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-ek-blue-pale rounded-lg text-[12px] text-ek-blue mb-3">
            📌 <strong>One thing you can do:</strong> Ask Arjun to revise Nationalism in India (SST Chapter 2) this weekend. Just 20 minutes of reading the NCERT notes will help significantly.
          </div>

          <button className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-border bg-card text-ink-50 hover:border-brand transition-colors">
            📲 Share via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

function PrincipalView() {
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {[
          { icon: "📊", num: "84%", label: "School Engagement Rate", delta: "↑ 6% vs last month", deltaColor: "text-ek-green" },
          { icon: "👨‍👩‍👧", num: "72%", label: "Parent Weekly Brief Open Rate", delta: "Industry avg: 45%", deltaColor: "text-ek-green" },
          { icon: "🎯", num: "71%", label: "Average Quiz Accuracy", delta: "↑ 3% — board target: 75%", deltaColor: "text-ek-green" },
          { icon: "⚠️", num: "12", label: "At-Risk Students Flagged", delta: "Action: Teacher review", deltaColor: "text-ek-amber" },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border rounded-xl p-5 text-center">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className="text-2xl font-heading font-extrabold text-foreground">{s.num}</div>
            <div className="text-[11px] text-ink-50 mt-1">{s.label}</div>
            <div className={`text-[11px] font-semibold mt-1 ${s.deltaColor}`}>{s.delta}</div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-brand to-brand-light text-primary-foreground hover:-translate-y-0.5 hover:shadow-ek-lg transition-all">
          📄 Export Full School Report (PDF)
        </button>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const [activeView, setActiveView] = useState(0);

  const views = [<StudentView />, <TeacherView />, <ParentView />, <PrincipalView />];

  return (
    <AppLayout title="Reports & Progress">
      <div className="mb-6">
        <div className="font-mono text-[10px] font-medium tracking-[2px] uppercase text-brand mb-1">AI-Generated Weekly Reports</div>
        <h1 className="font-heading text-2xl font-extrabold mb-1">Reports & Progress</h1>
        <p className="text-sm text-ink-50">Plain-language briefs for the right people. Detailed analytics for teachers. Simple summaries for parents.</p>
      </div>

      {/* Report Switcher */}
      <div className="flex gap-1 bg-secondary rounded-full p-1 mb-6 w-fit">
        {reportViews.map((label, i) => (
          <button
            key={label}
            onClick={() => setActiveView(i)}
            className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all ${
              activeView === i
                ? "bg-gradient-to-r from-brand to-brand-light text-primary-foreground shadow-sm"
                : "text-ink-50 hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {views[activeView]}
    </AppLayout>
  );
}
