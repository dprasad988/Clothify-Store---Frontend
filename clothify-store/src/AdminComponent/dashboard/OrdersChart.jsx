import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data for the orders chart
const data = [
  { date: "2023-11-01", orders: 120 },
  { date: "2023-11-02", orders: 200 },
  { date: "2023-11-03", orders: 150 },
  { date: "2023-11-04", orders: 180 },
  { date: "2023-11-05", orders: 220 },
  { date: "2023-11-06", orders: 160 },
  { date: "2023-11-07", orders: 210 },
];

function OrdersChart() {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3 className="text-center">Order Trends (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="orders" stroke="#8884d8" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OrdersChart;
