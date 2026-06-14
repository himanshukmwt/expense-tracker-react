import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = {
  Food: "#EF9F27",
  Transport: "#85B7EB",
  Shopping: "#ED93B1",
  Bills: "#AFA9EC",
  Health: "#5DCAA5",
  Entertainment: "#F0997B",
  Education: "#97C459",
  Other: "#B4B2A9",
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function ExpenseChart({ entries, monthEntries }) {
  //pie chart categort wise
  const catData = entries
    .filter((e) => e.type === "expense")
    .reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});

  const pieData = Object.entries(catData).map(([name, value]) => ({
    name,
    value,
  }));

  // Bar char
  const now = new Date();
  const barData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
    const key =
      d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
    const total = entries
      .filter((e) => e.type == "expense" && e.date.startsWith(key))
      .reduce((s, e) => s + e.amount, 0);
    return { month: MONTHS[d.getMonth()], amount: total };
  });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

      {/* Bar Chart */}
      <div className="bg-slate-800/60 border border-white/5 rounded-2xl p-5">
        <h3 className="text-sm font-medium text-slate-300 mb-4">
          Monthly Spending
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={barData} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => "\u20B9" + v / 1000 + "k"}
            />
            <Tooltip
             cursor={{ fill: "transparent" }}
              formatter={(v) => ["\u20B9" + v.toLocaleString("en-IN"), "Spent"]}
              contentStyle={{
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                color: "#f1f5f9",
              }}
            />
            <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-slate-800/60 border border-white/5 rounded-2xl p-5">
        <h3 className="text-sm font-medium text-slate-300 mb-4">
          Category Breakdown
        </h3>
        {pieData.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-8">
            No expenses this month
          </p>
        ) : (
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={160}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  dataKey="value"
                  paddingAngle={3}
                >
                  {pieData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[entry.name] || "#B4B2A9"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => ["\u20B9" + v.toLocaleString("en-IN")]}
                  contentStyle={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "8px",
                    color: "#f1f5f9",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-2">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                    style={{ background: COLORS[item.name] || "#B4B2A9" }}
                  />
                  <span className="text-slate-400 text-xs">{item.name}</span>
                  <span className="text-slate-300 text-xs ml-auto">
                    {"\u20B9"}{item.value.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpenseChart;
