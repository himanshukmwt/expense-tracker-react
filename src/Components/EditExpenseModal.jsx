import { useState } from 'react'
import { X } from 'lucide-react'
import { useExpense } from '../Context/ExpenseContext'

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Education', 'Other']

function EditExpenseModal({ entry, onClose }) {
  const { editEntry } = useExpense()
  const [type, setType] = useState(entry.type)
  const [form, setForm] = useState({
    title: entry.title,
    amount: entry.amount,
    category: entry.category,
    date: entry.date,
    notes: entry.notes || '',
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = () => {
    if (!form.title.trim()) { setError('Title required hai!'); return }
    if (!form.amount || parseFloat(form.amount) <= 0) { setError('Valid amount enter karo!'); return }

    editEntry({
      ...entry,
      type,
      title: form.title.trim(),
      amount: parseFloat(form.amount),
      category: type === 'income' ? 'Salary' : form.category,
      date: form.date,
      notes: form.notes.trim(),
    })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-slate-800 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-semibold text-base">Edit Transaction</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-400 transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Toggle */}
        <div className="flex bg-slate-900 rounded-xl p-1 mb-5">
          <button
            onClick={() => setType('expense')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              type === 'expense' ? 'bg-red-500/80 text-white' : 'text-slate-400'
            }`}
          >
            Expense
          </button>
          <button
            onClick={() => setType('income')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              type === 'income' ? 'bg-green-500/80 text-white' : 'text-slate-400'
            }`}
          >
            Income
          </button>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1.5">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-white/8 rounded-lg px-3 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1.5">Amount</label>
              <input
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-white/8 rounded-lg px-3 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>
            {type === 'expense' && (
              <div>
                <label className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1.5">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-white/8 rounded-lg px-3 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1.5">Date</label>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-white/8 rounded-lg px-3 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1.5">Notes (optional)</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={2}
              className="w-full bg-slate-900 border border-white/8 rounded-lg px-3 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
               {error}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-white/10 text-slate-400 hover:bg-slate-700 text-sm transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditExpenseModal