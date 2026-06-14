import { useState } from 'react'
import { X } from 'lucide-react'
import { useExpense } from '../Context/ExpenseContext'

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Education', 'Other']

const initialForm = {
  title: '',
  amount: '',
  category: 'Food',
  date: new Date().toISOString().slice(0, 10),
  notes: '',
}

function AddExpenseModal({isOpen, onClose}){
      const { addEntry } = useExpense()
  const [type, setType] = useState('expense')
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

    if(!isOpen)return null;

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
        setError('');
    }

    const handleSubmit=()=>{
        if (!form.title.trim()) {
  setError('Title is required!');
  return;
}

if (!form.amount || parseFloat(form.amount) <= 0) {
  setError('Please enter a valid amount!');
  return;
}

if (!form.date) {
  setError('Please select a date!');
  return;
}

  addEntry({
    type,
    title:form.title.trim(),
    amount: parseFloat(form.amount),
      category: type === 'income' ? 'Salary' : form.category,
      date: form.date,
      notes: form.notes.trim(),
  });

  setForm(initialForm)
    setType('expense')
    setError('')
    onClose()
    }

      const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

    return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdrop}
    >
      <div className="bg-slate-800 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-semibold text-base">Add Transaction</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-700 hover:bg-slate-600 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Toggle */}
        <div className="flex bg-slate-900 rounded-xl p-1 mb-5">
          <button
            onClick={() => setType('expense')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              type === 'expense'
                ? 'bg-red-500/80 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Expense
          </button>
          <button
            onClick={() => setType('income')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              type === 'income'
                ? 'bg-green-500/80 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Income
          </button>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">

          {/* Title */}
          <div>
            <label className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1.5">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Lunch at café"
              className="w-full bg-slate-900 border border-white/8 rounded-lg px-3 py-2.5 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Amount + Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1.5">Amount (₹)</label>
              <input
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
                min="0"
                className="w-full bg-slate-900 border border-white/8 rounded-lg px-3 py-2.5 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Category  */}
            {type === 'expense' && (
              <div>
                <label className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1.5">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-white/8 rounded-lg px-3 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Date */}
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

          {/* Notes */}
          <div>
            <label className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1.5">Notes (optional)</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any extra details..."
              rows={2}
              className="w-full bg-slate-900 border border-white/8 rounded-lg px-3 py-2.5 text-slate-200 text-sm placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              ⚠ {error}
            </p>
          )}

        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-white/10 text-slate-400 hover:text-slate-200 hover:bg-slate-700 text-sm transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`flex-1 py-2.5 rounded-lg text-white text-sm font-medium transition-all ${
              type === 'expense'
                ? 'bg-indigo-500 hover:bg-indigo-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {type === 'expense' ? 'Add Expense' : 'Add Income'}
          </button>
        </div>

      </div>
    </div>
  )
};

export default AddExpenseModal;