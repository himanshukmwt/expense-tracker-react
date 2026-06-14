import { useState } from 'react'
import { useExpense } from '../Context/ExpenseContext'
import AddExpenseModal from '../Components/AddExpenseModal'
import EditExpenseModal from '../Components/EditExpenseModal'
import {
  Search, Trash2, Pencil, Utensils, Car, ShoppingBag,
  Zap, Heart, Clapperboard, BookOpen, Briefcase, Package
} from 'lucide-react'

const CATEGORIES = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment', 'Education', 'Other']

const CAT_COLORS = {
  Food: '#EF9F27', Transport: '#85B7EB', Shopping: '#ED93B1',
  Bills: '#AFA9EC', Health: '#5DCAA5', Entertainment: '#F0997B',
  Education: '#97C459', Salary: '#1D9E75', Other: '#B4B2A9',
}

const CAT_ICONS = {
  Food: Utensils, Transport: Car, Shopping: ShoppingBag,
  Bills: Zap, Health: Heart, Entertainment: Clapperboard,
  Education: BookOpen, Salary: Briefcase, Other: Package,
}

const ITEMS_PER_PAGE = 8


function Transactions() {
  const { entries, deleteEntry } = useExpense()
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editEntry, setEditEntry] = useState(null)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [catFilter, setCatFilter] = useState('')
  const [monthFilter, setMonthFilter] = useState('')
  const [page, setPage] = useState(1)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  let filtered=[...entries].sort((a,b)=>new Date(b.date)- new Date(a.date));

  if(search){
    filtered=filtered.filter(e=>e.title.toLowerCase().includes(search.toLowerCase()));
  }
  if(typeFilter){
    filtered=filtered.filter(e=>e.type=== typeFilter);
  }
  if(catFilter){
    filtered=filtered.filter(e=>e.category===catFilter);
  }
  if(monthFilter){
    filtered=filtered.filter(e=>e.date.startsWith(monthFilter));
  }

  const totalPages=Math.ceil(filtered.length/ITEMS_PER_PAGE);
  const paginated=filtered.slice((page-1)*ITEMS_PER_PAGE,page*ITEMS_PER_PAGE);
  
  const handleDelete=(id)=>{
    deleteEntry(id);
    setDeleteConfirm(null);
  }

  const now=new Date();
  const monthOptions=Array.from({length:6},(_,i)=>{
    const d=new Date(now.getFullYear(),now.getMonth()-i,1);
    const value=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,'0');
    const label=d.toLocaleDateString('en-IN',{month:'long', year:'numeric'});
    return {
      value, label
    }
  })
  return(
    <div className='flex flex-col gap-6'>

      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
        <h1 className='text-xl font-semibold text-white'>All Transactions</h1>
        <p className='text-slate-400 text-sm mt-1'>{filtered.length}</p>
</div>
<button 
onClick={()=>setAddModalOpen(true)}
className='flex items-center gap bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-2 px-4 rounded-xl transaction-colors'
>
  +Add Expense
</button>
      </div>

      {/*filters*/}
      <div className='flex gap-3 flex-wrap'>
          
           {/* Search */}
        <div className="flex items-center gap-2 bg-slate-800/60 border border-white/5 rounded-lg px-3 py-2 flex-1 min-w-40">
          <Search size={14} className="text-slate-500" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            className="bg-transparent text-slate-300 text-sm placeholder:text-slate-600 focus:outline-none w-full"
          />
        </div>

         {/* Type Filter */}
        <select
          value={typeFilter}
          onChange={e => { setTypeFilter(e.target.value); setPage(1) }}
          className="bg-slate-800/60 border border-white/5 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none"
        >
          <option value="">All Types</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>


        {/* Category Filter */}
        <select
          value={catFilter}
          onChange={e => { setCatFilter(e.target.value); setPage(1) }}
          className="bg-slate-800/60 border border-white/5 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

         {/* Month Filter */}
        <select
          value={monthFilter}
          onChange={e => { setMonthFilter(e.target.value); setPage(1) }}
          className="bg-slate-800/60 border border-white/5 rounded-lg px-3 py-2 text-slate-300 text-sm focus:outline-none"
        >
          <option value="">All Months</option>
          {monthOptions.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>

         {/* Clear Filters */}
        {(search || typeFilter || catFilter || monthFilter) && (
          <button
            onClick={() => { setSearch(''); setTypeFilter(''); setCatFilter(''); setMonthFilter(''); setPage(1) }}
            className="text-slate-400 hover:text-red-400 text-sm px-3 py-2 border border-white/5 rounded-lg transition-colors"
          >
             Clear
          </button>
        )}
      </div>
    </div>
  )
}
export default Transactions