import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, MapPin, DollarSign } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const propertyImages = [property1, property2, property3, property4];

export const PropertyList = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Sunset Apartments",
      address: "123 Main St, Downtown",
      rent: 1200,
      status: "occupied",
      tenant: "Raju"
    },
    {
      id: 2,
      name: "Oak View Condos",
      address: "456 Oak Ave, Midtown",
      rent: 1500,
      status: "occupied",
      tenant: "Geetha"
    },
    {
      id: 3,
      name: "Pine Heights Studio",
      address: "789 Pine Rd, Uptown",
      rent: 900,
      status: "vacant",
      tenant: null
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    rent: "",
    status: "vacant"
  });

  const handleAddProperty = () => {
    setEditingProperty(null);
    setFormData({ name: "", address: "", rent: "", status: "vacant" });
    setIsDialogOpen(true);
  };

  const handleEditProperty = (property: any) => {
    setEditingProperty(property);
    setFormData({
      name: property.name,
      address: property.address,
      rent: property.rent.toString(),
      status: property.status
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProperty) {
      setProperties(prev => prev.map(p => 
        p.id === editingProperty.id 
          ? { ...p, ...formData, rent: parseInt(formData.rent) }
          : p
      ));
    } else {
      const newProperty = {
        id: Date.now(),
        ...formData,
        rent: parseInt(formData.rent),
        tenant: null
      };
      setProperties(prev => [...prev, newProperty]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Property Management</CardTitle>
            <CardDescription>Manage your property listings and details</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddProperty} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </DialogTitle>
                <DialogDescription>
                  {editingProperty ? 'Update property details' : 'Enter property information'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Property Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter property name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Enter property address"
                    required
                  />
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
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vacant">Vacant</SelectItem>
                      <SelectItem value="occupied">Occupied</SelectItem>
                      <SelectItem value="maintenance">Under Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  {editingProperty ? 'Update Property' : 'Add Property'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {properties.map((property, index) => (
            <div key={property.id} className="border rounded-lg overflow-hidden shadow-soft">
              <div className="aspect-video relative">
                <img 
                  src={propertyImages[index % propertyImages.length]} 
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant={property.status === 'occupied' ? 'default' : property.status === 'vacant' ? 'secondary' : 'destructive'}>
                    {property.status}
                  </Badge>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{property.name}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{property.address}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditProperty(property)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(property.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">${property.rent}/month</span>
                    </div>
                  </div>
                  {property.tenant && (
                    <span className="text-sm text-muted-foreground">
                      Tenant: {property.tenant}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};