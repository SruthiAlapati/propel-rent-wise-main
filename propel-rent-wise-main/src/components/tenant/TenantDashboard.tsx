import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PaymentForm } from "./PaymentForm";
import { Building2, MapPin, Calendar, DollarSign, CreditCard, History, LogOut } from "lucide-react";
import { useState } from "react";

interface TenantDashboardProps {
  email: string;
  onLogout: () => void;
}

export const TenantDashboard = ({ email, onLogout }: TenantDashboardProps) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Extract name from email or use the email itself
  const userName = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Mock tenant data - replace with real data from Supabase
  const tenantData = {
    name: userName,
    property: {
      name: "Sunset Apartments",
      unit: "2A",
      address: "123 Main St, Downtown",
      rent: 85000,
      leaseStart: "2024-01-01",
      leaseEnd: "2024-12-31"
    },
    payments: [
      { id: 1, amount: 85000, date: "2024-01-15", status: "paid", method: "Bank Transfer" },
      { id: 2, amount: 85000, date: "2023-12-15", status: "paid", method: "Credit Card" },
      { id: 3, amount: 85000, date: "2023-11-15", status: "paid", method: "Bank Transfer" },
    ],
    nextPaymentDue: "2024-02-01",
    balance: 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50">
      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Property Manager</h1>
                <p className="text-sm text-muted-foreground">Tenant Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="welcome-text text-lg">Welcome, {tenantData.name}</p>
                <p className="text-xs text-muted-foreground">Tenant Portal</p>
              </div>
              <Button variant="outline" onClick={onLogout} className="gap-2 hover:shadow-medium transition-all">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-6">
        {/* Property Information */}
        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              Your Property
            </CardTitle>
            <CardDescription className="text-muted-foreground/80">Current rental property details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold">{tenantData.property.name} - Unit {tenantData.property.unit}</h3>
              <div className="flex items-center gap-1 text-muted-foreground mt-1">
                <MapPin className="h-4 w-4" />
                <span>{tenantData.property.address}</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Monthly Rent</p>
                <p className="text-2xl font-bold text-orange-600">₹{tenantData.property.rent.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Lease Period</p>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{tenantData.property.leaseStart} to {tenantData.property.leaseEnd}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Account Balance</p>
                <p className={`text-2xl font-bold ${tenantData.balance === 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{tenantData.balance}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Make Payment
              </CardTitle>
              <CardDescription>Pay your monthly rent online</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Next Payment Due</span>
                  <Badge variant="secondary">{tenantData.nextPaymentDue}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Amount Due</span>
                  <span className="text-xl font-bold">₹{tenantData.property.rent.toLocaleString()}</span>
                </div>
              </div>
              
              {!showPaymentForm ? (
                <Button 
                  onClick={() => setShowPaymentForm(true)}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Pay Rent Now
                </Button>
              ) : (
                <PaymentForm 
                  amount={tenantData.property.rent}
                  onClose={() => setShowPaymentForm(false)}
                />
              )}
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Payment History
              </CardTitle>
              <CardDescription>Your recent rent payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tenantData.payments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">₹{payment.amount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{payment.method}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="default">
                        {payment.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">{payment.date}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View All Payments
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};