import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  CreditCard, 
  BarChart3, 
  ArrowRight, 
  CheckCircle,
  Home,
  DollarSign
} from "lucide-react";

interface WelcomePortalProps {
  userType: 'admin' | 'tenant';
  email: string;
  onContinue: () => void;
}

export const WelcomePortal = ({ userType, email, onContinue }: WelcomePortalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Extract name from email
  const userName = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const adminFeatures = [
    {
      icon: Building2,
      title: "Property Management",
      description: "Manage all your properties in one place"
    },
    {
      icon: Users,
      title: "Tenant Management", 
      description: "Track tenant information and lease details"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "View revenue, occupancy rates, and insights"
    },
    {
      icon: CreditCard,
      title: "Payment Tracking",
      description: "Monitor all rent payments and transactions"
    }
  ];

  const tenantFeatures = [
    {
      icon: Home,
      title: "Property Details",
      description: "View your rental property information"
    },
    {
      icon: DollarSign,
      title: "Easy Payments",
      description: "Pay your rent online securely"
    },
    {
      icon: CreditCard,
      title: "Payment History",
      description: "Track all your payment records"
    },
    {
      icon: CheckCircle,
      title: "Account Status",
      description: "Monitor your account balance and status"
    }
  ];

  const features = userType === 'admin' ? adminFeatures : tenantFeatures;
  const dashboardType = userType === 'admin' ? 'Admin Dashboard' : 'Tenant Portal';

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-green-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-amber-400/10 to-green-400/10"></div>
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-orange-400/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-green-400/15 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl"></div>
      <div className={`w-full max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 rounded-2xl shadow-lg">
              <Building2 className="h-12 w-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            <span className="welcome-text">Welcome back, {userName}!</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-2">
            Ready to manage your property portfolio
          </p>
          
          <Badge variant="secondary" className="text-sm px-3 py-1">
            {userType === 'admin' ? 'Administrator' : 'Tenant'} Access
          </Badge>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className={`card-premium hover:shadow-strong transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-lg">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground/80">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Stats Preview */}
        <Card className="card-premium mb-8">
          <CardHeader>
            <CardTitle className="text-center">Quick Overview</CardTitle>
            <CardDescription className="text-center">
              Here's what's waiting for you in your {dashboardType.toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {userType === 'admin' ? (
                <>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">Properties</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">18</div>
                    <div className="text-sm text-muted-foreground">Active Tenants</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-success">₹18.5L</div>
                    <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">₹85,000</div>
                    <div className="text-sm text-muted-foreground">Monthly Rent</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-success">₹0</div>
                    <div className="text-sm text-muted-foreground">Balance Due</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">3</div>
                    <div className="text-sm text-muted-foreground">Payments Made</div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Continue Button */}
        <div className="text-center">
          <Button 
            onClick={onContinue}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 px-8 py-4 text-lg group text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Continue to {dashboardType}
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            Everything is ready for you to get started
          </p>
        </div>

      </div>
    </div>
  );
};