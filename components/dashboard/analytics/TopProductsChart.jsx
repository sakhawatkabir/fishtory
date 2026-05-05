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

const TopProductsChart = ({ data }) => {
  return (
    <ChartCard title="Top Products by Units Sold" sub="All time">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 16, left: 8, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f3f4f6"
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 11, fill: "#374151" }}
            tickLine={false}
            axisLine={false}
            width={130}
            tickFormatter={(v) => (v.length > 18 ? v.slice(0, 18) + "…" : v)}
          />
          <Tooltip {...tooltipStyle} formatter={(v) => [v, "Units sold"]} />
          <Bar
            dataKey="sold"
            fill="#2f3a32"
            radius={[0, 4, 4, 0]}
            maxBarSize={22}
            name="sold"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default TopProductsChart;
