import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";

interface Post {
  id: string;
  author: string;
  class: string;
  avatar: string;
  avatarGradient: string;
  time: string;
  type: "Doubt" | "Tip" | "Discussion";
  typeColor: string;
  body: string;
  likes: number;
  replies: number;
  liked?: boolean;
  aiHint?: string;
  teacherReply?: { name: string; text: string };
  attachment?: { title: string; meta: string };
}

const posts: Post[] = [
  {
    id: "p1",
    author: "Priya Kiran",
    class: "Class 10B",
    avatar: "P",
    avatarGradient: "from-ek-blue to-[hsl(214,78%,30%)]",
    time: "2 hours ago",
    type: "Doubt",
    typeColor: "bg-brand/10 text-brand",
    body: "I'm stuck on splitting the middle term for 2x²−x−3. I found ac = -6 and b = -1, but I can't find two numbers that multiply to -6 AND add to -1. Can someone help? 😅",
    likes: 12,
    replies: 3,
    liked: true,
    attachment: {
      title: "Factorisation Method — Ekluvya Class 10 Maths Ch. 4.3",
      meta: "Linked from 9:20 — \"Example 2\"",
    },
    aiHint: "Great question, Priya! Before I tell you the answer — what are all the factor pairs of 6? List them out (both positive and negative). Which pair has a difference that gives -1 when combined correctly? 🤔",
    teacherReply: {
      name: "Ms. Lakshmi",
      text: "Priya, the numbers are **-3 and +2**. They multiply to -6 ✓ and add to -1 ✓. So: 2x²−3x+2x−3 = x(2x−3)+1(2x−3) = (x+1)(2x−3). Try verifying by FOIL! 🙌",
    },
  },
  {
    id: "p2",
    author: "Rohan Mehta",
    class: "Class 10A",
    avatar: "R",
    avatarGradient: "from-ek-green to-[hsl(155,60%,25%)]",
    time: "Yesterday",
    type: "Tip",
    typeColor: "bg-ek-green-pale text-ek-green",
    body: "PRO TIP for board exams 🔥: Don't waste time factorising if you can't spot it in 15 seconds. Jump straight to the Quadratic Formula — it ALWAYS works. Save factorisation for when numbers are clean. Saved me 8 marks in mock test!",
    likes: 48,
    replies: 12,
    liked: true,
  },
  {
    id: "p3",
    author: "Sneha Verma",
    class: "Class 10B",
    avatar: "S",
    avatarGradient: "from-ek-purple to-[hsl(265,60%,35%)]",
    time: "2 days ago",
    type: "Discussion",
    typeColor: "bg-ek-purple-pale text-ek-purple",
    body: "Just finished Ch. 4! 🎉 One question though — when discriminant is negative (D < 0), the textbook says \"no real roots\". But my JEE material says it has complex roots? Are we expected to know complex numbers for Class 10 boards? Confused.",
    likes: 22,
    replies: 8,
  },
];

const leaderboard = [
  { rank: 1, name: "Priya K.", class: "Class 10B", xp: "3,240", color: "from-ek-amber to-[hsl(30,90%,30%)]", rankColor: "text-ek-amber" },
  { rank: 2, name: "Sneha V.", class: "Class 10B", xp: "2,980", color: "from-ek-purple to-[hsl(265,60%,35%)]", rankColor: "text-ink-50" },
  { rank: 4, name: "You (Arjun)", class: "Class 10B", xp: "2,840", color: "from-brand to-brand-light", rankColor: "text-brand", highlight: true },
  { rank: 3, name: "Rohan M.", class: "Class 10A", xp: "2,760", color: "from-ek-green to-[hsl(155,60%,25%)]", rankColor: "text-ink-50" },
];

const trending = [
  { tag: "Maths", tagColor: "bg-ek-blue-pale text-ek-blue", title: "Discriminant shortcut for MCQs", count: "48 posts · 240 likes" },
  { tag: "Science", tagColor: "bg-ek-green-pale text-ek-green", title: "Reactivity series memory trick", count: "32 posts · 180 likes" },
  { tag: "English", tagColor: "bg-ek-amber-pale text-ek-amber", title: "Fire and Ice poem — symbolism", count: "24 posts · 92 likes" },
  { tag: "SST", tagColor: "bg-ek-purple-pale text-ek-purple", title: "Nationalism movements comparison", count: "18 posts · 74 likes" },
];

const studyGroups = [
  { name: "Class 10B — Maths", members: 42, online: "Active now", bg: "bg-ek-blue-pale", color: "text-ek-blue" },
  { name: "JEE Foundation 2026", members: 128, online: "8 online", bg: "bg-ek-green-pale", color: "text-ek-green" },
  { name: "Board Exam Prep 2026", members: 342, online: "24 online", bg: "bg-secondary", color: "text-foreground" },
];

