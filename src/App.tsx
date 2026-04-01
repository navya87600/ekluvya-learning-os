import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import CoursePage from "./pages/CoursePage";
import TopicPage from "./pages/TopicPage";
import LearningPath from "./pages/LearningPath";
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
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/topic/:topicId" element={<TopicPage />} />
          <Route path="/learning-path" element={<LearningPath />} />
          {/* Placeholder routes */}
          <Route path="/quiz" element={<Dashboard />} />
          <Route path="/notes" element={<Dashboard />} />
          <Route path="/reports" element={<Dashboard />} />
          <Route path="/community" element={<Dashboard />} />
          <Route path="/profile" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
