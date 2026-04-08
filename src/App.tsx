import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import AllCourses from "./pages/AllCourses";
import CoursePage from "./pages/CoursePage";
import TopicPage from "./pages/TopicPage";
import LearningPath from "./pages/LearningPath";
import NotesPage from "./pages/NotesPage";
import ReportsPage from "./pages/ReportsPage";
import CommunityPage from "./pages/CommunityPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/courses/:courseId" element={<CoursePage />} />
          <Route path="/topic/:topicId" element={<TopicPage />} />
          <Route path="/learning-path" element={<LearningPath />} />
          <Route path="/quiz" element={<Dashboard />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
