import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Mail, Phone, Calendar } from "lucide-react";

export const TenantList = () => {
  const [tenants, setTenants] = useState([
    {
      id: 1,
      name: "Raju",
      email: "raju@gmail.com",
      phone: "(555) 123-4567",
      property: "Sunset Apartments 2A",
      leaseStart: "2024-01-01",
      leaseEnd: "2024-12-31",
      rent: 1200,
      status: "active"
    },
    {
      id: 2,
      name: "Geetha",
      email: "geetha@gmail.com",
      phone: "(555) 987-6543",
      property: "Oak View Condos 3B",
      leaseStart: "2023-06-01",
      leaseEnd: "2024-05-31",
      rent: 1500,
      status: "active"
    },
    {
      id: 3,
      name: "sita",
      email: "sita@gmail.com",
      phone: "(555) 456-7890",
      property: "Pine Heights Studio 1C",
      leaseStart: "2024-02-01",
      leaseEnd: "2025-01-31",
      rent: 900,
      status: "pending"
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    property: "",
    leaseStart: "",
    leaseEnd: "",
    rent: "",
    status: "active"
  });

  const properties = ["Sunset Apartments 2A", "Oak View Condos 3B", "Pine Heights Studio 1C"];

  const handleAddTenant = () => {
    setEditingTenant(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      property: "",
      leaseStart: "",
      leaseEnd: "",
      rent: "",
      status: "active"
    });
    setIsDialogOpen(true);
  };

  const handleEditTenant = (tenant: any) => {
    setEditingTenant(tenant);
    setFormData({
      name: tenant.name,
      email: tenant.email,
      phone: tenant.phone,
      property: tenant.property,
      leaseStart: tenant.leaseStart,
      leaseEnd: tenant.leaseEnd,
      rent: tenant.rent.toString(),
      status: tenant.status
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTenant) {
      setTenants(prev => prev.map(t => 
        t.id === editingTenant.id 
          ? { ...t, ...formData, rent: parseInt(formData.rent) }
          : t
      ));
    } else {
      const newTenant = {
        id: Date.now(),
        ...formData,
        rent: parseInt(formData.rent)
      };
      setTenants(prev => [...prev, newTenant]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setTenants(prev => prev.filter(t => t.id !== id));
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tenant Management</CardTitle>
            <CardDescription>Manage tenant information and lease details</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddTenant} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Tenant
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingTenant ? 'Edit Tenant' : 'Add New Tenant'}
                </DialogTitle>
                <DialogDescription>
                  {editingTenant ? 'Update tenant details' : 'Enter tenant information'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter email address"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter phone number"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="property">Property</Label>
                  <Select value={formData.property} onValueChange={(value) => setFormData(prev => ({ ...prev, property: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.map((property) => (
                        <SelectItem key={property} value={property}>
                          {property}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="leaseStart">Lease Start</Label>
                    <Input
                      id="leaseStart"
                      type="date"
                      value={formData.leaseStart}
                      onChange={(e) => setFormData(prev => ({ ...prev, leaseStart: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="leaseEnd">Lease End</Label>
                    <Input
                      id="leaseEnd"
                      type="date"
                      value={formData.leaseEnd}
                      onChange={(e) => setFormData(prev => ({ ...prev, leaseEnd: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="rent">Monthly Rent</Label>
                  <Input
                    id="rent"
                    type="number"
                    value={formData.rent}
                    onChange={(e) => setFormData(prev => ({ ...prev, rent: e.target.value }))}
                    placeholder="Enter monthly rent"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {editingTenant ? 'Update Tenant' : 'Add Tenant'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {tenants.map((tenant) => (
            <div key={tenant.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{tenant.name}</h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {tenant.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {tenant.phone}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditTenant(tenant)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(tenant.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Property</p>
                  <p className="text-sm text-muted-foreground">{tenant.property}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Monthly Rent</p>
                  <p className="text-sm text-muted-foreground">${tenant.rent}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Lease Period</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {tenant.leaseStart} to {tenant.leaseEnd}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <Badge variant={tenant.status === 'active' ? 'default' : 'secondary'}>
                    {tenant.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};