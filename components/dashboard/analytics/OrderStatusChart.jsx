"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
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

const renderPieLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  if (percent < 0.05) return null;
  const RADIAN = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={11}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const OrderStatusChart = ({ data }) => {
  return (
    <ChartCard title="Orders by Status" sub="All time breakdown">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={renderPieLabel}
            >
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip {...tooltipStyle} formatter={(v, n) => [v, n]} />
          </PieChart>
        </ResponsiveContainer>

        <div className="space-y-2.5 flex-1">
          {data.map((s) => (
            <div
              key={s.name}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: s.fill }}
                />
                <span className="text-gray-600">{s.name}</span>
              </div>
              <span className="font-semibold text-gray-900">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
};

export default OrderStatusChart;
