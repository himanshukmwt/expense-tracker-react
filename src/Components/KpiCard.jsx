const colorMap = {
  green: {
    icon: 'bg-green-500/10 text-green-400',
    value: 'text-green-400',
  },
  red: {
    icon: 'bg-red-500/10 text-red-400',
    value: 'text-red-400',
  },
  blue: {
    icon: 'bg-blue-500/10 text-blue-400',
    value: 'text-blue-400',
  },
  amber: {
    icon: 'bg-amber-500/10 text-amber-400',
    value: 'text-white',
  },
}

function KpiCard({title, value, sub, icon:Icon, color, progress}){
    const c=colorMap[color]

    return(
         <div className="bg-slate-800/60 border border-white/5 rounded-2xl p-5 flex flex-col gap-3">

      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-xs uppercase tracking-wider">{title}</p>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${c.icon}`}>
          <Icon size={16} />
        </div>
      </div>

      <p className={`text-2xl font-semibold ${c.value}`}>{value}</p>

      <p className="text-slate-500 text-xs">{sub}</p>

      {progress !==undefined && (
        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transitin-all ${progress> 90 ? 'bg-red-500':progress >70?'bg-amber-500' :'bg-green-500'}`}>

            </div>

        </div>
      )}
      </div>
    )
}

export default KpiCard;