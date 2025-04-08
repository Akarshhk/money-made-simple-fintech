
import React from "react";
import Layout from "../components/Layout";
import FinancialOverview from "../components/dashboard/FinancialOverview";
import ExpenseBreakdown from "../components/dashboard/ExpenseBreakdown";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import SavingGoals from "../components/dashboard/SavingGoals";
import FinancialTips from "../components/dashboard/FinancialTips";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's your financial overview.</p>
        </div>
        
        <FinancialOverview />
        
        <div className="grid grid-cols-4 gap-4">
          <ExpenseBreakdown />
          <RecentTransactions />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SavingGoals />
          <FinancialTips />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
