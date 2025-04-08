
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

type SavingGoal = {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
};

const SavingGoals = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    target: "",
    deadline: ""
  });
  
  const [goals, setGoals] = useState<SavingGoal[]>([
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
  ]);

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.target || !newGoal.deadline) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    const goal = {
      id: `g${goals.length + 1}`,
      name: newGoal.name,
      target: parseFloat(newGoal.target),
      current: 0,
      deadline: newGoal.deadline
    };

    setGoals([...goals, goal]);
    setNewGoal({ name: "", target: "", deadline: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Goal Added",
      description: `Your ${goal.name} goal has been added successfully.`
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Saving Goals</CardTitle>
        <Button size="sm" variant="outline" className="h-8 gap-1" onClick={() => setIsDialogOpen(true)}>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Saving Goal</DialogTitle>
            <DialogDescription>
              Create a new saving goal to track your financial progress.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="goal-name" className="text-right">
                Goal Name
              </Label>
              <Input
                id="goal-name"
                value={newGoal.name}
                onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                placeholder="e.g., New Car"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="goal-amount" className="text-right">
                Target Amount (₹)
              </Label>
              <Input
                id="goal-amount"
                type="number"
                value={newGoal.target}
                onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                placeholder="e.g., 100000"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="goal-deadline" className="text-right">
                Deadline
              </Label>
              <Input
                id="goal-deadline"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                placeholder="e.g., December 2025"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddGoal}>Add Goal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SavingGoals;
