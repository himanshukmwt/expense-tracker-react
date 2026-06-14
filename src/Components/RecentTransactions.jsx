import {
  Utensils, Car, ShoppingBag, Zap, Heart,
  Clapperboard, BookOpen, Briefcase, Package
} from 'lucide-react'

const CAT_COLORS = {
  Food: '#EF9F27', Transport: '#85B7EB', Shopping: '#ED93B1',
  Bills: '#AFA9EC', Health: '#5DCAA5', Entertainment: '#F0997B',
  Education: '#97C459', Salary: '#1D9E75', Other: '#B4B2A9',
}

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
}

function RecentTransactions({entries}){
    const recent=[...entries].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,7);

    return(
        <div className="bg-slate-800/60 border border-white/5 rounded-2xl p-5 h-full">
             <h3 className="text-sm font-medium text-slate-300 mb-4">Recent Transactions</h3>

             {recent.length=== 0 ?(
                <p className="text-slate-500 text-sm text-center py-8">No transactions yet</p>
             ):(
             <div className="flex flex-col gap-3">
                {recent.map(e=>{
                    const Icon = CAT_ICONS[e.category] || Package
            const color = CAT_COLORS[e.category] || '#B4B2A9'

            return(
                <div key={e.id} className="flex items-center gap-3">
                      <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: color + '22' }}
                >
                  <Icon size={16} style={{ color: color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-200 text-sm font-medium truncate">{e.title}</p>
                  <p className="text-slate-500 text-xs">{e.category} · {e.date}</p>
                </div>
                 <p className={`text-sm font-medium flex-shrink-0 ${e.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                  {e.type === 'income' ? '+' : '-'}{"\u20B9"}{e.amount.toLocaleString('en-IN')}
                </p>

                    </div>
            )
                })}
             </div>
             )}
        </div>
    )
}
export default RecentTransactions