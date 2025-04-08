
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const tips = [
  {
    id: 1,
    title: "50/30/20 Budgeting Rule",
    content: "Allocate 50% of your income to needs, 30% to wants, and 20% to savings and debt repayment for a balanced budget.",
  },
  {
    id: 2,
    title: "Emergency Fund Importance",
    content: "Aim to save 3-6 months of expenses in an emergency fund to protect against unexpected financial setbacks.",
  },
  {
    id: 3,
    title: "Reduce Unnecessary Subscriptions",
    content: "Review your monthly subscriptions and cancel any you don't use regularly to save money over time.",
  }
];

const FinancialTips = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-secondary" />
          <span>Financial Tips & Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {tips.map((tip) => (
            <div key={tip.id} className="space-y-2">
              <h4 className="font-medium">{tip.title}</h4>
              <p className="text-sm text-muted-foreground">{tip.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialTips;
