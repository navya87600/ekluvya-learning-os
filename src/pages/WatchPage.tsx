import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { chapters } from "@/data/mockData";

type IntelTab = "chapters" | "keypoints" | "cornell";

const timeStamps = [
  { time: "0:00", label: "Recap: What we learned about standard form", active: true },
  { time: "2:30", label: "What is the Factorisation method?" },
  { time: "5:45", label: "Step-by-step: Example 1 — x²+5x+6=0" },
  { time: "9:20", label: "Example 2 — 2x²-x-3=0 (harder case)" },
  { time: "13:00", label: "Common mistakes & misconceptions" },
  { time: "15:30", label: "When factorisation doesn't work — preview" },
];

const keyPoints = [
  "Factorisation splits the middle term to find roots of a quadratic equation.",
  "Always check: product of roots = c/a, sum of roots = -b/a.",
  "Works best when the discriminant is a perfect square.",
  "If factorisation fails, move to Completing the Square or Quadratic Formula.",
  "Board tip: Show all steps for full 4-mark credit.",
];

const cornellNotes = [
  { cue: "What is factorisation?", note: "A method to solve ax²+bx+c=0 by expressing the quadratic as a product of two linear factors." },
  { cue: "Steps?", note: "1. Find two numbers whose product = a×c and sum = b. 2. Split middle term. 3. Factor by grouping." },
  { cue: "When does it fail?", note: "When the discriminant (b²-4ac) is not a perfect square — roots are irrational." },
];

