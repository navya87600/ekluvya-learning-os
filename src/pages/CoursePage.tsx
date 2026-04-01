import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AppLayout } from "@/components/layout/AppLayout";
import { chapters, type Chapter, type Topic } from "@/data/mockData";

function TopicRow({ topic, chapterNumber, topicIndex }: { topic: Topic; chapterNumber: number; topicIndex: number }) {
  const navigate = useNavigate();
  const statusColors = {
    completed: { bg: "bg-ek-green", text: "text-ek-green", badge: "bg-ek-green-pale text-ek-green", icon: "✓" },
    "in-progress": { bg: "bg-brand", text: "text-brand", badge: "bg-ek-amber-pale text-ek-amber", icon: "▶" },
    locked: { bg: "bg-surface-2", text: "text-ink-50", badge: "bg-surface-2 text-ink-50", icon: "🔒" },
  };
  const s = statusColors[topic.status];

  return (
    <div
      className={`bg-card border rounded-lg overflow-hidden mb-3 transition-all ${
        topic.status === "locked" ? "opacity-60 border-border" :
        topic.status === "in-progress" ? "border-2 border-brand cursor-pointer hover:shadow-ek-md" :
        "border-border cursor-pointer hover:border-brand hover:shadow-ek-md"
      }`}
      onClick={() => topic.status !== "locked" && navigate(`/topic/${topic.id}`)}
    >
      <div className={`px-[18px] py-3.5 flex items-center gap-2.5 border-b ${
        topic.status === "in-progress" ? "bg-brand/[0.04] border-brand/[0.15]" : "bg-surface border-border"
      }`}>
        <div className={`${topic.status === "in-progress" ? "bg-brand text-primary-foreground" : topic.status === "completed" ? "bg-ek-green text-primary-foreground" : "bg-surface-2 text-ink-50"} font-heading font-extrabold text-xs px-2.5 py-0.5 rounded`}>
          {chapterNumber}.{topicIndex + 1}
        </div>
        <div className="text-[15px] font-bold">{topic.name}</div>
        {topic.status === "in-progress" && (
          <span className="ml-auto inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-[0.5px] uppercase bg-ai-1/[0.12] text-ai-1 border border-ai-1/25">
            ▶ Watching
          </span>
        )}
        {topic.status === "completed" && (
          <span className="ml-auto text-[10px] font-bold font-mono text-ek-green">✓ Complete</span>
        )}
        {topic.status === "locked" && (
          <span className="ml-auto text-[10px] bg-surface-2 text-ink-50 px-2 py-0.5 rounded font-semibold">Locked</span>
        )}
      </div>
      <div className="px-[18px] py-3">
        <p className="text-[13px] text-ink-50 leading-relaxed mb-3">{topic.description}</p>
        {topic.status !== "locked" && (
          <>
            <div className="font-mono text-[10px] font-bold text-ai-1 tracking-[1.5px] uppercase mb-2">
              📹 {topic.videos.length} Provider Videos — Choose Your Teaching Style
            </div>
            <div className="grid grid-cols-3 gap-2.5 mb-3">
              {topic.videos.slice(0, 3).map((v) => (
                <div key={v.id} className={`rounded-lg overflow-hidden transition-all hover:-translate-y-0.5 ${v.isRecommended ? "bg-brand/[0.04] border-2 border-brand" : "bg-surface border border-border hover:border-brand"}`}>
                  <div className={`h-[70px] bg-gradient-to-br ${v.thumbnailGradient} flex items-center justify-center text-2xl relative`}>
                    ▶
                    <div className="absolute bottom-1 right-1 bg-black/60 text-primary-foreground text-[9px] px-1.5 py-px rounded font-mono">{v.duration}</div>
                  </div>
                  <div className="p-2">
                    <div className={`text-[10px] font-bold font-mono mb-0.5 ${v.isRecommended ? "text-brand" : v.provider.includes("KHAN") ? "text-ek-green" : "text-ek-blue"}`}>
                      {v.provider} · {v.providerType}
                    </div>
                    <div className="text-[11.5px] font-semibold">{v.title.split("—")[1]?.trim() || v.title}</div>
                    <div className="text-[10px] text-ink-50">{v.style} · {v.language}</div>
                  </div>
                </div>
              ))}
            </div>
            {topic.mastery > 0 && (
              <div className="flex items-center gap-2 pt-3 border-t border-surface-2">
                <span className="text-[11px] font-mono font-semibold text-ai-1">🤖 AI: {topic.mastery}% mastery</span>
                <div className="flex gap-2 ml-auto">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-ek-blue bg-ek-blue-pale text-ek-blue">🎯 Quick Test</button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-ek-purple bg-ek-purple-pale text-ek-purple">🃏 Flashcards</button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-ek-green bg-ek-green-pale text-ek-green">🗺️ Mind Map</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ChapterAccordion({ chapter }: { chapter: Chapter }) {
  const [open, setOpen] = useState(chapter.number === 4);
  const completedTopics = chapter.topics.filter(t => t.status === "completed").length;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden mb-4 hover:shadow-ek transition-shadow">
      <div
        className="flex items-center gap-4 px-5 py-4 cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-heading font-extrabold text-sm flex-shrink-0 ${
          chapter.progress === 100 ? "bg-ek-green text-primary-foreground" :
          chapter.progress > 0 ? "bg-gradient-to-br from-brand to-brand-light text-primary-foreground" :
          "bg-surface-2 text-ink-50"
        }`}>
          {chapter.progress === 100 ? "✓" : chapter.number}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-bold leading-tight">Chapter {chapter.number}: {chapter.name}</h3>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[11px] text-ink-50 font-mono">{chapter.topicCount} topics</span>
            <span className="text-[11px] text-ink-50 font-mono">{completedTopics}/{chapter.topicCount} done</span>
            {chapter.progress > 0 && chapter.progress < 100 && (
              <span className="text-[11px] text-brand font-mono font-semibold">{chapter.progress}%</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {chapter.progress > 0 && (
            <div className="w-24 h-[5px] bg-surface-2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand to-brand-light rounded-full transition-all" style={{ width: `${chapter.progress}%` }} />
            </div>
          )}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-ink-50"
          >
            ▾
          </motion.span>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-border pt-4">
              {chapter.topics.map((topic, j) => (
                <TopicRow key={topic.id} topic={topic} chapterNumber={chapter.number} topicIndex={j} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CoursePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const filtered = searchQuery
    ? chapters.filter(ch =>
        ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ch.topics.some(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : chapters;

  return (
    <AppLayout title="Courses">
      <div className="font-mono text-[10px] font-medium tracking-[2px] uppercase text-brand mb-1.5">NCERT CURRICULUM</div>
      <h1 className="font-heading text-2xl font-extrabold mb-1">Class 10 — Mathematics</h1>
      <p className="text-sm text-ink-50 mb-6">CBSE / State Board aligned · 15 chapters · {chapters.reduce((a, c) => a + c.topicCount, 0)} topics</p>

      {/* Search & Filters */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 flex-1 max-w-md">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search chapters and topics..."
            className="bg-transparent outline-none text-sm flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {["All", "In Progress", "Completed", "Locked"].map(f => (
            <button key={f} className="px-3 py-1.5 rounded-full text-xs font-semibold border border-border bg-card text-ink-50 hover:border-brand hover:text-brand transition-colors">
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-card border border-border rounded-lg p-4 mb-6 flex items-center gap-6">
        <div>
          <div className="text-sm font-bold">Overall Progress</div>
          <div className="text-[11px] text-ink-50 font-mono">3 chapters completed · 1 in progress</div>
        </div>
        <div className="flex-1 h-2 bg-surface-2 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand to-brand-light rounded-full" style={{ width: "26%" }} />
        </div>
        <span className="text-sm font-bold font-mono text-brand">26%</span>
      </div>

      {/* Chapter List */}
      {filtered.map(chapter => (
        <ChapterAccordion key={chapter.id} chapter={chapter} />
      ))}
    </AppLayout>
  );
}
