import { Menu, X, TrendingUp } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useExpense } from "../Context/ExpenseContext";

function MobileNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { darkMode, setDarkMode } = useExpense()

  return (
    <>
      <div className={`md:hidden fixed top-0 left-0 right-0 h-14  flex items-center justify-between px-4 z-50 
      ${darkMode ? 'bg-slate-900 border-b border-white/10' : 'bg-slate-100 border-b border-black/10'}`}>
        <div className="flex items-center gap-3 px-2 pb-6 pt-5">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <TrendingUp size={16} className="text-white" />
          </div>
          <span className={`font-semibold text-sm tracking-tight ${darkMode ? 'text-white' :'text-gray-800'}`}>
            ExpenseTracker
          </span>
        </div>
        <button onClick={() => setMenuOpen(true)}>
          <Menu size={22} className={`${darkMode? 'text-white' : 'text-gray-800'}`} />
        </button>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setMenuOpen(false)}
        >
          {/* Drawer */}
          <div
            className="w-64 h-full bg-slate-900 border-r border-white/10 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-white font-semibold text-lg">Menu</h2>

              <button onClick={() => setMenuOpen(false)}>
                <X size={22} className="text-white" />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2">
              <NavLink
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 py-3 px-3 rounded-lg hover:bg-slate-800"
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/transactions"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 py-3 px-3 rounded-lg hover:bg-slate-800"
              >
                Transactions
              </NavLink>

              <NavLink
                to="/budget"
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 py-3 px-3 rounded-lg hover:bg-slate-800"
              >
                Budget
              </NavLink>

              {/* <button className="flex items-center gap-3 text-slate-300 py-3 px-3 rounded-lg hover:bg-slate-800">
             
                Settings
              </button> */}

              <div className="flex items-center gap-3 px-3 py-2.5">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileNavbar;
