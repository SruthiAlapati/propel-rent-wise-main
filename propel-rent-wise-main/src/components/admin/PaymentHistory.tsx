import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Calendar, DollarSign } from "lucide-react";
import { useState } from "react";

export const PaymentHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const payments = [
    {
      id: 1,
      tenant: "Raju",
      property: "Sunset Apartments 2A",
      amount: 85000,
      date: "2024-01-15",
      dueDate: "2024-01-01",
      status: "paid",
      method: "Bank Transfer",
      late: false
    },
    {
      id: 2,
      tenant: "Geetha",
      property: "Oak View Condos 3B",
      amount: 105000,
      date: "2024-01-14",
      dueDate: "2024-01-01",
      status: "paid",
      method: "Credit Card",
      late: false
    },
    {
      id: 3,
      tenant: "sita",
      property: "Pine Heights Studio 1C",
      amount: 65000,
      date: null,
      dueDate: "2024-01-01",
      status: "pending",
      method: null,
      late: true
    },
    {
      id: 4,
      tenant: "Priya",
      property: "Downtown Loft 4A",
      amount: 125000,
      date: "2023-12-30",
      dueDate: "2023-12-01",
      status: "paid",
      method: "Bank Transfer",
      late: false
    },
    {
      id: 5,
      tenant: "Ram",
      property: "Garden Villa 5B",
      amount: 95000,
      date: null,
      dueDate: "2024-01-01",
      status: "overdue",
      method: null,
      late: true
    },
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.property.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0);

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Track all rental payments and their status</CardDescription>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-gradient-to-r from-success/10 to-success/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-success" />
                <div>
                  <p className="text-sm font-medium">Total Collected</p>
                  <p className="text-2xl font-bold text-success">₹{(totalPaid / 100000).toFixed(1)}L</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-warning/10 to-warning/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-sm font-medium">Pending Payments</p>
                  <p className="text-2xl font-bold text-warning">₹{(totalPending / 100000).toFixed(1)}L</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-destructive/10 to-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-destructive" />
                <div>
                  <p className="text-sm font-medium">Overdue Payments</p>
                  <p className="text-2xl font-bold text-destructive">₹{(totalOverdue / 100000).toFixed(1)}L</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by tenant or property..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payments Table */}
        <div className="border rounded-lg">
          <div className="grid grid-cols-6 gap-4 p-4 border-b bg-muted/50 font-medium text-sm">
            <div>Tenant</div>
            <div>Property</div>
            <div>Amount</div>
            <div>Due Date</div>
            <div>Status</div>
            <div>Payment Date</div>
          </div>
          <div className="divide-y">
            {filteredPayments.map((payment) => (
              <div key={payment.id} className="grid grid-cols-6 gap-4 p-4 items-center">
                <div>
                  <p className="font-medium">{payment.tenant}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{payment.property}</p>
                </div>
                <div>
                  <p className="font-medium">₹{payment.amount.toLocaleString()}</p>
                  {payment.method && (
                    <p className="text-xs text-muted-foreground">{payment.method}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm">{payment.dueDate}</p>
                </div>
                <div>
                  <Badge 
                    variant={
                      payment.status === 'paid' ? 'default' : 
                      payment.status === 'pending' ? 'secondary' : 
                      'destructive'
                    }
                  >
                    {payment.status}
                  </Badge>
                  {payment.late && payment.status !== 'paid' && (
                    <p className="text-xs text-destructive mt-1">Late</p>
                  )}
                </div>
                <div>
                  <p className="text-sm">
                    {payment.date || '-'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};