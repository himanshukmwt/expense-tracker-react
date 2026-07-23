import { useExpense } from "../Context/ExpenseContext";

const colorMap = {
  green: {
    icon: "bg-green-500/10 text-green-400",
    value: "text-green-400",
  },
  red: {
    icon: "bg-red-500/10 text-red-400",
    value: "text-red-400",
  },
  blue: {
    icon: "bg-blue-500/10 text-blue-400",
    value: "text-blue-400",
  },
  amber: {
    icon: "bg-amber-500/10 text-amber-400",
    value: "text-yellow-400",
  },
};

function KpiCard({ title, value, sub, icon: Icon, color, progress }) {
  const c = colorMap[color];
  const { darkMode } = useExpense()

  return (
    <div className={` rounded-2xl px-5 py-3 flex flex-col gap-3 transition-colors ${darkMode
        ? 'bg-slate-800/60 border border-white/9'
        : 'bg-white border border-slate-200 shadow-sm'
    }`}>
      <div className="flex items-center justify-between">
        <p className={`text-xs uppercase tracking-wider ${
          darkMode ? 'text-slate-400' : 'text-slate-700'
        }`}>
          {title}
        </p>
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.icon}`}
        >
          <Icon size={16} />
        </div>
      </div>

      <p className={`text-2xl font-semibold ${c.value}`}>{value}</p>

      <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>{sub}</p>

      {progress !== undefined && (
        <div className={`h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
          <div
            className={`h-full rounded-full transitin-all ${progress > 90 ? "bg-red-500" : progress > 70 ? "bg-amber-500" : "bg-green-500"}`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default KpiCard;
