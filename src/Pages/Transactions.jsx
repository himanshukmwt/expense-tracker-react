import { useState } from "react";
import { useExpense } from "../Context/ExpenseContext";
import AddExpenseModal from "../Components/AddExpenseModal";
import EditExpenseModal from "../Components/EditExpenseModal";
import {
  Search,
  Trash2,
  Pencil,
  Utensils,
  Car,
  ShoppingBag,
  Zap,
  Heart,
  Clapperboard,
  BookOpen,
  Briefcase,
  Package,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Health",
  "Entertainment",
  "Education",
  "Other",
];

const CAT_COLORS = {
  Food: "#EF9F27",
  Transport: "#85B7EB",
  Shopping: "#ED93B1",
  Bills: "#AFA9EC",
  Health: "#5DCAA5",
  Entertainment: "#F0997B",
  Education: "#97C459",
  Salary: "#1D9E75",
  Other: "#B4B2A9",
};

const CAT_ICONS = {
  Food: Utensils,
  Transport: Car,
  Shopping: ShoppingBag,
  Bills: Zap,
  Health: Heart,
  Entertainment: Clapperboard,
  Education: BookOpen,
  Salary: Briefcase,
  Other: Package,
};

const ITEMS_PER_PAGE = 8;

function Transactions() {
  const { entries, deleteEntry } = useExpense();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editEntry, setEditEntry] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [page, setPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  let filtered = [...entries].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  if (search) {
    filtered = filtered.filter((e) =>
      e.title.toLowerCase().includes(search.toLowerCase()),
    );
  }
  if (typeFilter) {
    filtered = filtered.filter((e) => e.type === typeFilter);
  }
  if (catFilter) {
    filtered = filtered.filter((e) => e.category === catFilter);
  }
  if (monthFilter) {
    filtered = filtered.filter((e) => e.date.startsWith(monthFilter));
  }

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handleDelete = (id) => {
    deleteEntry(id);
    setDeleteConfirm(null);
  };

  const now = new Date();
  const monthOptions = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value =
      d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
    const label = d.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });
    return {
      value,
      label,
    };
  });
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">All Transactions</h1>
          <p className="text-slate-400 text-sm mt-1">{filtered.length}</p>
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-2 px-4 rounded-xl transaction-colors"
        >
          +Add Expense
        </button>
      </div>

      {/*filters*/}
      <div className="flex gap-3 flex-wrap">
        {/* Search */}
        <div className="flex items-center gap-2 bg-slate-800/60 border border-white/5 rounded-lg px-3 py-2 flex-1 min-w-40">
          <Search size={14} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="bg-transparent text-slate-300 text-sm placeholder:text-slate-600 focus:outline-none w-full"
          />
        </div>

        {/* Type Filter */}
        <select
          value={typeFilter}
          onChange={(e) => {
            setTypeFilter(e.target.value);
            setPage(1);
          }}
          className="bg-slate-800/60 border border-white/5 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none"
        >
          <option value="">All Types</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* Category Filter */}
        <select
          value={catFilter}
          onChange={(e) => {
            setCatFilter(e.target.value);
            setPage(1);
          }}
          className="bg-slate-800/60 border border-white/5 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Month Filter */}
        <select
          value={monthFilter}
          onChange={(e) => {
            setMonthFilter(e.target.value);
            setPage(1);
          }}
          className="bg-slate-800/60 border border-white/5 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none"
        >
          <option value="">All Months</option>
          {monthOptions.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        {/* Clear Filters */}
        {(search || typeFilter || catFilter || monthFilter) && (
          <button
            onClick={() => {
              setSearch("");
              setTypeFilter("");
              setCatFilter("");
              setMonthFilter("");
              setPage(1);
            }}
            className="text-slate-400 hover:text-red-400 text-sm px-3 py-2 border border-white/5 rounded-lg transition-colors"
          >
            Clear
          </button>
        )}
      </div>
      {/* Table Header */}
      <div className="bg-slate-800/60 border border-white/5 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] gap-3 px-5 py-3 border-b border-white/5">
          {["Title", "Category", "Date", "Amount", "Actions"].map((h) => (
            <p
              key={h}
              className="text-[11px] text-slate-500 uppercase tracking-wider"
            >
              {h}
            </p>
          ))}
        </div>

        {paginated.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-sm">
            No transactions found
          </div>
        ) : (
          paginated.map((e) => {
            const Icon = CAT_ICONS[e.category] || Package;
            const color = CAT_COLORS[e.category] || "#B4B2A9";
            return (
              <div
                key={e.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_80px] gap-3 px-5 py-3.5 border-b border-white/5 hover:bg-slate-700/30 transition-colors items-center"
              >
                {/* Title */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: color + "22" }}
                  >
                    <Icon size={14} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-slate-200 text-sm font-medium truncate">
                      {e.title}
                    </p>
                    <p className="text-slate-500 text-xs capitalize">
                      {e.type}
                    </p>
                  </div>
                </div>

                {/* Category Badge */}
                <div>
                  <span
                    className="text-[11px] px-2.5 py-1 rounded-full font-medium"
                    style={{ background: color + "22", color }}
                  >
                    {e.category}
                  </span>
                </div>

                {/* Date */}
                <p className="text-slate-400 text-sm">
                  {new Date(e.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                {/* Amount */}
                <p
                  className={`text-sm font-medium ${e.type === "income" ? "text-green-400" : "text-red-400"}`}
                >
                  {e.type === "income" ? "+" : "-"}₹
                  {e.amount.toLocaleString("en-IN")}
                </p>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditEntry(e)}
                    className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-indigo-500/20 hover:text-indigo-400 flex items-center justify-center text-slate-400 transition-colors"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(e.id)}
                    className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center text-slate-400 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-slate-500 text-sm">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of{" "}
            {filtered.length}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className=" flex px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-sm disabled:opacity-40 hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft size={20} /> Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-sm transition-colors ${
                  page === i + 1
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className=" flex px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 text-sm disabled:opacity-40 hover:bg-slate-700 transition-colors"
            >
              Next <ArrowRight size={20} />
            </button>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 border border-white/10 rounded-2xl p-6 w-full max-w-sm">
            <h3 className="text-white font-semibold mb-2">
              Delete Transaction?
            </h3>
            <p className="text-slate-400 text-sm mb-5">This can't be undo</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2 rounded-lg border border-white/10 text-slate-400 hover:bg-slate-700 text-sm transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <AddExpenseModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
      {editEntry && (
        <EditExpenseModal
          entry={editEntry}
          onClose={() => setEditEntry(null)}
        />
      )}
    </div>
  );
}
export default Transactions;
