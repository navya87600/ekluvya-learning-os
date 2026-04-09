import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { chapters, type Video } from "@/data/mockData";

type FilterTab = "all" | "ekluvya" | "khan" | "pw" | "unacademy";

function VideoThumbnailCard({ video, chapterNumber, topicName, index }: { video: Video; chapterNumber: number; topicName: string; index: number }) {
  const navigate = useNavigate();
  const isLocked = index > 5;

  return (
    <div
      className={`rounded-xl overflow-hidden border border-border bg-card hover:shadow-ek transition-all group ${isLocked ? "opacity-50" : "cursor-pointer hover:-translate-y-1"}`}
      onClick={() => { if (!isLocked) navigate(`/watch/${chapterNumber}/${video.id}`); }}
    >
      {/* Thumbnail */}
      <div className={`relative aspect-video bg-gradient-to-br ${video.thumbnailGradient} flex items-center justify-center`}>
        <div className="w-12 h-12 rounded-full bg-primary-foreground/20 backdrop-blur flex items-center justify-center text-xl text-primary-foreground group-hover:bg-primary-foreground/30 group-hover:scale-110 transition-all">
          {isLocked ? "🔒" : "▶"}
        </div>
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-primary-foreground text-[11px] px-2 py-0.5 rounded font-mono font-medium">
          {video.duration}
        </div>
        {/* Provider badge */}
        <div className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold font-mono uppercase ${
          video.provider === "EKLUVYA" ? "bg-brand text-primary-foreground" :
          video.provider.includes("KHAN") ? "bg-ek-green text-primary-foreground" :
          video.provider.includes("PHYSICS") ? "bg-ek-blue text-primary-foreground" :
          "bg-ek-purple text-primary-foreground"
        }`}>
          {video.provider}
        </div>
        {/* AI Pick */}
        {video.isRecommended && (
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-brand text-primary-foreground flex items-center gap-1">
            🤖 AI Pick
          </div>
        )}
        {/* Progress bar for in-progress */}
        {index === 4 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
            <div className="h-full bg-brand w-[45%]" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h4 className="text-[13px] font-bold leading-tight mb-1 line-clamp-2">
          {topicName}{index > 0 ? ` — ${video.title.split("—")[1]?.trim() || video.style}` : ""}
        </h4>
        <div className="flex items-center gap-2 text-[10px] text-ink-50 mb-1.5">
          <span className={`font-bold font-mono ${
            video.provider === "EKLUVYA" ? "text-brand" :
            video.provider.includes("KHAN") ? "text-ek-green" :
            video.provider.includes("PHYSICS") ? "text-ek-blue" :
            "text-ek-purple"
          }`}>
            {video.provider}
          </span>
          <span>·</span>
          <span>{video.style}</span>
          <span>·</span>
          <span>{video.language}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-ek-amber font-mono">⭐ {video.rating}</div>
          {video.aiLabel && (
            <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-ai-1/10 text-ai-1">{video.aiLabel}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ChapterPage() {
  const { chapterNumber } = useParams();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
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

  // Collect all videos across topics with topic context
  const allVideos = chapter.topics.flatMap((topic, ti) =>
    topic.videos.map((video, vi) => ({
      video,
      topicName: topic.name,
      globalIndex: ti * 4 + vi,
    }))
  );

  const filteredVideos = activeFilter === "all" ? allVideos :
    allVideos.filter(({ video }) => {
      if (activeFilter === "ekluvya") return video.provider === "EKLUVYA";
      if (activeFilter === "khan") return video.provider.includes("KHAN");
      if (activeFilter === "pw") return video.provider.includes("PHYSICS");
      if (activeFilter === "unacademy") return video.provider.includes("UNACADEMY");
      return true;
    });

  const totalVideos = allVideos.length;
  const totalDuration = Math.round(chapter.topics.reduce((a, t) => a + t.videos.reduce((b, v) => b + v.durationSeconds, 0), 0) / 60);

  const filterTabs: { key: FilterTab; label: string; color: string }[] = [
    { key: "all", label: `All (${totalVideos})`, color: "brand" },
    { key: "ekluvya", label: "Ekluvya", color: "brand" },
    { key: "khan", label: "Khan Academy", color: "ek-green" },
    { key: "pw", label: "PhysicsWallah", color: "ek-blue" },
    { key: "unacademy", label: "Unacademy", color: "ek-purple" },
  ];

  return (
    <AppLayout title="Videos">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[11px] font-mono text-ink-50 mb-5">
        <span className="cursor-pointer hover:text-brand" onClick={() => navigate("/courses")}>Courses</span>
        <span>›</span>
        <span className="cursor-pointer hover:text-brand" onClick={() => navigate("/courses/ncert-10-maths")}>Mathematics Class 10</span>
        <span>›</span>
        <span className="text-foreground font-semibold">Chapter {chNum} — {chapter.name}</span>
      </div>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-muted text-foreground">NCERT Ch. {chNum}</span>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-brand/10 text-brand">Class 10</span>
          {chapter.progress > 0 && (
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-ek-green-pale text-ek-green">{chapter.progress}% complete</span>
          )}
        </div>
        <h1 className="font-heading text-2xl font-extrabold mb-1">Chapter {chNum}: {chapter.name}</h1>
        <p className="text-sm text-ink-50">{totalVideos} videos · {totalDuration} min total · {chapter.topics.length} topics covered</p>
      </div>

      {/* Provider Filter Tabs */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {filterTabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveFilter(tab.key)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors ${
              activeFilter === tab.key
                ? "bg-brand text-primary-foreground"
                : "bg-card border border-border text-ink-50 hover:border-brand hover:text-brand"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* AI Recommendation */}
      <div className="bg-gradient-to-r from-ai-1/[0.07] to-ai-2/[0.04] border border-ai-1/[0.18] rounded-lg p-3 flex gap-3 items-center mb-5">
        <span className="text-lg">🤖</span>
        <div>
          <div className="text-[12px] font-bold text-ai-1 mb-0.5">AI Recommendation</div>
          <div className="text-[11px] text-ink-80">
            Start with the <strong>Ekluvya</strong> videos for step-by-step explanations, then use <strong>Khan Academy</strong> for visual reinforcement. Best learning path for your style.
          </div>
        </div>
      </div>

      {/* Video Grid — YouTube Thumbnail Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredVideos.map(({ video, topicName, globalIndex }) => (
          <VideoThumbnailCard
            key={video.id}
            video={video}
            chapterNumber={chNum}
            topicName={topicName}
            index={globalIndex}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">📹</div>
          <h3 className="font-heading text-lg font-bold mb-1">No videos from this provider</h3>
          <p className="text-sm text-ink-50">Try selecting a different provider filter.</p>
        </div>
      )}
    </AppLayout>
  );
}
