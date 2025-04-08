
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

type ExpenseCategory = {
  name: string;
  value: number;
  color: string;
};

const ExpenseBreakdown = () => {
  const data: ExpenseCategory[] = [
    { name: "Housing", value: 90000, color: "#1A365D" },
    { name: "Food", value: 45000, color: "#4ECCA3" },
    { name: "Transportation", value: 30000, color: "#3498DB" },
    { name: "Utilities", value: 22500, color: "#F39C12" },
    { name: "Entertainment", value: 15000, color: "#E74C3C" },
    { name: "Other", value: 10155.75, color: "#9B59B6" },
  ];

  return (
    <Card className="col-span-4 lg:col-span-2">
      <CardHeader>
        <CardTitle>Monthly Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-1 mt-4">
          {data.map((category) => (
            <div key={category.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-3 w-3 mr-2" style={{ backgroundColor: category.color }}></div>
                <span>{category.name}</span>
              </div>
              <span className="font-medium">₹{category.value.toLocaleString('en-IN')}</span>
            </div>
          ))}
          <div className="flex items-center justify-between pt-2 border-t mt-2">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">₹{data.reduce((acc, item) => acc + item.value, 0).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseBreakdown;
