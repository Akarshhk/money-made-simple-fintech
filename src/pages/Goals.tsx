
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

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Goal Planning Tips</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Start Small</h4>
              <p className="text-sm">Begin with achievable targets to build momentum and confidence in your saving abilities.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Be Specific</h4>
              <p className="text-sm">Define exactly what you're saving for and set a specific amount and deadline.</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Automate Savings</h4>
              <p className="text-sm">Set up automatic transfers to your savings account each month to stay consistent.</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Track Progress</h4>
              <p className="text-sm">Regularly review your goals to stay motivated and make adjustments as needed.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Goals;
