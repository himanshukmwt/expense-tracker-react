import { useExpense } from "../Context/ExpenseContext";
import {useState} from 'react';
import KpiCard from "../Components/KpiCard";
import { TrendingUp, TrendingDown, Wallet, PieChart } from "lucide-react";
import ExpenseChart from '../components/ExpenseChart'
import RecentTransactions from "../Components/RecentTransactions";
import AddExpenseModal from "../Components/AddExpenseModal";

function Dashboard() {
  const { entries, budgets, getSummary } = useExpense();
  const [modalOpen,setModalOpen]=useState(false);

  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthEntries = entries.filter((e) => e.date.startsWith(currentMonth));
  const { income, expense, balance } = getSummary(monthEntries);

  const totalBudget = Object.values(budgets).reduce((a, b) => a + b, 0);
  const budgetUsed =
    totalBudget > 0 ? Math.round((expense / totalBudget) * 100) : 0;

  const fmt = (n) => "\u20B9" + n.toLocaleString("en-IN");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Good morning </h1>
          <p className="text-slate-400 text-sm mt-1">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <button
         onClick={()=>setModalOpen(true)}
         className="w-full sm:w-auto flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg transition-colors cursor-pointer">
          + Add Expense
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          title="Total Income"
          value={fmt(income)}
          sub="This month"
          icon={TrendingUp}
          color="green"
        />

        <KpiCard
          title="Total Spent"
          value={fmt(expense)}
          sub="This month"
          icon={TrendingDown}
          color="red"
        />

        <KpiCard
          title="Balance"
          value={fmt(balance)}
          sub="Available"
          icon={Wallet}
          color="blue"
        />

        <KpiCard
          title="Budget Used"
          value={budgetUsed + "%"}
          sub={fmt(expense) + " of " + fmt(totalBudget)}
          icon={PieChart}
          color="amber"
          progress={budgetUsed}
        />
      </div>

        {/* Charts + Recent Transactions */}

       <div className="flex flex-col gap-4">
        <div className="xl:col-span-2">
          <ExpenseChart entries={entries} monthEntries={monthEntries} />
           <RecentTransactions entries={entries} />
        </div>
         {/* Modal */}
      <AddExpenseModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </div>
  );
}
export default Dashboard;
