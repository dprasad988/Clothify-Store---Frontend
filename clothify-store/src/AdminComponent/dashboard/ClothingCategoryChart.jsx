import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample data for orders by clothing category
const data = [
  { name: "Shirts", value: 300 },
  { name: "Pants", value: 200 },
  { name: "Jackets", value: 150 },
  { name: "Accessories", value: 100 },
  { name: "Shoes", value: 250 },
];

// Colors for each category in the pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

function ClothingCategoryChart() {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3 className="text-center">Orders by Clothing Category</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ClothingCategoryChart;
