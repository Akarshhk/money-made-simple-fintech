
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

type Budget = {
  id: string;
  category: string;
  allocated: number;
  spent: number;
};

const Budgets = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [newBudget, setNewBudget] = useState({
    category: "",
    allocated: ""
  });

  const [budgets, setBudgets] = useState<Budget[]>([
    {
      id: "b1",
      category: "Food & Dining",
      allocated: 15000,
      spent: 10234
    },
    {
      id: "b2",
      category: "Utilities",
      allocated: 8000,
      spent: 5675
    },
    {
      id: "b3",
      category: "Entertainment",
      allocated: 5000,
      spent: 2750
    },
    {
      id: "b4",
      category: "Shopping",
      allocated: 10000,
      spent: 8465
    },
    {
      id: "b5",
      category: "Transportation",
      allocated: 4000,
      spent: 3250
    }
  ]);

  const handleOpenDialog = (budget?: Budget) => {
    if (budget) {
      setEditingBudget(budget);
      setNewBudget({
        category: budget.category,
        allocated: budget.allocated.toString()
      });
    } else {
      setEditingBudget(null);
      setNewBudget({ category: "", allocated: "" });
    }
    setIsDialogOpen(true);
  };

  const handleSaveBudget = () => {
    if (!newBudget.category || !newBudget.allocated) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    if (editingBudget) {
      const updatedBudgets = budgets.map(budget => 
        budget.id === editingBudget.id 
          ? { 
              ...budget, 
              category: newBudget.category, 
              allocated: parseFloat(newBudget.allocated)
            } 
          : budget
      );
      setBudgets(updatedBudgets);
      toast({
        title: "Budget Updated",
        description: `Your ${newBudget.category} budget has been updated.`
      });
    } else {
      const newBudgetItem = {
        id: `b${budgets.length + 1}`,
        category: newBudget.category,
        allocated: parseFloat(newBudget.allocated),
        spent: 0
      };
      setBudgets([...budgets, newBudgetItem]);
      toast({
        title: "Budget Added",
        description: `Your ${newBudget.category} budget has been added.`
      });
    }

    setIsDialogOpen(false);
    setNewBudget({ category: "", allocated: "" });
    setEditingBudget(null);
  };

  const handleDelete = (id: string) => {
    setBudgets(budgets.filter(budget => budget.id !== id));
    toast({
      title: "Budget Deleted",
      description: "The budget has been removed."
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Budgets</h2>
            <p className="text-muted-foreground">Plan and track your monthly budgets.</p>
          </div>
          <Button onClick={() => handleOpenDialog()} className="gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Add Budget</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgets.map((budget) => {
            const percentage = (budget.spent / budget.allocated) * 100;
            const remaining = budget.allocated - budget.spent;
            
            return (
              <Card key={budget.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle>{budget.category}</CardTitle>
                    <div className="space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => handleOpenDialog(budget)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(budget.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Monthly Budget: ₹{budget.allocated.toLocaleString('en-IN')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="progress-bar">
                      <div 
                        className={`progress-value ${percentage > 100 ? 'bg-red-500' : ''}`} 
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>Spent: ₹{budget.spent.toLocaleString('en-IN')}</div>
                      <div className={remaining < 0 ? 'text-red-500' : ''}>
                        {remaining < 0 
                          ? `Overspent: ₹${Math.abs(remaining).toLocaleString('en-IN')}` 
                          : `Remaining: ₹${remaining.toLocaleString('en-IN')}`}
                      </div>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      {percentage.toFixed(0)}% Used
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingBudget ? 'Edit' : 'Add'} Budget</DialogTitle>
            <DialogDescription>
              {editingBudget 
                ? 'Update your budget allocation.' 
                : 'Create a new budget category to track your spending.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                value={newBudget.category}
                onChange={(e) => setNewBudget({...newBudget, category: e.target.value})}
                placeholder="e.g., Food & Dining"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="allocated" className="text-right">
                Amount (₹)
              </Label>
              <Input
                id="allocated"
                type="number"
                value={newBudget.allocated}
                onChange={(e) => setNewBudget({...newBudget, allocated: e.target.value})}
                placeholder="e.g., 10000"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveBudget}>
              {editingBudget ? 'Save Changes' : 'Add Budget'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Budgets;
