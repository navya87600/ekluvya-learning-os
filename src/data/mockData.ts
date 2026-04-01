export interface Topic {
  id: string;
  name: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  mastery: number;
  status: "completed" | "in-progress" | "locked";
  videos: Video[];
  prerequisites?: string[];
}

export interface Chapter {
  id: string;
  number: number;
  name: string;
  topicCount: number;
  progress: number;
  topics: Topic[];
}

export interface Video {
  id: string;
  provider: string;
  providerType: string;
  title: string;
  duration: string;
  durationSeconds: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  rating: number;
  confidence: number;
  language: string;
  style: string;
  thumbnailGradient: string;
  aiLabel?: string;
  isRecommended?: boolean;
  whyRecommended?: string;
}

export interface LearningPathStep {
  chapterNumber: number;
  chapterName: string;
  status: "completed" | "current" | "locked";
  mastery?: number;
  note?: string;
  progress?: number;
}

export const providers = [
  { id: "ekluvya", name: "Ekluvya", type: "INTERNAL", color: "brand" },
  { id: "khan", name: "Khan Academy", type: "PARTNER", color: "green" },
  { id: "pw", name: "PhysicsWallah", type: "PARTNER", color: "blue" },
  { id: "unacademy", name: "Unacademy", type: "PARTNER", color: "purple" },
  { id: "youtube", name: "YouTube Edu", type: "COMMUNITY", color: "red" },
];

const makeVideos = (topicName: string): Video[] => [
  {
    id: `v-${topicName}-1`,
    provider: "EKLUVYA",
    providerType: "INTERNAL",
    title: `${topicName} — Full Concept Explanation`,
    duration: "22 min",
    durationSeconds: 1320,
    difficulty: "beginner",
    rating: 4.8,
    confidence: 96,
    language: "English + Telugu",
    style: "Whiteboard",
    thumbnailGradient: "from-[#1a1a2e] to-[#16213e]",
    isRecommended: true,
    aiLabel: "Best for beginners",
    whyRecommended: "Highest completion rate among similar learners. Step-by-step approach with NCERT examples.",
  },
  {
    id: `v-${topicName}-2`,
    provider: "KHAN ACADEMY",
    providerType: "PARTNER",
    title: `${topicName} — Animated Visual Guide`,
    duration: "15 min",
    durationSeconds: 900,
    difficulty: "beginner",
    rating: 4.6,
    confidence: 91,
    language: "Hindi",
    style: "Animation",
    thumbnailGradient: "from-[#0f4c3a] to-[#1a7c5e]",
    aiLabel: "Visual learners",
    whyRecommended: "Uses animated diagrams. Great if you prefer visual explanations.",
  },
  {
    id: `v-${topicName}-3`,
    provider: "PHYSICSWALLAH",
    providerType: "PARTNER",
    title: `${topicName} — Quick Revision Capsule`,
    duration: "8 min",
    durationSeconds: 480,
    difficulty: "intermediate",
    rating: 4.5,
    confidence: 87,
    language: "English",
    style: "Fast-paced",
    thumbnailGradient: "from-[#1e3a5f] to-[#2d5f8a]",
    aiLabel: "Fast revision",
    whyRecommended: "Covers key points in under 10 minutes. Ideal for exam prep revision.",
  },
  {
    id: `v-${topicName}-4`,
    provider: "UNACADEMY",
    providerType: "PARTNER",
    title: `${topicName} — Exam-Focused Problem Solving`,
    duration: "28 min",
    durationSeconds: 1680,
    difficulty: "advanced",
    rating: 4.7,
    confidence: 89,
    language: "Hindi + English",
    style: "Problem-solving",
    thumbnailGradient: "from-[#2d1b69] to-[#5e1db0]",
    aiLabel: "Exam-focused",
    whyRecommended: "Covers board exam pattern questions. Previous year question walkthrough included.",
  },
];

