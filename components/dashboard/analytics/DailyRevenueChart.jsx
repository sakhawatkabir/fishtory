"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartCard from "./ChartCard";

const tooltipStyle = {
  contentStyle: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "12px",
    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.07)",
  },
  labelStyle: { color: "#374151", fontWeight: 600 },
  itemStyle: { color: "#6b7280" },
};

const DailyRevenueChart = ({ data }) => {
  return (
    <ChartCard title="Daily Revenue" sub="Last 13 days">
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={data}
          margin={{ top: 4, right: 8, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2f3a32" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#2f3a32" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `£${v}`}
          />
          <Tooltip
            {...tooltipStyle}
            formatter={(v) => [`£${v.toFixed(2)}`, "Revenue"]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#2f3a32"
            strokeWidth={2}
            fill="url(#revenueGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "#2f3a32" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default DailyRevenueChart;
