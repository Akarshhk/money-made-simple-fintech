
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Coffee, ShoppingCart, Home, Car, Utensils } from "lucide-react";

type Transaction = {
  id: string;
  name: string;
  amount: number;
  type: "expense" | "income";
  category: string;
  icon: React.ReactNode;
  date: string;
};

const transactions: Transaction[] = [
  {
    id: "t1",
    name: "Rent Payment",
    amount: 1200,
    type: "expense",
    category: "Housing",
    icon: <Home className="h-4 w-4" />,
    date: "Apr 1, 2025"
  },
  {
    id: "t2",
    name: "Starbucks Coffee",
    amount: 5.75,
    type: "expense",
    category: "Food",
    icon: <Coffee className="h-4 w-4" />,
    date: "Apr 5, 2025"
  },
  {
    id: "t3",
    name: "Salary Deposit",
    amount: 3210,
    type: "income",
    category: "Paycheck",
    icon: <ArrowUpRight className="h-4 w-4" />,
    date: "Apr 5, 2025"
  },
  {
    id: "t4",
    name: "Grocery Shopping",
    amount: 128.42,
    type: "expense",
    category: "Food",
    icon: <ShoppingCart className="h-4 w-4" />,
    date: "Apr 6, 2025"
  },
  {
    id: "t5",
    name: "Restaurant Dinner",
    amount: 65.30,
    type: "expense",
    category: "Food",
    icon: <Utensils className="h-4 w-4" />,
    date: "Apr 7, 2025"
  },
  {
    id: "t6",
    name: "Car Insurance",
    amount: 89.99,
    type: "expense",
    category: "Transportation",
    icon: <Car className="h-4 w-4" />,
    date: "Apr 8, 2025"
  }
];

const RecentTransactions = () => {
  return (
    <Card className="col-span-4 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center">
                <div className={`rounded-full p-2 mr-3 ${
                  transaction.type === "expense" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"
                }`}>
                  {transaction.icon}
                </div>
                <div>
                  <div className="font-medium">{transaction.name}</div>
                  <div className="text-xs text-muted-foreground">{transaction.date}</div>
                </div>
              </div>
              <div className={`font-semibold ${
                transaction.type === "expense" ? "text-red-500" : "text-green-500"
              }`}>
                {transaction.type === "expense" ? "-" : "+"}${transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