const chapterTopics: Record<string, { name: string; desc: string; diff: Topic["difficulty"] }[]> = {
  "Real Numbers": [
    { name: "Euclid's Division Lemma", desc: "Statement and proof, applications to find HCF, Euclid's Division Algorithm", diff: "beginner" },
    { name: "Fundamental Theorem of Arithmetic", desc: "Prime factorisation, uniqueness, applications to LCM and HCF", diff: "beginner" },
    { name: "Irrational Numbers", desc: "Proof that √2 is irrational, generalisation to √p", diff: "intermediate" },
    { name: "Decimal Expansions of Rationals", desc: "Terminating and non-terminating recurring decimals", diff: "beginner" },
  ],
  "Polynomials": [
    { name: "Geometrical Meaning of Zeroes", desc: "Graphs of polynomials, number of zeroes from graph", diff: "beginner" },
    { name: "Relationship Between Zeroes and Coefficients", desc: "Sum and product of zeroes for quadratic and cubic polynomials", diff: "intermediate" },
    { name: "Division Algorithm for Polynomials", desc: "Dividing polynomials, verifying division algorithm, finding all zeroes", diff: "advanced" },
  ],
  "Pair of Linear Equations in Two Variables": [
    { name: "Graphical Method of Solution", desc: "Plotting lines, consistent/inconsistent systems, unique/infinite solutions", diff: "beginner" },
    { name: "Algebraic Methods — Substitution", desc: "Substitution method for solving pairs of linear equations", diff: "beginner" },
    { name: "Algebraic Methods — Elimination", desc: "Elimination method, comparing with substitution", diff: "intermediate" },
    { name: "Cross-Multiplication Method", desc: "Formula-based approach, solving complex word problems", diff: "advanced" },
    { name: "Equations Reducible to Linear Form", desc: "Non-linear equations that can be reduced, substitution tricks", diff: "advanced" },
  ],
  "Quadratic Equations": [
    { name: "Standard Form and Introduction", desc: "Definition ax²+bx+c=0, identifying quadratic equations, real-life examples", diff: "beginner" },
    { name: "Solution by Factorisation", desc: "Splitting middle term, factor theorem, solving by factorisation", diff: "intermediate" },
    { name: "Completing the Square", desc: "Completing the square technique, deriving the Quadratic Formula", diff: "intermediate" },
    { name: "Nature of Roots — Discriminant", desc: "D=b²−4ac, real/equal/imaginary roots, board exam 4-mark questions", diff: "advanced" },
  ],
  "Arithmetic Progressions": [
    { name: "Introduction to AP", desc: "Definition, common difference, examples from daily life", diff: "beginner" },
    { name: "nth Term of an AP", desc: "Formula aₙ = a + (n-1)d, finding terms and positions", diff: "beginner" },
    { name: "Sum of First n Terms", desc: "Sₙ = n/2[2a+(n-1)d], applications and word problems", diff: "intermediate" },
  ],
  "Triangles": [
    { name: "Similar Figures", desc: "Congruence vs similarity, similar polygons", diff: "beginner" },
    { name: "Similarity of Triangles", desc: "AA, SSS, SAS criteria for similarity", diff: "intermediate" },
    { name: "Pythagoras Theorem", desc: "Proof, converse, applications in coordinate geometry", diff: "intermediate" },
    { name: "Areas of Similar Triangles", desc: "Ratio of areas equals ratio of squares of sides", diff: "advanced" },
  ],
  "Coordinate Geometry": [
    { name: "Distance Formula", desc: "Distance between two points, applications", diff: "beginner" },
    { name: "Section Formula", desc: "Internal division, midpoint, centroid of triangle", diff: "intermediate" },
    { name: "Area of a Triangle", desc: "Using coordinates, collinearity condition", diff: "intermediate" },
  ],
  "Trigonometry": [
    { name: "Trigonometric Ratios", desc: "sin, cos, tan for acute angles, values at standard angles", diff: "beginner" },
    { name: "Trigonometric Identities", desc: "sin²θ + cos²θ = 1 and related identities, proofs", diff: "intermediate" },
    { name: "Complementary Angles", desc: "sin(90-θ) = cosθ and similar, simplification problems", diff: "intermediate" },
  ],
  "Applications of Trigonometry": [
    { name: "Heights and Distances", desc: "Angle of elevation and depression, real-world problems", diff: "intermediate" },
  ],
  "Circles": [
    { name: "Tangent to a Circle", desc: "Tangent properties, tangent from external point", diff: "intermediate" },
    { name: "Number of Tangents", desc: "Tangents from a point, length of tangent theorem", diff: "advanced" },
  ],
  "Constructions": [
    { name: "Division of a Line Segment", desc: "Dividing in given ratio using BPT", diff: "beginner" },
    { name: "Construction of Similar Triangles", desc: "Scale factor method, step-by-step construction", diff: "intermediate" },
    { name: "Tangent to a Circle Construction", desc: "Constructing tangents from external point", diff: "intermediate" },
  ],
  "Areas Related to Circles": [
    { name: "Perimeter and Area of a Circle", desc: "Review of πr², circumference, semi-circles", diff: "beginner" },
    { name: "Sector and Segment Areas", desc: "Area of sector θ/360 × πr², segment area", diff: "intermediate" },
    { name: "Combination of Figures", desc: "Shaded region problems, composite figures", diff: "advanced" },
  ],
  "Surface Areas and Volumes": [
    { name: "Combination of Solids", desc: "Surface area of combined shapes (cylinder+cone, etc.)", diff: "intermediate" },
    { name: "Conversion of Solids", desc: "Melting and reshaping problems, volume conservation", diff: "intermediate" },
    { name: "Frustum of a Cone", desc: "Volume and surface area formulas, applications", diff: "advanced" },
  ],
  "Statistics": [
    { name: "Mean of Grouped Data", desc: "Direct, assumed mean, and step-deviation methods", diff: "beginner" },
    { name: "Mode of Grouped Data", desc: "Modal class, mode formula, applications", diff: "intermediate" },
    { name: "Median of Grouped Data", desc: "Cumulative frequency, median formula, ogive", diff: "intermediate" },
  ],
  "Probability": [
    { name: "Classical Probability", desc: "Experimental vs theoretical, equally likely outcomes", diff: "beginner" },
    { name: "Problems on Probability", desc: "Coins, dice, cards problems, complementary events", diff: "intermediate" },
  ],
};