export default function CommunityPage() {
  const [postText, setPostText] = useState("");

  return (
    <AppLayout title="Community">
      <div className="mb-6">
        <div className="font-mono text-[10px] font-medium tracking-[2px] uppercase text-brand mb-1">Ekluvya Community</div>
        <h1 className="font-heading text-2xl font-extrabold mb-1">Learn Together</h1>
        <p className="text-sm text-ink-50">Discuss doubts, share notes, celebrate wins. Moderated by teachers. Safe for students.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Main Feed */}
        <div>
          {/* Composer */}
          <div className="bg-card border border-border rounded-xl p-4 mb-4">
            <div className="flex gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-sm font-bold text-primary-foreground flex-shrink-0 font-heading">A</div>
              <textarea
                rows={2}
                placeholder="Ask a doubt, share a trick, or start a discussion..."
                className="flex-1 bg-transparent outline-none text-sm resize-none border border-border rounded-lg p-3 focus:border-brand transition-colors"
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-border bg-card text-ink-50 hover:border-brand transition-colors">🏷️ Tag a chapter</button>
              <button className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-border bg-card text-ink-50 hover:border-brand transition-colors">📹 Attach video clip</button>
              <button className="px-3 py-1.5 rounded-full text-[11px] font-semibold border border-border bg-card text-ink-50 hover:border-brand transition-colors">📸 Upload image</button>
              <button className="ml-auto px-4 py-1.5 rounded-full text-[12px] font-semibold bg-gradient-to-r from-brand to-brand-light text-primary-foreground hover:-translate-y-0.5 transition-all">Post</button>
            </div>
          </div>

          {/* Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-card border border-border rounded-xl p-5 hover:shadow-ek transition-shadow">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${post.avatarGradient} flex items-center justify-center text-sm font-bold text-primary-foreground font-heading`}>
                    {post.avatar}
                  </div>
                  <div>
                    <div className="text-[13px] font-bold">{post.author} <span className="text-[11px] text-ink-50 font-normal">· {post.class}</span></div>
                    <div className="text-[11px] text-ink-50">{post.time}</div>
                  </div>
                  <span className={`text-[10px] font-bold font-mono tracking-[1px] px-2.5 py-1 rounded-full ml-auto ${post.typeColor}`}>{post.type}</span>
                </div>

                {/* Body */}
                <div className="text-[13px] text-ink-80 leading-relaxed mb-3">{post.body}</div>

                {/* Attachment */}
                {post.attachment && (
                  <div className="flex items-center gap-3 bg-secondary rounded-lg p-3 mb-3">
                    <span>📹</span>
                    <div>
                      <div className="text-[12px] font-semibold text-foreground">{post.attachment.title}</div>
                      <div className="text-[11px] text-ink-50 font-mono">{post.attachment.meta}</div>
                    </div>
                  </div>
                )}

                {/* AI Hint */}
                {post.aiHint && (
                  <div className="bg-secondary border border-border rounded-lg p-3 mb-3">
                    <div className="text-[10px] font-bold font-mono tracking-[1px] text-brand mb-1.5">🤖 AI HINT (Socratic Mode)</div>
                    <div className="text-[12px] text-ink-80 leading-relaxed">{post.aiHint}</div>
                  </div>
                )}

                {/* Teacher Reply */}
                {post.teacherReply && (
                  <>
                    <div className="text-[12px] text-ink-50 font-mono mb-2">Teacher replied 1 hour ago ↓</div>
                    <div className="bg-ek-amber-pale border border-ek-amber/15 rounded-lg p-3 mb-3">
                      <div className="text-[10px] font-bold font-mono tracking-[1px] text-ek-amber mb-1.5">🎓 TEACHER REPLY — {post.teacherReply.name}</div>
                      <div className="text-[12px] text-ink-80 leading-relaxed">{post.teacherReply.text}</div>
                    </div>
                  </>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 pt-2 border-t border-border">
                  <button className={`text-[12px] font-semibold transition-colors hover:text-brand ${post.liked ? "text-brand" : "text-ink-50"}`}>
                    ❤️ {post.likes} Likes
                  </button>
                  <button className="text-[12px] font-semibold text-ink-50 hover:text-brand transition-colors">💬 {post.replies} Replies</button>
                  <button className="text-[12px] font-semibold text-ink-50 hover:text-brand transition-colors">🔖 Save</button>
                  <button className="text-[12px] font-semibold text-ink-50 hover:text-brand transition-colors">📤 Share</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Leaderboard */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border font-bold text-[13px]">🏆 Weekly Leaderboard</div>
            <div className="p-4 space-y-3">
              {leaderboard.map((lb) => (
                <div key={lb.name} className={`flex items-center gap-3 ${lb.highlight ? "bg-brand/5 rounded-lg p-1.5 -mx-1.5" : ""}`}>
                  <div className={`text-[13px] font-extrabold w-5 text-center ${lb.rankColor}`}>{lb.rank}</div>
                  <div className={`w-[30px] h-[30px] rounded-full bg-gradient-to-br ${lb.color} flex items-center justify-center text-[12px] font-bold text-primary-foreground`}>
                    {lb.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-bold truncate">{lb.name}</div>
                    <div className="text-[10px] text-ink-50">{lb.class}</div>
                  </div>
                  <div className="text-[12px] font-bold text-brand font-mono">{lb.xp}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border font-bold text-[13px]">🔥 Trending This Week</div>
            <div className="p-4 space-y-3">
              {trending.map((t) => (
                <div key={t.title} className="flex items-start gap-3 cursor-pointer hover:bg-secondary rounded-lg p-1.5 -mx-1.5 transition-colors">
                  <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded-full flex-shrink-0 ${t.tagColor}`}>{t.tag}</span>
                  <div>
                    <div className="text-[12px] font-semibold leading-snug">{t.title}</div>
                    <div className="text-[10px] text-ink-50 font-mono">{t.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Study Groups */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border font-bold text-[13px]">👥 Study Groups</div>
            <div className="p-4 space-y-2.5">
              {studyGroups.map((g) => (
                <div key={g.name} className={`p-3 rounded-lg cursor-pointer ${g.bg}`}>
                  <div className={`text-[13px] font-bold ${g.color}`}>{g.name}</div>
                  <div className="text-[11px] text-ink-50 font-mono">{g.members} members · {g.online}</div>
                </div>
              ))}
              <button className="w-full px-3 py-2 rounded-full text-[11px] font-semibold border border-border bg-card text-ink-50 hover:border-brand hover:text-brand transition-colors">
                + Create Study Group
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
