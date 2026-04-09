import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { chapters } from "@/data/mockData";

interface ChapterVideo {
  id: string;
  title: string;
  duration: string;
  quizScore?: number;
  status: "done" | "review" | "watching" | "locked";
  section: string;
  sectionNumber: string;
  boardWeightage?: number;
}

function getChapterVideos(chapterNumber: number, chapterName: string): { sections: { number: string; title: string; videoCount: number; totalMin: number; videos: ChapterVideo[] }[] } {
  const chapter = chapters.find(c => c.number === chapterNumber);
  if (!chapter) return { sections: [] };

  const sections = chapter.topics.map((topic, ti) => {
    const sectionNum = `${chapterNumber}.${ti + 1}`;
    const videos: ChapterVideo[] = topic.videos.map((v, vi) => {
      let status: ChapterVideo["status"] = "locked";
      if (topic.status === "completed") status = vi === topic.videos.length - 1 && topic.mastery < 85 ? "review" : "done";
      else if (topic.status === "in-progress") status = vi === 0 ? "done" : vi === 1 ? "watching" : "locked";

      return {
        id: v.id,
        title: `${topic.name}${vi === 0 ? "" : vi === 1 ? " — Worked Examples" : vi === 2 ? " — Quick Revision" : " — Exam Practice"}`,
        duration: v.duration,
        quizScore: status === "done" ? 70 + Math.floor(Math.random() * 25) : status === "review" ? 74 : undefined,
        status,
        section: topic.name,
        sectionNumber: sectionNum,
        boardWeightage: ti === 0 ? 8 : undefined,
      };
    });

    const totalMin = topic.videos.reduce((a, v) => a + Math.round(v.durationSeconds / 60), 0);
    return {
      number: ti > 0 ? `${chapterNumber}.${ti + 1}-${chapterNumber}.${ti + 1}` : `${chapterNumber}.${ti + 1}`,
      title: topic.name,
      videoCount: videos.length,
      totalMin,
      videos,
    };
  });

  return { sections };
}

function StatusBadge({ status }: { status: ChapterVideo["status"] }) {
  const styles = {
    done: "text-ek-green",
    review: "text-brand",
    watching: "text-ek-green font-bold",
    locked: "text-ink-50",
  };
  const labels = { done: "Done", review: "Review", watching: "Watching", locked: "Locked" };
  return <span className={`text-xs font-semibold ${styles[status]}`}>{labels[status]}</span>;
}

function StatusIcon({ status }: { status: ChapterVideo["status"] }) {
  if (status === "done") return <div className="w-6 h-6 rounded-full bg-ek-green flex items-center justify-center text-primary-foreground text-xs">✓</div>;
  if (status === "review") return <div className="w-6 h-6 rounded-full bg-ek-green flex items-center justify-center text-primary-foreground text-xs">✓</div>;
  if (status === "watching") return <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center text-primary-foreground text-xs">▶</div>;
  return <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-ink-50 text-[10px]">🔒</div>;
}

