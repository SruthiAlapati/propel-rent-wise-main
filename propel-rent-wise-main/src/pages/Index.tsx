import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { TenantDashboard } from "@/components/tenant/TenantDashboard";
import { WelcomePortal } from "@/components/WelcomePortal";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [user, setUser] = useState<{ type: 'admin' | 'tenant'; email: string } | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const { toast } = useToast();

  const handleLogin = (userType: 'admin' | 'tenant', email: string) => {
    setUser({ type: userType, email });
    setShowWelcome(true);
    
    // Show success toast
    toast({
      title: "🎉 Login Successful!",
      description: `Welcome back! You have successfully logged in as ${userType === 'admin' ? 'Administrator' : 'Tenant'}.`,
      duration: 4000,
    });
  };

  const handleContinue = () => {
    setShowWelcome(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowWelcome(false);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (showWelcome) {
    return (
      <WelcomePortal 
        userType={user.type} 
        email={user.email} 
        onContinue={handleContinue} 
      />
    );
  }

  if (user.type === 'admin') {
    return <AdminDashboard email={user.email} onLogout={handleLogout} />;
  }

  return <TenantDashboard email={user.email} onLogout={handleLogout} />;
};

export default Index;
