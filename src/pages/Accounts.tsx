
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal, ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Account = {
  id: string;
  name: string;
  type: string;
  balance: number;
  accountNumber: string;
};

type Transaction = {
  id: string;
  accountId: string;
  amount: number;
  type: "credit" | "debit";
  description: string;
  date: string;
};

const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: "a1",
      name: "Savings Account",
      type: "Savings",
      balance: 450000,
      accountNumber: "XXXX4567"
    },
    {
      id: "a2",
      name: "Current Account",
      type: "Current",
      balance: 175000,
      accountNumber: "XXXX7890"
    },
    {
      id: "a3",
      name: "Fixed Deposit",
      type: "FD",
      balance: 500000,
      accountNumber: "XXXX1234"
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "t1",
      accountId: "a1",
      amount: 50000,
      type: "credit",
      description: "Salary Deposit",
      date: "Apr 5, 2025"
    },
    {
      id: "t2",
      accountId: "a1",
      amount: 15000,
      type: "debit",
      description: "Rent Payment",
      date: "Apr 2, 2025"
    },
    {
      id: "t3",
      accountId: "a2",
      amount: 35000,
      type: "credit",
      description: "Client Payment",
      date: "Apr 3, 2025"
    },
    {
      id: "t4",
      accountId: "a2",
      amount: 12500,
      type: "debit",
      description: "Utility Bills",
      date: "Apr 4, 2025"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [transactionType, setTransactionType] = useState<"credit" | "debit">("credit");
  const [transactionData, setTransactionData] = useState({
    amount: "",
    description: ""
  });

  const handleOpenDialog = (accountId: string) => {
    setSelectedAccountId(accountId);
    setTransactionData({ amount: "", description: "" });
    setIsDialogOpen(true);
  };

  const handleAddTransaction = () => {
    if (!selectedAccountId || !transactionData.amount || !transactionData.description) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(transactionData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    // Add new transaction
    const newTransaction: Transaction = {
      id: `t${transactions.length + 1}`,
      accountId: selectedAccountId,
      amount,
      type: transactionType,
      description: transactionData.description,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setTransactions([newTransaction, ...transactions]);

    // Update account balance
    setAccounts(accounts.map(account => {
      if (account.id === selectedAccountId) {
        return {
          ...account,
          balance: transactionType === 'credit' 
            ? account.balance + amount 
            : account.balance - amount
        };
      }
      return account;
    }));

    setIsDialogOpen(false);
    toast({
      title: "Transaction Added",
      description: `${transactionType === 'credit' ? 'Deposit' : 'Withdrawal'} of ₹${amount.toLocaleString('en-IN')} was successful.`
    });
  };

  const getAccountTransactions = (accountId: string) => {
    return transactions.filter(transaction => transaction.accountId === accountId);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Accounts</h2>
          <p className="text-muted-foreground">Manage your financial accounts.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((account) => (
            <Card key={account.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>{account.name}</CardTitle>
                  <CardDescription>{account.type} • {account.accountNumber}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Account Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {
                      setTransactionType('credit');
                      handleOpenDialog(account.id);
                    }}>
                      Deposit Funds
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      setTransactionType('debit');
                      handleOpenDialog(account.id);
                    }}>
                      Withdraw Funds
                    </DropdownMenuItem>
                    <DropdownMenuItem>View Statements</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Current Balance</p>
                    <p className="text-2xl font-semibold">₹{account.balance.toLocaleString('en-IN')}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Recent Activity</p>
                    {getAccountTransactions(account.id).slice(0, 2).map(transaction => (
                      <div key={transaction.id} className="flex items-center justify-between py-1">
                        <div className="flex items-center">
                          <div className={`rounded-full p-1 mr-2 ${
                            transaction.type === "debit" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"
                          }`}>
                            {transaction.type === "debit" ? 
                              <ArrowDownRight className="h-3 w-3" /> : 
                              <ArrowUpRight className="h-3 w-3" />
                            }
                          </div>
                          <div className="text-xs">{transaction.description}</div>
                        </div>
                        <div className={`text-xs ${
                          transaction.type === "debit" ? "text-red-500" : "text-green-500"
                        }`}>
                          {transaction.type === "debit" ? "-" : "+"}₹{transaction.amount.toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setTransactionType('credit');
                        handleOpenDialog(account.id);
                      }}
                    >
                      Deposit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setTransactionType('debit');
                        handleOpenDialog(account.id);
                      }}
                    >
                      Withdraw
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Card className="flex flex-col items-center justify-center border-dashed">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">Add Account</h3>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Connect a new bank account to track your finances.
              </p>
              <Button variant="outline">Link Bank Account</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="deposits">Deposits</TabsTrigger>
              <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="bg-white rounded-lg shadow">
                {transactions.map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border-b last:border-0">
                    <div className="flex items-center">
                      <div className={`rounded-full p-2 mr-3 ${
                        transaction.type === "debit" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"
                      }`}>
                        {transaction.type === "debit" ? 
                          <ArrowDownRight className="h-4 w-4" /> : 
                          <ArrowUpRight className="h-4 w-4" />
                        }
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.date} • {accounts.find(a => a.id === transaction.accountId)?.name}
                        </p>
                      </div>
                    </div>
                    <p className={`font-semibold ${
                      transaction.type === "debit" ? "text-red-500" : "text-green-500"
                    }`}>
                      {transaction.type === "debit" ? "-" : "+"}₹{transaction.amount.toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="deposits">
              <div className="bg-white rounded-lg shadow">
                {transactions
                  .filter(t => t.type === "credit")
                  .map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border-b last:border-0">
                      <div className="flex items-center">
                        <div className="rounded-full p-2 mr-3 bg-green-100 text-green-500">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.date} • {accounts.find(a => a.id === transaction.accountId)?.name}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-green-500">
                        +₹{transaction.amount.toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="withdrawals">
              <div className="bg-white rounded-lg shadow">
                {transactions
                  .filter(t => t.type === "debit")
                  .map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border-b last:border-0">
                      <div className="flex items-center">
                        <div className="rounded-full p-2 mr-3 bg-red-100 text-red-500">
                          <ArrowDownRight className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.date} • {accounts.find(a => a.id === transaction.accountId)?.name}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-red-500">
                        -₹{transaction.amount.toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {transactionType === 'credit' ? 'Deposit Funds' : 'Withdraw Funds'}
            </DialogTitle>
            <DialogDescription>
              {transactionType === 'credit'
                ? 'Add money to your account'
                : 'Withdraw money from your account'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount (₹)
              </Label>
              <Input
                id="amount"
                type="number"
                value={transactionData.amount}
                onChange={(e) => setTransactionData({...transactionData, amount: e.target.value})}
                placeholder="Enter amount"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={transactionData.description}
                onChange={(e) => setTransactionData({...transactionData, description: e.target.value})}
                placeholder="Transaction description"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddTransaction}>
              {transactionType === 'credit' ? 'Deposit' : 'Withdraw'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Accounts;
