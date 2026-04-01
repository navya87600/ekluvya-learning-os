import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

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
        "fixed left-0 top-0 bottom-0 z-50 flex flex-col items-center py-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden bg-ink",
        hovered ? "w-[220px]" : "w-[72px]"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-4 w-[220px] mb-6 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-lg font-bold text-primary-foreground flex-shrink-0"
          style={{ clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)" }}>
          E
        </div>
        <span className={cn("font-heading text-lg font-extrabold tracking-wider text-primary-foreground whitespace-nowrap transition-opacity duration-200", hovered ? "opacity-100" : "opacity-0")}>
          EKLUVYA
        </span>
      </div>

      {/* Nav Groups */}
      {navGroups.map((group) => (
        <div key={group.label} className="w-full">
          <div className={cn("font-mono text-[9px] font-bold tracking-[2px] uppercase px-6 pt-3 pb-1 whitespace-nowrap transition-opacity duration-200",
            hovered ? "opacity-100 text-primary-foreground/20" : "opacity-0")}>
            {group.label}
          </div>
          {group.items.map((item) => {
            const active = location.pathname === item.path;
            return (
              <div
                key={item.path}
                className={cn(
                  "flex items-center gap-3 py-[11px] px-4 cursor-pointer w-[220px] relative transition-all duration-150",
                  active ? "bg-brand/15 border-r-[3px] border-brand" : "hover:bg-primary-foreground/[0.07]"
                )}
                onClick={() => navigate(item.path)}
              >
                <div className="w-10 flex items-center justify-center text-lg flex-shrink-0">{item.icon}</div>
                <span className={cn(
                  "text-[13px] font-semibold whitespace-nowrap transition-opacity duration-200",
                  active ? "text-primary-foreground" : "text-primary-foreground/65",
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
      <div className="mt-auto w-full border-t border-primary-foreground/[0.08] pt-3">
        {footerItems.map((item) => (
          <div
            key={item.path}
            className="flex items-center gap-3 py-[11px] px-4 cursor-pointer w-[220px] hover:bg-primary-foreground/[0.07] transition-all duration-150"
            onClick={() => navigate(item.path)}
          >
            <div className="w-10 flex items-center justify-center text-lg flex-shrink-0">{item.icon}</div>
            <span className={cn("text-[13px] font-semibold text-primary-foreground/65 whitespace-nowrap transition-opacity duration-200", hovered ? "opacity-100" : "opacity-0")}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
