import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Moon,
  TrendingUp,
} from "lucide-react";
import { useExpense } from "../Context/ExpenseContext";

const navLinks = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: ArrowLeftRight, label: "Transactions", path: "/transactions" },
  { icon: Wallet, label: "Budget", path: "/budget" },
];

function Sidebar() {
  const { darkMode, setDarkMode } = useExpense()

  return (
    <aside className={`hidden md:flex md:w-56 min-h-screen flex-col px-3 py-4 border-r border-white/10 fixed left-0 top-0  ${
  darkMode
    ? 'bg-[#0f172a] border-white/5'
    : 'bg-white border-slate-200'
}`}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 pb-6">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
          <TrendingUp size={16} className="text-white" />
        </div>
        <span className={` font-semibold text-sm tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          ExpenseTracker
        </span>
      </div>

      {/* Menu label */}
      <p className="text-[14px] text-slate-500 uppercase tracking-widest px-2 mb-2">
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
                return `flex items-center gap-3 px-3 py-2.5 rounded-lg text-md transition-all duration-150
                 ${isActive
      ? darkMode ? 'bg-slate-800 text-white' : 'bg-indigo-50 text-indigo-600 font-medium'
      : darkMode ? 'text-slate-400 hover:bg-slate-900/50 hover:text-slate-200' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
    }`
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
          <Moon size={16} className={darkMode ? 'text-slate-400' : 'text-slate-800'} />
          <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-800'}`}>Dark Mode</span>
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
        {/* <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 text-sm transition-all w-full text-left">
          <Settings size={16} />
          Settings
        </button> */}
      </div>
    </aside>
  );
}

export default Sidebar;