export default function WatchPage() {
  const { chapterNumber, videoId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<IntelTab>("chapters");
  const [activeTimestamp, setActiveTimestamp] = useState(0);

  const chNum = parseInt(chapterNumber || "4");
  const chapter = chapters.find(c => c.number === chNum);

  if (!chapter) {
    return (
      <AppLayout title="Watch">
        <div className="text-center py-12">
          <h2 className="font-heading text-xl font-bold mb-2">Video not found</h2>
          <button className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-brand to-brand-light text-primary-foreground" onClick={() => navigate("/courses/ncert-10-maths")}>Back to Course</button>
        </div>
      </AppLayout>
    );
  }

  // Find the video
  let currentVideo = null;
  let currentTopic = null;
  for (const topic of chapter.topics) {
    const found = topic.videos.find(v => v.id === videoId);
    if (found) { currentVideo = found; currentTopic = topic; break; }
  }

  if (!currentVideo) {
    currentVideo = chapter.topics[0]?.videos[0];
    currentTopic = chapter.topics[0];
  }

  const videoTitle = currentVideo ? `${chapter.name} — Factorisation Method` : "Video";

  return (
    <AppLayout title="Now Learning">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[11px] font-mono text-ink-50 mb-4">
        <span className="cursor-pointer hover:text-brand" onClick={() => navigate("/courses")}>Courses</span>
        <span>›</span>
        <span className="cursor-pointer hover:text-brand" onClick={() => navigate("/courses/ncert-10-maths")}>Mathematics Class 10</span>
        <span>›</span>
        <span className="cursor-pointer hover:text-brand" onClick={() => navigate(`/chapter/${chNum}`)}>Chapter {chNum} — {chapter.name}</span>
      </div>

      <div className="grid grid-cols-[1fr_340px] gap-5">
        {/* Video Player Area */}
        <div>
          {/* Player */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-[#16213e] aspect-video flex flex-col items-center justify-center group cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-brand/80 flex items-center justify-center text-3xl group-hover:bg-brand group-hover:scale-110 transition-all shadow-lg text-primary-foreground">
              ▶
            </div>
            <h2 className="font-heading text-lg font-bold mt-4 text-primary-foreground">{videoTitle}</h2>
            <p className="text-sm text-primary-foreground/50 mt-1">NCERT Class 10 · Mathematics · Chapter {chNum}.3</p>
          </div>

          {/* Video Title + Meta */}
          <div className="mt-5">
            <h1 className="font-heading text-xl font-extrabold">{videoTitle}</h1>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-muted text-foreground">NCERT Ch. {chNum}</span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-brand/10 text-brand">Class 10</span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-ek-green-pale text-ek-green">Board Weightage: 8 marks</span>
              <span className="text-xs text-ink-50">⏱ 18 min · Week 3, Video 2</span>
            </div>
          </div>

          {/* Nav + Actions */}
          <div className="flex items-center justify-between mt-4 mb-6">
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-full text-xs font-semibold border border-border text-ink-50 hover:border-brand transition-colors">← Previous</button>
              <button className="px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r from-brand to-brand-light text-primary-foreground">Next Video →</button>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-xs font-semibold text-ink-50 hover:text-brand transition-colors flex items-center gap-1.5">📌 Bookmark</button>
              <button className="text-xs font-semibold text-ink-50 hover:text-brand transition-colors flex items-center gap-1.5">📓 My Notes</button>
              <button className="text-xs font-semibold text-ink-50 hover:text-brand transition-colors flex items-center gap-1.5">⬇ Download</button>
            </div>
          </div>

          {/* Chapter Outline Below */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h3 className="font-heading font-bold text-[15px]">Chapter {chNum} — {chapter.name}</h3>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold font-mono bg-muted text-foreground">NCERT Aligned</span>
            </div>
            <div className="divide-y divide-border">
              {chapter.topics.map((topic, ti) => {
                const sectionNum = `${chNum}.${ti + 1}`;
                return (
                  <div key={topic.id}>
                    <div className="flex items-center justify-between px-5 py-3 bg-muted/30">
                      <div className="flex items-center gap-2">
                        <span className="text-brand font-mono text-xs font-bold">{sectionNum}</span>
                        <span className="font-semibold text-sm">{topic.name}</span>
                      </div>
                      <span className="text-[11px] text-ink-50 font-mono">{topic.videos.length} videos · {Math.round(topic.videos.reduce((a, v) => a + v.durationSeconds, 0) / 60)} min</span>
                    </div>
                    {topic.videos.map((v, vi) => {
                      const isCurrentVideo = v.id === videoId;
                      let status: string = "locked";
                      if (topic.status === "completed") status = "done";
                      else if (topic.status === "in-progress") status = vi === 0 ? "done" : vi === 1 ? "watching" : "locked";

                      return (
                        <div
                          key={v.id}
                          className={`flex items-center gap-4 px-5 py-3 hover:bg-muted/20 transition-colors ${isCurrentVideo ? "bg-brand/[0.05] border-l-2 border-brand" : ""} ${status !== "locked" ? "cursor-pointer" : "opacity-60"}`}
                          onClick={() => { if (status !== "locked") navigate(`/watch/${chNum}/${v.id}`); }}
                        >
                          {status === "done" ? (
                            <div className="w-6 h-6 rounded-full bg-ek-green flex items-center justify-center text-primary-foreground text-xs flex-shrink-0">✓</div>
                          ) : status === "watching" ? (
                            <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center text-primary-foreground text-xs flex-shrink-0">▶</div>
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-ink-50 text-[10px] flex-shrink-0">🔒</div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className={`text-sm ${isCurrentVideo ? "font-bold" : "font-semibold"}`}>
                              {topic.name}{vi > 0 ? ` — ${vi === 1 ? "Worked Examples" : vi === 2 ? "Quick Revision" : "Exam Practice"}` : ""}
                            </div>
                            <div className="text-[11px] text-ink-50 mt-0.5">
                              {v.duration}
                              {status === "watching" && " · In Progress"}
                              {status === "locked" && " · Unlocks after current video"}
                            </div>
                          </div>
                          <span className={`text-xs font-semibold ${
                            status === "done" ? "text-ek-green" :
                            status === "watching" ? "text-ek-green font-bold" :
                            status === "review" ? "text-brand" : "text-ink-50"
                          }`}>
                            {status === "done" ? "Done" : status === "watching" ? "Watching" : status === "review" ? "Review" : "Locked"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* AI Insight */}
            <div className="mx-5 my-4 rounded-lg bg-brand/[0.05] border border-brand/20 p-4 flex items-start gap-3">
              <span className="text-2xl">🤖</span>
              <div>
                <div className="text-sm font-bold text-brand">AI noticed you rewound the Factorisation section 3 times</div>
                <p className="text-xs text-ink-50 mt-0.5">
                  Struggling here? We found a simpler explanation for this exact concept.{" "}
                  <span className="text-brand font-semibold cursor-pointer hover:underline">Watch the alternative video →</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar — Video Intelligence */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a2e] text-primary-foreground">
              <span className="text-sm font-bold flex items-center gap-2">🧠 Video Intelligence</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono bg-brand text-primary-foreground">AI LIVE</span>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border">
              {(["chapters", "keypoints", "cornell"] as IntelTab[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
                    activeTab === tab ? "text-brand border-b-2 border-brand" : "text-ink-50 hover:text-foreground"
                  }`}
                >
                  {tab === "chapters" ? "Chapters" : tab === "keypoints" ? "Key Points" : "Cornell Notes"}
                </button>
              ))}
            </div>

            <div className="p-4">
              {activeTab === "chapters" && (
                <div>
                  <div className="text-[10px] font-mono text-ink-50 tracking-widest uppercase mb-3">AI GENERATED · CLICK TO JUMP</div>
                  <div className="space-y-1">
                    {timeStamps.map((ts, i) => (
                      <div
                        key={i}
                        onClick={() => setActiveTimestamp(i)}
                        className={`flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${
                          activeTimestamp === i ? "bg-brand/[0.08] border border-brand/20" : "hover:bg-muted/50"
                        }`}
                      >
                        <span className={`text-[11px] font-mono font-bold flex-shrink-0 px-1.5 py-0.5 rounded ${
                          activeTimestamp === i ? "bg-brand text-primary-foreground" : "bg-muted text-ink-50"
                        }`}>
                          {ts.time}
                        </span>
                        <span className="text-xs leading-relaxed">{ts.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "keypoints" && (
                <div>
                  <div className="text-[10px] font-mono text-ink-50 tracking-widest uppercase mb-3">AI EXTRACTED KEY POINTS</div>
                  <div className="space-y-3">
                    {keyPoints.map((point, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-brand/10 flex items-center justify-center text-[10px] font-bold text-brand flex-shrink-0 mt-0.5">{i + 1}</div>
                        <p className="text-xs leading-relaxed text-foreground">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "cornell" && (
                <div>
                  <div className="text-[10px] font-mono text-ink-50 tracking-widest uppercase mb-3">AI CORNELL NOTES</div>
                  <div className="space-y-3">
                    {cornellNotes.map((cn, i) => (
                      <div key={i} className="bg-muted/30 rounded-lg p-3 border border-border">
                        <div className="text-[10px] font-bold font-mono text-brand mb-1">CUE</div>
                        <div className="text-xs font-semibold mb-2">{cn.cue}</div>
                        <div className="text-[10px] font-bold font-mono text-ink-50 mb-1">NOTE</div>
                        <div className="text-xs text-ink-50 leading-relaxed">{cn.note}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-xl p-4">
            <h3 className="text-sm font-bold mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold border border-ek-blue bg-ek-blue-pale text-ek-blue hover:bg-ek-blue hover:text-primary-foreground transition-colors">🎯 Quick Test · 5 Questions</button>
              <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold border border-ek-purple bg-ek-purple-pale text-ek-purple hover:bg-ek-purple hover:text-primary-foreground transition-colors">🃏 Flashcards</button>
              <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold border border-ek-green bg-ek-green-pale text-ek-green hover:bg-ek-green hover:text-primary-foreground transition-colors">🗺️ Mind Map</button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
