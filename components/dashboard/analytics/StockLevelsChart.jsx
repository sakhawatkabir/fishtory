"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
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

const COLORS = ["#2f3a32", "#3b82f6", "#f59e0b"];

const StockLevelsChart = ({ data }) => {
  return (
    <ChartCard title="Stock Levels by Category" sub="Current inventory units">
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
            dataKey="category"
            tick={{ fontSize: 12, fill: "#374151" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip {...tooltipStyle} formatter={(v) => [v, "Units in stock"]} />
          <Bar dataKey="stock" radius={[4, 4, 0, 0]} maxBarSize={48}>
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default StockLevelsChart;
