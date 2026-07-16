import { useState } from 'react'
import { useExpense } from '../Context/ExpenseContext'
import {
  Utensils, Car, ShoppingBag, Zap, Heart,
  Clapperboard, BookOpen, Package, Save
} from 'lucide-react'

const CATEGORIES = [
  { name: 'Food', icon: Utensils, color: '#EF9F27' },
  { name: 'Transport', icon: Car, color: '#85B7EB' },
  { name: 'Shopping', icon: ShoppingBag, color: '#ED93B1' },
  { name: 'Bills', icon: Zap, color: '#AFA9EC' },
  { name: 'Health', icon: Heart, color: '#5DCAA5' },
  { name: 'Entertainment', icon: Clapperboard, color: '#F0997B' },
  { name: 'Education', icon: BookOpen, color: '#97C459' },
  { name: 'Other', icon: Package, color: '#B4B2A9' },
]

function Budget() {
  const { entries, budgets, updateBudget } = useExpense()
  const [localBudgets, setLocalBudgets] = useState({ ...budgets })
  const [saved, setSaved] = useState(false)

  const currentMonth = new Date().toISOString().slice(0, 7)
  const monthExpenses = entries.filter(
    e => e.type === 'expense' && e.date.startsWith(currentMonth)
  )

  const catSpend = {}
  monthExpenses.forEach(e => {
    catSpend[e.category] = (catSpend[e.category] || 0) + e.amount
  })

  const totalBudget = Object.values(localBudgets).reduce((a, b) => a + (b || 0), 0)
  const totalSpent = monthExpenses.reduce((a, e) => a + e.amount, 0)
  const totalRemaining = totalBudget - totalSpent
  const overallPct = totalBudget > 0 ? Math.min(100, Math.round((totalSpent / totalBudget) * 100)) : 0

  const fmt = (n) => "\u20B9" + Math.abs(n).toLocaleString('en-IN')

  const handleBudgetChange = (cat, value) => {
    setLocalBudgets({ ...localBudgets, [cat]: parseFloat(value) || 0 })
    setSaved(false)
  }

  const handleSave = () => {
    updateBudget(localBudgets)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const getBarColor = (pct) => {
    if (pct >= 90) return '#D85A30'
    if (pct >= 70) return '#EF9F27'
    return '#4ade80'
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Budget Tracker</h1>
          <p className="text-slate-400 text-sm mt-1">
            Set monthly limits per category
          </p>
        </div>
        <button
          onClick={handleSave}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-lg transition-all cursor-pointer ${
            saved
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-indigo-500 hover:bg-indigo-600 text-white'
          }`}
        >
          <Save size={15} />
          {saved ? 'Saved!' : 'Save Budget'}
        </button>
      </div>

      {/* Overall Summary Card */}
      <div className="bg-slate-800/60 border border-white/5 rounded-2xl p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-4">
          <div>
            <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Total Budget</p>
            <p className="text-2xl font-semibold text-white">{fmt(totalBudget)}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Spent</p>
            <p className="text-2xl font-semibold text-red-400">{fmt(totalSpent)}</p>
          </div>
          <div>
            <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Remaining</p>
            <p className={`text-2xl font-semibold ${totalRemaining >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {totalRemaining < 0 ? '-' : ''}{fmt(totalRemaining)}
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex justify-between mb-2">
              <span className="text-[11px] text-slate-500">Overall used</span>
              <span className="text-[11px] text-white font-medium">{overallPct}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${overallPct}%`,
                  background: getBarColor(overallPct)
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon
          const spent = catSpend[cat.name] || 0
          const limit = localBudgets[cat.name] || 0
          const pct = limit > 0 ? Math.min(100, Math.round((spent / limit) * 100)) : 0
          const remaining = limit - spent
          const barColor = getBarColor(pct)

          return (
            <div
              key={cat.name}
              className="bg-slate-800/60 border border-white/5 rounded-2xl p-5"
            >
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: cat.color + '22' }}
                  >
                    <Icon size={16} style={{ color: cat.color }} />
                  </div>
                  <div>
                    <p className="text-slate-200 text-sm font-medium">{cat.name}</p>
                    <p className="text-slate-500 text-xs">
                      {limit > 0 ? `${pct}% used` : 'No limit set'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 text-sm">₹</span>
                  <input
                    type="number"
                    value={localBudgets[cat.name] || ''}
                    onChange={e => handleBudgetChange(cat.name, e.target.value)}
                    placeholder="0"
                    className="w-20 sm:w-24 bg-slate-900 border border-white/8 rounded-lg px-2.5 py-1.5 text-slate-200 text-sm text-right focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: limit > 0 ? `${pct}%` : '0%',
                    background: barColor
                  }}
                />
              </div>

              <div className="flex justify-between items-center">
                <p className="text-slate-500 text-xs">
                  {fmt(spent)} spent
                </p>
                {limit > 0 && (
                  <p className={`text-xs font-medium ${remaining >= 0 ? 'text-slate-400' : 'text-red-400'}`}>
                    {remaining >= 0
                      ? `${fmt(remaining)} left`
                      : `${fmt(Math.abs(remaining))} over budget! `
                    }
                  </p>
                )}
                {pct >= 90 && limit > 0 && (
                  <span className="text-xs text-red-400 font-medium"> Near limit!</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Budget