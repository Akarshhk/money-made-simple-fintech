
import React from "react";
import Layout from "../components/Layout";

const Budgets = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
          <p className="text-muted-foreground">Plan and track your monthly budgets.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Budget planning functionality will be implemented here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Budgets;
