import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button"; // must match exact path of your new button.tsx
import { Badge } from "@/components/ui/badge";
import { PropertyList } from "./PropertyList";
import { TenantList } from "./TenantList";
import { PaymentHistory } from "./PaymentHistory";
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  LogOut,
} from "lucide-react";

interface AdminDashboardProps {
  email: string;
  onLogout: () => void;
}

export const AdminDashboard = ({ email, onLogout }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - replace with real data from Supabase
  const stats = {
    totalProperties: 12,
    totalTenants: 18,
    monthlyRevenue: 1850000, // ₹18.5L
    occupancyRate: 85,
  };

  const recentPayments = [
    {
      id: 1,
      tenant: "Raju",
      property: "Sunset Apartments 2A",
      amount: 85000,
      date: "2024-01-15",
      status: "paid",
    },
    {
      id: 2,
      tenant: "Geetha",
      property: "Oak View 3B",
      amount: 105000,
      date: "2024-01-14",
      status: "paid",
    },
    {
      id: 3,
      tenant: "Sita",
      property: "Pine Heights 1C",
      amount: 75000,
      date: "2024-01-13",
      status: "pending",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50">
      {/* Header */}
      <header className="border-b bg-white/70 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo + Title */}
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Property Manager</h1>
                <p className="text-sm text-muted-foreground">
                  Admin Dashboard
                </p>
              </div>
            </div>

            {/* User Info + Logout */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="welcome-text text-lg">Welcome, Admin</p>
                <p className="text-xs text-muted-foreground">{email}</p>
              </div>
              <Button
                variant="outline"
                onClick={onLogout}
                className="gap-2 hover:shadow-medium transition-all"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          {/* Tabs Navigation */}
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="tenants">Tenants</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {/* Properties */}
              <Card className="shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Properties
                  </CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.totalProperties}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>

              {/* Tenants */}
              <Card className="shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Tenants
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.totalTenants}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +3 from last month
                  </p>
                </CardContent>
              </Card>

              {/* Revenue */}
              <Card className="shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Monthly Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₹{(stats.monthlyRevenue / 100000).toFixed(1)}L
                  </div>
                  <p className="text-xs text-success">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>

              {/* Occupancy */}
              <Card className="shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Occupancy Rate
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.occupancyRate}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +5% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Payments */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>
                  Latest rental payments from tenants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{payment.tenant}</p>
                        <p className="text-sm text-muted-foreground">
                          {payment.property}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          ₹{payment.amount.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              payment.status === "paid"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {payment.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {payment.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Properties Tab */}
          <TabsContent value="properties">
            <PropertyList />
          </TabsContent>

          {/* Tenants Tab */}
          <TabsContent value="tenants">
            <TenantList />
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments">
            <PaymentHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
