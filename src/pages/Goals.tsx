
import React from "react";
import Layout from "../components/Layout";
import SavingGoals from "../components/dashboard/SavingGoals";

const Goals = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Saving Goals</h2>
          <p className="text-muted-foreground">Track progress toward your financial targets.</p>
        </div>
        
        <SavingGoals />
      </div>
    </Layout>
  );
};

export default Goals;
