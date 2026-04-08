import { useState } from "react";
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
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-50 flex flex-col items-center py-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden bg-card border-r border-border shadow-sm",
        hovered ? "w-[240px]" : "w-[72px]"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2 px-4 w-[240px] mb-6 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={ekluvyaLogo} alt="Ekluvya" className="h-10 w-auto flex-shrink-0" style={{ maxWidth: hovered ? '160px' : '40px', transition: 'max-width 0.3s' }} />
      </div>

      {/* Nav Groups */}
      {navGroups.map((group) => (
        <div key={group.label} className="w-full">
          <div className={cn("font-mono text-[9px] font-bold tracking-[2px] uppercase px-6 pt-3 pb-1 whitespace-nowrap transition-opacity duration-200",
            hovered ? "opacity-100 text-ink-50" : "opacity-0")}>
            {group.label}
          </div>
          {group.items.map((item) => {
            const active = location.pathname === item.path;
            return (
              <div
                key={item.path}
                className={cn(
                  "flex items-center gap-3 py-[11px] px-4 cursor-pointer w-[240px] relative transition-all duration-150 rounded-r-lg mx-1",
                  active ? "bg-brand/10 border-l-[3px] border-brand text-brand" : "hover:bg-secondary text-foreground"
                )}
                onClick={() => navigate(item.path)}
              >
                <div className="w-10 flex items-center justify-center text-lg flex-shrink-0">{item.icon}</div>
                <span className={cn(
                  "text-[13px] font-semibold whitespace-nowrap transition-opacity duration-200",
                  active ? "text-brand" : "text-ink-80",
                  hovered ? "opacity-100" : "opacity-0"
                )}>
                  {item.text}
                </span>
                {item.badge && (
                  <div className="absolute top-2 right-2 w-[7px] h-[7px] bg-brand rounded-full" />
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
            className="flex items-center gap-3 py-[11px] px-4 cursor-pointer w-[240px] hover:bg-secondary transition-all duration-150 rounded-r-lg mx-1"
            onClick={() => navigate(item.path)}
          >
            <div className="w-10 flex items-center justify-center text-lg flex-shrink-0">{item.icon}</div>
            <span className={cn("text-[13px] font-semibold text-ink-50 whitespace-nowrap transition-opacity duration-200", hovered ? "opacity-100" : "opacity-0")}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
