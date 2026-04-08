import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import ekluvyaLogo from "@/assets/ekluvya-logo.png";

const navGroups = [
  {
    label: "Learn",
    items: [
      { icon: "🏠", text: "Dashboard", path: "/" },
      { icon: "📚", text: "Courses", path: "/courses" },
      { icon: "▶️", text: "Now Learning", path: "/topic/t-4-2" },
      { icon: "🎯", text: "Test Yourself", path: "/quiz" },
      { icon: "📓", text: "My Notes", path: "/notes" },
    ],
  },
  {
    label: "Track",
    items: [
      { icon: "📊", text: "Reports", path: "/reports", badge: true },
      { icon: "🧭", text: "AI Learning Path", path: "/learning-path" },
    ],
  },
  {
    label: "Connect",
    items: [{ icon: "🌐", text: "Community", path: "/community" }],
  },
];

const footerItems = [
  { icon: "👤", text: "My Profile", path: "/profile" },
  { icon: "⚙️", text: "Settings", path: "/settings" },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-50 flex flex-col py-4 overflow-y-auto overflow-x-hidden bg-card border-r border-border shadow-sm w-[240px]">
      {/* Logo */}
      <div className="flex items-center px-5 mb-6 cursor-pointer" onClick={() => navigate("/")}>
        <img src={ekluvyaLogo} alt="Ekluvya" className="h-10 w-auto" />
      </div>

      {/* Nav Groups */}
      {navGroups.map((group) => (
        <div key={group.label} className="w-full">
          <div className="font-mono text-[9px] font-bold tracking-[2px] uppercase px-6 pt-3 pb-1 text-ink-50">
            {group.label}
          </div>
          {group.items.map((item) => {
            const active = location.pathname === item.path;
            return (
              <div
                key={item.path}
                className={cn(
                  "flex items-center gap-3 py-[11px] px-5 cursor-pointer relative transition-all duration-150 mx-2 rounded-lg",
                  active ? "bg-brand/10 border-l-[3px] border-brand text-brand" : "hover:bg-secondary text-foreground"
                )}
                onClick={() => navigate(item.path)}
              >
                <div className="w-8 flex items-center justify-center text-lg flex-shrink-0">{item.icon}</div>
                <span className={cn("text-[13px] font-semibold whitespace-nowrap", active ? "text-brand" : "text-ink-80")}>
                  {item.text}
                </span>
                {item.badge && (
                  <div className="absolute top-2 right-3 w-[7px] h-[7px] bg-brand rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Footer */}
      <div className="mt-auto w-full border-t border-border pt-3">
        {footerItems.map((item) => (
          <div
            key={item.path}
            className="flex items-center gap-3 py-[11px] px-5 cursor-pointer hover:bg-secondary transition-all duration-150 mx-2 rounded-lg"
            onClick={() => navigate(item.path)}
          >
            <div className="w-8 flex items-center justify-center text-lg flex-shrink-0">{item.icon}</div>
            <span className="text-[13px] font-semibold text-ink-50 whitespace-nowrap">{item.text}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
