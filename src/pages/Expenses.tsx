
import React from "react";
import Layout from "../components/Layout";

const Expenses = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Expenses</h2>
          <p className="text-muted-foreground">Track and manage your monthly expenses.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Expense tracking functionality will be implemented here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Expenses;
