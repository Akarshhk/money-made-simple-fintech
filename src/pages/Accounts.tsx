
import React from "react";
import Layout from "../components/Layout";

const Accounts = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Accounts</h2>
          <p className="text-muted-foreground">Manage your financial accounts.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Account management functionality will be implemented here.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Accounts;
