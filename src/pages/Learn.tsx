
import React from "react";
import Layout from "../components/Layout";
import FinancialTips from "../components/dashboard/FinancialTips";

const Learn = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Financial Learning</h2>
          <p className="text-muted-foreground">Learn about personal finance and money management.</p>
        </div>
        
        <FinancialTips />
        
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h3 className="text-xl font-semibold">Financial Education Resources</h3>
          <p>More educational content will be added here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Learn;
