"use client";

import { useState } from "react";

type Tab = "home" | "explore" | "profile";

interface NavItem {
  id: Tab;
  label: string;
  icon: React.ReactNode;
}

const HomeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ExploreIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ProfileIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const navItems: NavItem[] = [
  { id: "home",    label: "Trang chủ", icon: <HomeIcon /> },
  { id: "explore", label: "Khám phá",  icon: <ExploreIcon /> },
  { id: "profile", label: "Hồ sơ",     icon: <ProfileIcon /> },
];

export default function Navigation() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  return (
    <>
      {/* ── SIDEBAR — Desktop only (hidden on mobile) ── */}
      <aside
        className="
          hidden md:flex
          flex-col items-center
          w-20 h-screen shrink-0
          bg-zinc-950 border-r border-white/8
          py-6 gap-2
          sticky top-0
        "
        aria-label="Sidebar navigation"
      >
        {/* Logo */}
        <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center mb-5 shrink-0">
          <span className="text-white font-bold text-sm font-mono tracking-tight">RF</span>
        </div>

        {/* Nav items */}
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            aria-label={item.label}
            aria-current={activeTab === item.id ? "page" : undefined}
            className={`
              relative w-14 h-14 rounded-2xl
              flex flex-col items-center justify-center gap-1
              transition-all duration-200 group
              ${activeTab === item.id
                ? "bg-rose-500/15 text-rose-400"
                : "text-white/35 hover:bg-white/6 hover:text-white/80"}
            `}
          >
            {/* Active indicator bar */}
            {activeTab === item.id && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-7 bg-rose-500 rounded-r-full" />
            )}
            {item.icon}
            <span className="text-[9px] font-medium leading-none">{item.label}</span>
          </button>
        ))}
      </aside>

      {/* ── BOTTOM NAV — Mobile only (hidden on desktop) ── */}
      <nav
        className="
          md:hidden
          fixed bottom-0 left-0 right-0 z-50
          h-16
          bg-black/90 backdrop-blur-xl
          border-t border-white/8
          flex items-center justify-around px-2
        "
        aria-label="Bottom navigation"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            aria-label={item.label}
            aria-current={activeTab === item.id ? "page" : undefined}
            className={`
              flex-1 h-full flex flex-col items-center justify-center gap-1
              transition-all duration-200 rounded-xl
              ${activeTab === item.id
                ? "text-rose-400"
                : "text-white/40 hover:text-white/70"}
            `}
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
