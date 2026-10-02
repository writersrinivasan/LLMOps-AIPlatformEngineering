"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const modules = [
  { num: 1, short: "MLOps→LLMOps", href: "/modules/module1", color: "#818cf8" },
  { num: 2, short: "Architecture", href: "/modules/module2", color: "#a78bfa" },
  { num: 3, short: "CI/CD", href: "/modules/module3", color: "#60a5fa" },
  { num: 4, short: "Evaluation", href: "/modules/module4", color: "#34d399" },
  { num: 5, short: "Observability", href: "/modules/module5", color: "#f472b6" },
  { num: 6, short: "AI Platform", href: "/modules/module6", color: "#fb923c" },
  { num: 7, short: "Capstone", href: "/modules/module7", color: "#fbbf24" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg shadow-lg group-hover:scale-110 transition-transform">
            🧠
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-bold text-white leading-tight">LLMOps</div>
            <div className="text-xs text-slate-400 leading-tight">AI Platform Engineering</div>
          </div>
        </Link>

        {/* Module nav pills */}
        <div className="hidden lg:flex items-center gap-1">
          {modules.map((m) => {
            const isActive = pathname.startsWith(m.href);
            return (
              <Link key={m.num} href={m.href}>
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                  style={
                    isActive
                      ? { background: `${m.color}25`, color: m.color, boxShadow: `0 0 12px ${m.color}30` }
                      : {}
                  }
                >
                  <span
                    className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black"
                    style={{ background: isActive ? `${m.color}40` : "rgba(255,255,255,0.05)" }}
                  >
                    {m.num}
                  </span>
                  {m.short}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile: current module indicator */}
        <div className="lg:hidden text-sm text-slate-400">
          {modules.find((m) => pathname.startsWith(m.href))?.short ?? "Home"}
        </div>

        {/* Right CTA */}
        <Link href="/">
          <button className="text-xs px-3 py-2 rounded-lg glass glass-hover text-slate-300 hidden sm:flex items-center gap-2">
            <span>📋</span> Overview
          </button>
        </Link>
      </div>
    </nav>
  );
}
