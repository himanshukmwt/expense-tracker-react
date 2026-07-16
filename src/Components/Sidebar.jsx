import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Moon,
  Settings,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: ArrowLeftRight, label: "Transactions", path: "/transactions" },
  { icon: Wallet, label: "Budget", path: "/budget" },
];

function Sidebar() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    // <aside className="w-56 min-h-screen  flex flex-col px-3 py-4 border-r border-white/10 fixed left-0 top-0 ">
    <aside className="hidden md:flex md:w-56 min-h-screen flex-col px-3 py-4 border-r border-white/10 fixed left-0 top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 pb-6">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
          <TrendingUp size={16} className="text-white" />
        </div>
        <span className="text-white font-semibold text-sm tracking-tight">
          ExpenseTracker
        </span>
      </div>

      {/* Menu label */}
      <p className="text-[10px] text-slate-500 uppercase tracking-widest px-2 mb-2">
        Main Menu
      </p>

      {/* Nav Links */}
      <nav className="flex flex-col gap-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => {
                return `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150
                ${
                  isActive
                    ? "bg-slate-800 text-white font-medium"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`;
              }}
            >
              <Icon size={16} />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto flex flex-col gap-1 pt-4 border-t border-white/10">

        {/* Dark Mode Toggle */}
        <div className="flex items-center gap-3 px-3 py-2.5">
          <Moon size={16} className="text-slate-400" />
          <span className="text-slate-400 text-sm">Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`ml-auto w-8 h-4 rounded-full transition-colors duration-200 relative
              ${darkMode ? "bg-indigo-500" : "bg-slate-600"}`}
          >
            <span
              className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-200
              ${darkMode ? "left-4" : "left-0.5"}`}
            />
          </button>
        </div>

        {/* Settings */}
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 text-sm transition-all w-full text-left">
          <Settings size={16} />
          Settings
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
