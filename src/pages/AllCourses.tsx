import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { courseCategories, courseFilters, type CourseCard, type CourseCategory } from "@/data/courseCatalog";

function CourseCardComponent({ course, onClick }: { course: CourseCard; onClick: () => void }) {
  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-ek-md hover:border-brand/40 transition-all group"
      onClick={onClick}
    >
      {/* Thumbnail area */}
      <div className={`h-[120px] bg-gradient-to-br ${course.gradient} flex items-center justify-center relative`}>
        <span className="text-4xl group-hover:scale-110 transition-transform">{course.emoji}</span>
        {course.badges?.map((badge) => (
          <span
            key={badge}
            className="absolute top-2.5 left-2.5 bg-brand text-primary-foreground text-[9px] font-bold font-mono tracking-[1px] uppercase px-2 py-0.5 rounded"
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="p-4">
        <span className={`text-[10px] font-bold font-mono tracking-[1.5px] uppercase ${course.subjectColor}`}>
          {course.subject}
        </span>
        <h3 className="text-sm font-bold mt-1 leading-snug">{course.title}</h3>
        <p className="text-[11px] text-ink-50 mt-1 leading-relaxed line-clamp-2">{course.description}</p>

        {/* Stats row */}
        <div className="flex items-center gap-3 mt-3 text-[10px] text-ink-50 font-mono">
          <span>🎬 {course.videos}</span>
          {course.providers && <span>{course.providers} providers</span>}
          {course.modules && <span>{course.modules} modules</span>}
          <span>⏱️ {course.duration}</span>
        </div>

        {/* Progress bar */}
        {course.progress !== undefined && course.progress > 0 && (
          <div className="mt-3">
            <div className="w-full h-1.5 bg-surface-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand to-brand-2 rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            {course.progressLabel && (
              <span className="text-[10px] text-ink-50 mt-1 block">{course.progressLabel}</span>
            )}
          </div>
        )}
        {course.progress === undefined && (
          <div className="mt-3">
            <div className="w-full h-1.5 bg-surface-2 rounded-full" />
            <span className="text-[10px] text-ink-50 mt-1 block">Not started</span>
          </div>
        )}
      </div>
    </div>
  );
}

function CategorySection({ category }: { category: CourseCategory }) {
  const navigate = useNavigate();

  return (
    <div className="mb-10">
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className={`${category.labelBg} ${category.labelColor} text-xs font-bold px-3 py-1 rounded-full`}>
            {category.label}
          </span>
          <h2 className="text-lg font-heading font-bold">{category.title}</h2>
        </div>
        <span className="text-xs text-ink-50 font-mono">{category.subtitle}</span>
      </div>

      {/* AI info banner for AI Era */}
      {category.id === "ai-era" && (
        <div className="flex items-center gap-2 bg-ai-1/[0.06] border border-ai-1/20 rounded-lg px-4 py-2.5 mb-4">
          <span>✨</span>
          <div>
            <span className="text-xs font-semibold text-ai-1">AI-built, AI-updated courses — refreshed every month</span>
            <p className="text-[11px] text-ink-50">These courses are generated and updated by Eklu AI based on latest research, student feedback, and industry trends. Learning paths included.</p>
          </div>
        </div>
      )}

      {/* Course cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {category.courses.map((course) => (
          <CourseCardComponent
            key={course.id}
            course={course}
            onClick={() => {
              if (course.id === "ncert-10-maths") {
                navigate("/courses/ncert-10-maths");
              } else {
                navigate("/courses/ncert-10-maths"); // placeholder — all go to same for now
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function AllCourses() {
  const [activeFilter, setActiveFilter] = useState("All Courses");

  const filtered = activeFilter === "All Courses"
    ? courseCategories
    : courseCategories.filter((cat) => {
        const map: Record<string, string[]> = {
          "School (6-10)": ["class-10", "class-9"],
          "Senior (11-12)": [],
          "JEE / NEET": ["jee-neet"],
          "AI Era Skills": ["ai-era"],
          "Money & Life": ["money-life"],
          "Survival": ["survival"],
          "Life Skills": ["money-life"],
        };
        return map[activeFilter]?.includes(cat.id);
      });

  return (
    <AppLayout title="All Courses">
      {/* Header */}
      <div className="font-mono text-[10px] font-medium tracking-[2px] uppercase text-brand mb-1">
        NCERT · CBSE · TS BOARD · ICSE ALIGNED
      </div>
      <h1 className="font-heading text-2xl font-extrabold mb-1">All Courses</h1>
      <p className="text-sm text-ink-50 mb-5">
        Every subject mapped chapter-by-chapter. Click any course to see the full NCERT index, subtopics, provider videos, tests, flashcards and mind maps.
      </p>

      {/* AI banner */}
      <div className="flex items-center gap-3 bg-brand/[0.05] border border-brand/20 rounded-lg px-4 py-3 mb-5">
        <span className="text-xl">🤖</span>
        <div>
          <span className="text-xs font-bold text-brand">Eklu AI — Recommendation Engine Active</span>
          <p className="text-[11px] text-ink-50">Courses personalised to your grade, board, and learning gaps. Every click, pause, and rewatch is tracked so AI can adapt your path in real time.</p>
        </div>
        <span className="ml-auto text-[10px] font-bold font-mono text-brand border border-brand/30 rounded-full px-3 py-1">PERSONALISED</span>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {courseFilters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              activeFilter === f
                ? "bg-brand text-primary-foreground border-brand"
                : "bg-card text-ink-50 border-border hover:border-brand hover:text-brand"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Category sections */}
      {filtered.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}
    </AppLayout>
  );
}
