"use client";
import {
  BarChart,
  Bar,
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

const MonthlyRevenueChart = ({ data }) => {
  return (
    <ChartCard title="Monthly Revenue" sub="Dec 2025 – May 2026">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 8, left: -10, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f3f4f6"
            vertical={false}
          />
          <XAxis
            dataKey="month"
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
          <Tooltip {...tooltipStyle} formatter={(v) => [`£${v}`, "Revenue"]} />
          <Bar
            dataKey="revenue"
            fill="#2f3a32"
            radius={[4, 4, 0, 0]}
            maxBarSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default MonthlyRevenueChart;
