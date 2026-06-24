"use client";

import { Bell, Search, ChevronDown, Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 bg-surface border-b border-slate-dark flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-slate rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-ink" />
        </button>

        {/* Search - hidden on mobile, visible on md+ */}
        <div className="hidden md:flex items-center gap-2 bg-slate rounded-lg px-4 py-2 w-64 lg:w-80">
          <Search className="w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search transactions, reports..."
            className="bg-transparent text-sm text-ink placeholder-muted focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile search */}
        <button className="md:hidden p-2 hover:bg-slate rounded-lg transition-colors">
          <Search className="w-5 h-5 text-muted" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-slate rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-muted" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-coral rounded-full" />
        </button>

        {/* Score badge - hidden on small screens */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-teal/10 rounded-lg">
          <div className="w-2 h-2 bg-teal rounded-full" />
          <span className="text-sm font-semibold text-teal">Score: 76</span>
        </div>

        {/* Profile */}
        <button className="flex items-center gap-2 hover:bg-slate px-2 md:px-3 py-2 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-ink rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-xs">AK</span>
          </div>
          <ChevronDown className="w-4 h-4 text-muted hidden sm:block" />
        </button>
      </div>
    </header>
  );
}
