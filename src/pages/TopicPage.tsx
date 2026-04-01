import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { chapters, type Video } from "@/data/mockData";

type SortMode = "best" | "duration" | "rating" | "difficulty";

function VideoCard({ video, isFirst }: { video: Video; isFirst: boolean }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className={`rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-ek-md ${isFirst ? "border-2 border-brand bg-brand/[0.03]" : "border border-border bg-card"}`}>
      <div className={`h-[140px] bg-gradient-to-br ${video.thumbnailGradient} flex items-center justify-center text-4xl relative group cursor-pointer`}>
        <div className="w-14 h-14 rounded-full bg-primary-foreground/20 backdrop-blur flex items-center justify-center text-2xl text-primary-foreground group-hover:bg-primary-foreground/30 transition-colors">▶</div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-primary-foreground text-[11px] px-2 py-0.5 rounded font-mono">{video.duration}</div>
        {isFirst && (
          <div className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase bg-brand text-primary-foreground">
            🤖 AI Pick
          </div>
        )}
        <div className="absolute top-2 right-2 flex gap-1.5">
          <div className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase ${
            video.difficulty === "beginner" ? "bg-ek-green-pale text-ek-green" :
            video.difficulty === "intermediate" ? "bg-ek-amber-pale text-ek-amber" :
            "bg-ek-purple-pale text-ek-purple"
          }`}>
            {video.difficulty}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-bold font-mono tracking-[0.5px] ${
            video.provider === "EKLUVYA" ? "text-brand" :
            video.provider.includes("KHAN") ? "text-ek-green" :
            video.provider.includes("PHYSICS") ? "text-ek-blue" :
            "text-ek-purple"
          }`}>
            {video.provider}
          </span>
          <span className="text-[10px] text-ink-50 font-mono">· {video.providerType}</span>
          <div className="ml-auto flex items-center gap-1 text-[11px] text-ek-amber font-mono">⭐ {video.rating}</div>
        </div>
        <h4 className="text-sm font-bold mb-1 leading-tight">{video.title}</h4>
        <div className="text-[11px] text-ink-50 mb-3">{video.style} · {video.language}</div>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="h-1.5 flex-1 bg-surface-2 rounded-full overflow-hidden">
            <div className="h-full bg-ek-green rounded-full" style={{ width: `${video.confidence}%` }} />
          </div>
          <span className="text-[10px] font-mono font-semibold text-ek-green">{video.confidence}%</span>
        </div>

        {video.aiLabel && (
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-ai-1/10 text-ai-1 mb-3">
            🤖 {video.aiLabel}
          </div>
        )}

        {video.whyRecommended && (
          <p className="text-[11px] text-ink-50 leading-relaxed mb-3 bg-surface rounded-md p-2">{video.whyRecommended}</p>
        )}

        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-brand to-brand-light text-primary-foreground hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(232,65,10,0.35)] transition-all">
            ▶ Watch
          </button>
          <button
            className={`w-9 h-9 rounded-full flex items-center justify-center border text-sm transition-colors ${saved ? "bg-ek-amber-pale border-ek-amber text-ek-amber" : "border-border text-ink-50 hover:border-brand"}`}
            onClick={() => setSaved(!saved)}
          >
            {saved ? "★" : "☆"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TopicPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [sortMode, setSortMode] = useState<SortMode>("best");
  const [filterProvider, setFilterProvider] = useState<string | null>(null);

  // Find topic
  let foundTopic = null;
  let foundChapter = null;
  for (const ch of chapters) {
    const t = ch.topics.find(t => t.id === topicId);
    if (t) { foundTopic = t; foundChapter = ch; break; }
  }

  if (!foundTopic || !foundChapter) {
    return (
      <AppLayout title="Topic">
        <div className="text-center py-12">
          <div className="text-4xl mb-3">📚</div>
          <h2 className="font-heading text-xl font-bold mb-2">Topic not found</h2>
          <p className="text-ink-50 text-sm mb-4">The topic you're looking for doesn't exist.</p>
          <button className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-brand to-brand-light text-primary-foreground" onClick={() => navigate("/courses")}>
            Browse Courses
          </button>
        </div>
      </AppLayout>
    );
  }

  let videos = [...foundTopic.videos];
  if (filterProvider) videos = videos.filter(v => v.provider === filterProvider);
  if (sortMode === "duration") videos.sort((a, b) => a.durationSeconds - b.durationSeconds);
  else if (sortMode === "rating") videos.sort((a, b) => b.rating - a.rating);
  else if (sortMode === "difficulty") {
    const order = { beginner: 0, intermediate: 1, advanced: 2 };
    videos.sort((a, b) => order[a.difficulty] - order[b.difficulty]);
  }

  const uniqueProviders = Array.from(new Set(foundTopic.videos.map(v => v.provider)));

  return (
    <AppLayout title={foundTopic.name}>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[11px] font-mono text-ink-50 mb-4">
        <span className="cursor-pointer hover:text-brand" onClick={() => navigate("/courses")}>Courses</span>
        <span>›</span>
        <span className="cursor-pointer hover:text-brand" onClick={() => navigate("/courses")}>Mathematics</span>
        <span>›</span>
        <span className="cursor-pointer hover:text-brand" onClick={() => navigate("/courses")}>Ch. {foundChapter.number}: {foundChapter.name}</span>
        <span>›</span>
        <span className="text-brand font-semibold">{foundTopic.name}</span>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-6">
        {/* Main Content */}
        <div>
          {/* Topic Header */}
          <div className="bg-card border border-border rounded-xl p-6 mb-5">
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono ${
                foundTopic.difficulty === "beginner" ? "bg-ek-green-pale text-ek-green" :
                foundTopic.difficulty === "intermediate" ? "bg-ek-amber-pale text-ek-amber" :
                "bg-ek-purple-pale text-ek-purple"
              }`}>
                {foundTopic.difficulty}
              </span>
              {foundTopic.mastery > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold font-mono bg-ai-1/10 text-ai-1">
                  🤖 {foundTopic.mastery}% mastery
                </span>
              )}
            </div>
            <h1 className="font-heading text-2xl font-extrabold mb-2">{foundTopic.name}</h1>
            <p className="text-sm text-ink-50 leading-relaxed">{foundTopic.description}</p>
          </div>

          {/* AI Recommendation Banner */}
          <div className="bg-gradient-to-r from-ai-1/[0.07] to-ai-2/[0.04] border border-ai-1/[0.18] rounded-lg p-3 flex gap-3 items-center mb-5">
            <span className="text-lg">🤖</span>
            <div>
              <div className="text-[12px] font-bold text-ai-1 mb-0.5">AI Recommendation</div>
              <div className="text-[11px] text-ink-80">
                Based on your learning style, we recommend starting with the <strong>Ekluvya</strong> video — step-by-step whiteboard approach has the highest completion rate for similar learners.
              </div>
            </div>
          </div>

          {/* Sort & Filter */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold text-ink-50">Sort:</span>
            {(["best", "duration", "rating", "difficulty"] as SortMode[]).map(m => (
              <button key={m} onClick={() => setSortMode(m)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors ${sortMode === m ? "bg-brand text-primary-foreground" : "bg-card border border-border text-ink-50 hover:border-brand"}`}>
                {m === "best" ? "Best Match" : m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs font-semibold text-ink-50">Provider:</span>
              <button onClick={() => setFilterProvider(null)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${!filterProvider ? "bg-brand text-primary-foreground" : "bg-card border border-border text-ink-50"}`}>
                All
              </button>
              {uniqueProviders.map(p => (
                <button key={p} onClick={() => setFilterProvider(p)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${filterProvider === p ? "bg-brand text-primary-foreground" : "bg-card border border-border text-ink-50"}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-2 gap-4">
            {videos.map((v, i) => (
              <VideoCard key={v.id} video={v} isFirst={i === 0 && sortMode === "best"} />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Progress */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-bold mb-3">Your Progress</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[12px] font-semibold mb-1">
                  <span>Topic Mastery</span>
                  <span className="text-brand">{foundTopic.mastery}%</span>
                </div>
                <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand to-brand-light rounded-full" style={{ width: `${foundTopic.mastery}%` }} />
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-full text-xs font-semibold border border-ek-green bg-ek-green-pale text-ek-green">✓ Mark Complete</button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-bold mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold border border-ek-blue bg-ek-blue-pale text-ek-blue hover:bg-ek-blue hover:text-primary-foreground transition-colors">🎯 Quick Test · 5 Questions</button>
              <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold border border-ek-purple bg-ek-purple-pale text-ek-purple hover:bg-ek-purple hover:text-primary-foreground transition-colors">🃏 Flashcards · 8 Cards</button>
              <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold border border-ek-green bg-ek-green-pale text-ek-green hover:bg-ek-green hover:text-primary-foreground transition-colors">🗺️ Mind Map</button>
              <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold border border-ek-amber bg-ek-amber-pale text-ek-amber hover:bg-ek-amber hover:text-primary-foreground transition-colors">🤖 AI Cornell Notes</button>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-bold mb-3">📓 My Notes</h3>
            <textarea className="w-full h-24 bg-surface rounded-lg p-3 text-xs border border-border outline-none resize-none focus:border-brand transition-colors" placeholder="Type your notes here..." />
            <button className="mt-2 w-full py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-brand to-brand-light text-primary-foreground">Save Note</button>
          </div>

          {/* Next Step */}
          <div className="bg-gradient-to-br from-ink to-ink-80 rounded-xl p-5 text-primary-foreground">
            <div className="font-mono text-[10px] tracking-[1.5px] uppercase text-primary-foreground/40 mb-2">🧭 Up Next</div>
            <h3 className="text-sm font-bold mb-1">Completing the Square</h3>
            <p className="text-[11px] text-primary-foreground/50 mb-3">Complete this topic to unlock the next one in your learning path.</p>
            <button className="w-full py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-brand to-brand-light text-primary-foreground" onClick={() => navigate("/learning-path")}>
              View Learning Path →
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