export default function ChapterPage() {
  const { chapterNumber } = useParams();
  const navigate = useNavigate();
  const chNum = parseInt(chapterNumber || "4");
  const chapter = chapters.find(c => c.number === chNum);

  if (!chapter) {
    return (
      <AppLayout title="Chapter">
        <div className="text-center py-12">
          <h2 className="font-heading text-xl font-bold mb-2">Chapter not found</h2>
          <button className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-brand to-brand-light text-primary-foreground" onClick={() => navigate("/courses/ncert-10-maths")}>Back to Course</button>
        </div>
      </AppLayout>
    );
  }

  const { sections } = getChapterVideos(chNum, chapter.name);
  const currentVideoTitle = `${chapter.name} — Factorisation Method`;

  return (
    <AppLayout title="Now Learning">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[11px] font-mono text-ink-50 mb-5">
        <span className="cursor-pointer hover:text-brand" onClick={() => navigate("/courses")}>Courses</span>
        <span>›</span>
        <span className="cursor-pointer hover:text-brand" onClick={() => navigate("/courses/ncert-10-maths")}>Mathematics Class 10</span>
        <span>›</span>
        <span className="text-foreground font-semibold">Chapter {chNum} — {chapter.name}</span>
      </div>

      {/* Current Video Hero */}
      <div
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1a2e] to-[#16213e] mb-6 cursor-pointer group"
        onClick={() => {
          const firstWatching = sections.flatMap(s => s.videos).find(v => v.status === "watching");
          const firstAvailable = sections.flatMap(s => s.videos).find(v => v.status !== "locked");
          const videoToPlay = firstWatching || firstAvailable;
          if (videoToPlay) navigate(`/watch/${chNum}/${videoToPlay.id}`);
        }}
      >
        <div className="aspect-video max-h-[420px] flex flex-col items-center justify-center text-primary-foreground">
          <div className="w-20 h-20 rounded-full bg-brand/80 flex items-center justify-center text-3xl group-hover:bg-brand group-hover:scale-110 transition-all shadow-lg">
            ▶
          </div>
          <h2 className="font-heading text-xl font-bold mt-5">{currentVideoTitle}</h2>
          <p className="text-sm text-primary-foreground/60 mt-1">NCERT Class 10 · Mathematics · Chapter {chNum}</p>
        </div>
      </div>

      {/* Video Title + Meta */}
      <div className="mb-2">
        <h1 className="font-heading text-xl font-extrabold">{currentVideoTitle}</h1>
        <div className="flex items-center gap-3 mt-2 flex-wrap">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-muted text-foreground">NCERT Ch. {chNum}</span>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-brand/10 text-brand">Class 10</span>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-ek-green-pale text-ek-green">Board Weightage: 8 marks</span>
          <span className="text-xs text-ink-50">⏱ 18 min · Week 3, Video 2</span>
        </div>
      </div>

      {/* Nav buttons + actions */}
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

      {/* Chapter Outline */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="font-heading font-bold text-[15px]">Chapter {chNum} — {chapter.name}</h3>
          <span className="px-3 py-1 rounded-full text-[10px] font-bold font-mono bg-muted text-foreground">NCERT Aligned</span>
        </div>

        <div className="divide-y divide-border">
          {sections.map((section) => (
            <div key={section.number}>
              {/* Section header */}
              <div className="flex items-center justify-between px-5 py-3 bg-muted/30">
                <div className="flex items-center gap-2">
                  <span className="text-brand font-mono text-xs font-bold">{section.number}</span>
                  <span className="font-semibold text-sm">{section.title}</span>
                </div>
                <span className="text-[11px] text-ink-50 font-mono">{section.videoCount} videos · {section.totalMin} min</span>
              </div>

              {/* Videos */}
              {section.videos.map((video) => (
                <div
                  key={video.id}
                  className={`flex items-center gap-4 px-5 py-3.5 hover:bg-muted/20 transition-colors ${video.status === "watching" ? "bg-brand/[0.03]" : ""} ${video.status !== "locked" ? "cursor-pointer" : "opacity-60"}`}
                  onClick={() => {
                    if (video.status !== "locked") navigate(`/watch/${chNum}/${video.id}`);
                  }}
                >
                  <StatusIcon status={video.status} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">{video.title}</div>
                    <div className="text-[11px] text-ink-50 mt-0.5">
                      {video.duration}
                      {video.quizScore !== undefined && ` · ${video.quizScore}% quiz`}
                      {video.status === "watching" && " · In Progress"}
                      {video.status === "locked" && " · Unlocks after current video"}
                      {video.boardWeightage && ` · High weightage: ${video.boardWeightage} marks`}
                    </div>
                  </div>
                  <StatusBadge status={video.status} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* AI Insight Banner */}
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
    </AppLayout>
  );
}
