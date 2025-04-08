
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

type SavingGoal = {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
};

const goals: SavingGoal[] = [
  {
    id: "g1",
    name: "Emergency Fund",
    target: 750000,
    current: 317700,
    deadline: "December 2025"
  },
  {
    id: "g2",
    name: "Vacation",
    target: 225000,
    current: 112500,
    deadline: "August 2025"
  },
  {
    id: "g3",
    name: "New Laptop",
    target: 150000,
    current: 60000,
    deadline: "October 2025"
  }
];

const SavingGoals = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Saving Goals</CardTitle>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Add Goal</span>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal) => {
            const percentage = (goal.current / goal.target) * 100;
            
            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium">{goal.name}</div>
                  <div className="text-sm text-muted-foreground">{goal.deadline}</div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div>₹{goal.current.toLocaleString('en-IN')}</div>
                  <div>₹{goal.target.toLocaleString('en-IN')}</div>
                </div>
                
                <div className="progress-bar">
                  <div className="progress-value" style={{ width: `${percentage}%` }}></div>
                </div>
                
                <div className="text-right text-xs text-muted-foreground">
                  {percentage.toFixed(0)}% Complete
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingGoals;
