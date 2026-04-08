import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";

interface Note {
  id: string;
  subject: string;
  subjectColor: string;
  chapter: string;
  title: string;
  date: string;
  cueCount: number;
  noteCount: number;
  preview: string;
  borderColor: string;
  aiGenerated?: boolean;
}

const notes: Note[] = [
  {
    id: "n1",
    subject: "Mathematics",
    subjectColor: "bg-ek-blue-pale text-ek-blue",
    chapter: "Chapter 4",
    title: "Quadratic Equations — Factorisation Method",
    date: "Today",
    cueCount: 3,
    noteCount: 3,
    preview: "Factorisation works when D is a perfect square. Split middle term using ac & b. Vieta's formulas for root shortcuts in MCQs...",
    borderColor: "border-brand",
    aiGenerated: true,
  },
  {
    id: "n2",
    subject: "Mathematics",
    subjectColor: "bg-ek-blue-pale text-ek-blue",
    chapter: "Chapter 3",
    title: "Pair of Linear Equations — Graphical Method",
    date: "Yesterday",
    cueCount: 4,
    noteCount: 4,
    preview: "Two linear equations form two lines. Unique solution = lines intersect. No solution = parallel lines. Infinite = same line...",
    borderColor: "border-ek-blue",
  },
  {
    id: "n3",
    subject: "Science",
    subjectColor: "bg-ek-green-pale text-ek-green",
    chapter: "Chapter 3",
    title: "Metals and Non-Metals — Properties",
    date: "2 days ago",
    cueCount: 5,
    noteCount: 5,
    preview: "Metals: lustrous, malleable, ductile, good conductors. Exceptions: Mercury is liquid metal. Non-metals: dull, brittle...",
    borderColor: "border-ek-green",
  },
  {
    id: "n4",
    subject: "English",
    subjectColor: "bg-ek-amber-pale text-ek-amber",
    chapter: "Lesson 12",
    title: "First Flight — Fire and Ice",
    date: "3 days ago",
    cueCount: 3,
    noteCount: 4,
    preview: "Robert Frost's poem explores desire and hatred as forces of destruction. 'Fire' = desire/passion. 'Ice' = hatred/coldness...",
    borderColor: "border-ek-amber",
  },
  {
    id: "n5",
    subject: "Social Science",
    subjectColor: "bg-ek-purple-pale text-ek-purple",
    chapter: "Chapter 2",
    title: "Nationalism in India — Key Movements",
    date: "4 days ago",
    cueCount: 6,
    noteCount: 5,
    preview: "Non-Cooperation Movement (1920) → Civil Disobedience (1930) → Quit India (1942). Gandhiji's Satyagraha philosophy...",
    borderColor: "border-ek-purple",
  },
  {
    id: "n6",
    subject: "Mathematics",
    subjectColor: "bg-ek-blue-pale text-ek-blue",
    chapter: "Chapter 1",
    title: "Real Numbers — Euclid's Division Lemma",
    date: "1 week ago",
    cueCount: 3,
    noteCount: 3,
    preview: "For any two positive integers a and b, there exist unique integers q and r such that a = bq + r, where 0 ≤ r < b...",
    borderColor: "border-ek-blue",
    aiGenerated: true,
  },
];

const filterOptions = ["All Subjects", "Mathematics", "Science", "English", "Social Science"];

export default function NotesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Subjects");

  const filtered = notes.filter((n) => {
    const matchSearch = !searchQuery || n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = activeFilter === "All Subjects" || n.subject === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <AppLayout title="My Cornell Notes">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-mono text-[10px] font-medium tracking-[2px] uppercase text-brand mb-1">My Cornell Notes Library</div>
          <h1 className="font-heading text-2xl font-extrabold">All Notes</h1>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 min-w-[200px]">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search Notes"
              className="bg-transparent outline-none text-sm flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-brand to-brand-light text-primary-foreground hover:-translate-y-0.5 hover:shadow-ek-lg transition-all">
            + New Note
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {filterOptions.map((f) => (
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

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((note) => (
          <div
            key={note.id}
            className="bg-card border border-border rounded-xl p-5 cursor-pointer hover:shadow-ek-md hover:border-brand/30 transition-all"
            onClick={() => navigate("/topic/t-4-2")}
          >
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className={`text-[10px] font-bold font-mono tracking-[1px] uppercase px-2.5 py-1 rounded-full ${note.subjectColor}`}>
                {note.subject}
              </span>
              <span className="text-[10px] font-bold font-mono tracking-[1px] uppercase px-2.5 py-1 rounded-full bg-secondary text-ink-80">
                {note.chapter}
              </span>
              {note.aiGenerated && (
                <span className="text-[9px] font-bold font-mono tracking-[1px] uppercase px-2.5 py-1 rounded-full bg-brand/10 text-brand ml-auto">
                  AI Generated
                </span>
              )}
            </div>

            <h3 className="text-[15px] font-bold text-foreground mb-1 leading-snug">{note.title}</h3>
            <div className="text-[12px] text-ink-50 font-mono mb-3">
              {note.date} · {note.cueCount} cue questions · {note.noteCount} note entries
            </div>

            <div className={`bg-secondary rounded-lg p-3 text-[12px] text-ink-80 leading-relaxed border-l-[3px] ${note.borderColor}`}>
              {note.preview}
            </div>

            <div className="flex gap-2 mt-3">
              <button className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-border bg-card text-ink-50 hover:border-brand hover:text-brand transition-colors">
                ✏️ Edit
              </button>
              <button className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-border bg-card text-ink-50 hover:border-brand hover:text-brand transition-colors">
                📤 Share
              </button>
              <button className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-border bg-card text-ink-50 hover:border-brand hover:text-brand transition-colors">
                📄 PDF
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-ink-50">
          <div className="text-4xl mb-3">📓</div>
          <div className="font-heading text-base font-bold text-ink-80 mb-1">No notes found</div>
          <div className="text-sm">Try adjusting your search or filter.</div>
        </div>
      )}
    </AppLayout>
  );
}
