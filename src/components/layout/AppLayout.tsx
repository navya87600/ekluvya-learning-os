import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface AppLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function AppLayout({ title, children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <Topbar title={title} />
      <main className="ml-[240px] pt-[60px] flex-1 min-h-screen">
        <div className="p-7 animate-fadeUp">
          {children}
        </div>
      </main>
    </div>
  );
}