const chapterNames = [
  "Real Numbers", "Polynomials", "Pair of Linear Equations in Two Variables",
  "Quadratic Equations", "Arithmetic Progressions", "Triangles",
  "Coordinate Geometry", "Trigonometry", "Applications of Trigonometry",
  "Circles", "Constructions", "Areas Related to Circles",
  "Surface Areas and Volumes", "Statistics", "Probability",
];

export const chapters: Chapter[] = chapterNames.map((name, i) => {
  const topics = (chapterTopics[name] || []).map((t, j) => {
    const completed = i < 3 || (i === 3 && j === 0);
    const inProgress = i === 3 && j === 1;
    return {
      id: `t-${i + 1}-${j + 1}`,
      name: t.name,
      description: t.desc,
      difficulty: t.diff,
      mastery: completed ? 80 + Math.floor(Math.random() * 15) : inProgress ? 74 : 0,
      status: (completed ? "completed" : inProgress ? "in-progress" : "locked") as Topic["status"],
      videos: makeVideos(t.name),
    };
  });
  const completedTopics = topics.filter(t => t.status === "completed").length;
  return {
    id: `ch-${i + 1}`,
    number: i + 1,
    name,
    topicCount: topics.length,
    progress: topics.length > 0 ? Math.round((completedTopics / topics.length) * 100) : 0,
    topics,
  };
});

export const learningPathSteps: LearningPathStep[] = [
  { chapterNumber: 1, chapterName: "Real Numbers", status: "completed", mastery: 94 },
  { chapterNumber: 2, chapterName: "Polynomials", status: "completed", mastery: 88 },
  { chapterNumber: 3, chapterName: "Pair of Linear Equations", status: "completed", mastery: 81, note: "Word problems: review flagged" },
  { chapterNumber: 4, chapterName: "Quadratic Equations", status: "current", mastery: 74, progress: 74 },
  { chapterNumber: 5, chapterName: "Arithmetic Progressions", status: "locked" },
  { chapterNumber: 6, chapterName: "Triangles", status: "locked" },
  { chapterNumber: 7, chapterName: "Coordinate Geometry", status: "locked" },
];

export const userStats = {
  name: "Arjun",
  className: "Class 10",
  board: "CBSE",
  school: "St. Francis High School, Hyderabad",
  videosWatched: 42,
  quizAccuracy: 78,
  badgesEarned: 3,
  notesCreated: 12,
  streak: 7,
  xp: 2840,
  currentChapter: "Quadratic Equations",
  currentProgress: 74,
  videosLeft: 3,
};

export const weekDays = [
  { label: "M", done: true },
  { label: "T", done: true },
  { label: "W", done: true },
  { label: "T", done: true },
  { label: "F", done: true },
  { label: "S", done: true },
  { label: "S", today: true },
];

export const aiRecommendations = [
  {
    type: "warning",
    color: "amber",
    icon: "⚠",
    title: "Spaced Revision Due",
    description: "Linear Equations word problems (Ch. 3) — last practiced 8 days ago. 5 quick questions to cement memory.",
  },
  {
    type: "info",
    color: "blue",
    icon: "💡",
    title: "Alternative Explanation Available",
    description: "You rewound the Factorisation video 3x — a different teacher's explanation is available using visual area models.",
  },
  {
    type: "success",
    color: "green",
    icon: "🚀",
    title: "Express Lane Eligible",
    description: "Your Real Numbers score (94%) suggests you can skip the review module for Ch. 5 intro.",
  },
];

export const todaySession = [
  { icon: "🔢", title: "Factorisation — Worked Examples (Ch. 4)", meta: "18 min · Continue from 4:20" },
  { icon: "🎯", title: "Ch. 4 Mini Quiz — 5 questions", meta: "10 min · Formative check" },
  { icon: "🔄", title: "Spaced Review: Linear Equations (Ch. 3)", meta: "12 min · 5 quick recall questions" },
  { icon: "📓", title: "Review your Cornell Notes from yesterday", meta: "5 min · Active recall" },
];
