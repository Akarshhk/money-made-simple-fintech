
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CreditCard } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const DepositFunds = () => {
  const [amount, setAmount] = useState<string>("1000");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const loadRazorpay = () => {
    return new Promise<boolean>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleDeposit = async () => {
    setIsLoading(true);
    
    try {
      const amountInPaise = parseInt(amount) * 100; // Convert to paise
      const razorpayLoaded = await loadRazorpay();
      
      if (!razorpayLoaded) {
        toast({
          title: "Error",
          description: "Razorpay SDK failed to load. Please try again later.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // In a real app, you would create an order on your backend
      // Here we're creating a mock order for demonstration
      const options = {
        key: "rzp_test_TyIaBpIcd9X4JU", // This is a test key
        amount: amountInPaise,
        currency: "INR",
        name: "MoneyMadeSimple",
        description: "Add funds to your savings account",
        image: "https://lovable.dev/opengraph-image-p98pqg.png",
        handler: function(response: any) {
          // Handle successful payment
          toast({
            title: "Deposit Successful!",
            description: `₹${parseInt(amount).toLocaleString('en-IN')} has been added to your account.`,
          });
          console.log("Payment ID: ", response.razorpay_payment_id);
        },
        prefill: {
          name: "Demo User",
          email: "user@example.com",
          contact: "9876543210"
        },
        theme: {
          color: "#1A365D"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      console.error("Razorpay error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const predefinedAmounts = [1000, 5000, 10000, 25000];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-secondary" />
          <span>Deposit Funds</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Select or enter amount to deposit</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {predefinedAmounts.map((presetAmount) => (
                <Button
                  key={presetAmount}
                  variant={amount === presetAmount.toString() ? "default" : "outline"}
                  onClick={() => setAmount(presetAmount.toString())}
                  className="w-full"
                >
                  ₹{presetAmount.toLocaleString('en-IN')}
                </Button>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full"
                  placeholder="Enter amount"
                  min="100"
                />
              </div>
              <Button 
                onClick={handleDeposit}
                disabled={isLoading || parseInt(amount) < 100}
                className="min-w-[100px]"
              >
                {isLoading ? "Processing..." : "Deposit"}
              </Button>
            </div>
          </div>

          <div className="text-xs text-muted-foreground mt-4">
            <p>• Minimum deposit amount: ₹100</p>
            <p>• Funds will be available immediately after successful payment</p>
            <p>• Deposits are processed securely through Razorpay</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepositFunds;
