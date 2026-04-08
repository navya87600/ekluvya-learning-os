import { AppLayout } from "@/components/layout/AppLayout";
import { userStats } from "@/data/mockData";

export default function ProfilePage() {
  return (
    <AppLayout title="My Profile">
      <div className="max-w-[700px]">
        {/* Profile Card */}
        <div className="bg-card border border-border rounded-xl overflow-hidden mb-6">
          <div className="h-[100px] bg-ink" />
          <div className="px-7 pb-6 relative">
            <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-brand to-brand-light border-4 border-card -mt-9 flex items-center justify-center text-[28px] font-extrabold text-primary-foreground font-heading">
              {userStats.name[0]}
            </div>
            <div className="mt-3">
              <div className="font-heading text-[22px] font-extrabold">{userStats.name} Reddy</div>
              <div className="text-[13px] text-ink-50 mb-3">{userStats.className}B · {userStats.school} · {userStats.board}</div>
              <div className="flex gap-2 flex-wrap">
                <span className="text-[11px] font-bold font-mono px-3 py-1 rounded-full bg-brand/10 text-brand">🔥 {userStats.streak} Day Streak</span>
                <span className="text-[11px] font-bold font-mono px-3 py-1 rounded-full bg-ek-amber-pale text-ek-amber">⭐ {userStats.xp.toLocaleString()} XP</span>
                <span className="text-[11px] font-bold font-mono px-3 py-1 rounded-full bg-ek-green-pale text-ek-green">🏅 {userStats.badgesEarned} Badges</span>
                <span className="text-[11px] font-bold font-mono px-3 py-1 rounded-full bg-ek-blue-pale text-ek-blue">📓 {userStats.notesCreated} Cornell Notes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {/* Subject Mastery */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="text-sm font-bold mb-4">Subject Mastery</div>
            <div className="space-y-3">
              {[
                { name: "Mathematics", pct: 74, color: "bg-ek-green", labelColor: "text-ek-green" },
                { name: "Science", pct: 58, color: "bg-ek-amber", labelColor: "text-ek-amber" },
                { name: "English", pct: 88, color: "bg-ek-green", labelColor: "text-ek-green" },
                { name: "Social Science", pct: 38, color: "bg-destructive", labelColor: "text-destructive" },
              ].map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-[12px] font-semibold mb-1">
                    <span>{s.name}</span>
                    <span className={s.labelColor}>{s.pct}%</span>
                  </div>
                  <div className="h-[5px] bg-secondary rounded-full overflow-hidden">
                    <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="text-sm font-bold mb-4">My Badges</div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { emoji: "🏅", label: "Maths", sub: "Master" },
                { emoji: "🔬", label: "Science", sub: "Explorer" },
                { emoji: "🔥", label: "7 Day", sub: "Streak" },
              ].map((b) => (
                <div key={b.label} className="text-center p-3 bg-secondary rounded-lg">
                  <div className="text-[28px]">{b.emoji}</div>
                  <div className="text-[10px] font-bold mt-1">{b.label}</div>
                  <div className="text-[9px] text-ink-50">{b.sub}</div>
                </div>
              ))}
            </div>
            <button className="w-full mt-3 px-3 py-2 rounded-full text-[11px] font-semibold border border-border bg-card text-ink-50 hover:border-brand transition-colors">
              📲 Share on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
