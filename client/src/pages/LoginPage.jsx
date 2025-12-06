import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

// --- Shadcn UI Component Imports ---
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent,CardHeader } from '@/components/ui/card';


function LoginPage() {
  // --- All of your existing logic remains unchanged ---
  const { login } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => {
    setIsOpen(false);
    // Reset fields on close
    setFullName('');
    setEmail('');
    setPassword('');
  };

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const response = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      // Note: The login function in AuthContext should handle localStorage
      login(data.token); 
      alert('You are logged in!');
      handleClose();
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      alert('Registration successful! Please sign in.');
      // After successful sign-up, we can either close the modal or switch tabs.
      // For a better UX, we'll just close it and let them sign in again.
      handleClose(); 
    } catch (error) {
      alert('Registration failed.');
    }
  };

  // --- New UI using Shadcn components ---
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-[#4e1203] text-white border-[#4e1203] hover:bg-[#6a3a1a] hover:text-white"
        >
          Sign In
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>

            {/* --- Sign In Tab --- */}
            <TabsContent value="signin">
                <Card as="form"  className="border-none shadow-none">
                    <CardHeader>
                        <DialogTitle>Welcome back</DialogTitle>
                        <DialogDescription>
                            Enter your credentials to access your account.
                        </DialogDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="signin-email">Email</Label>
                            <Input id="signin-email" type="email" placeholder="nimal@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="signin-password">Password</Label>
                            <Input id="signin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </CardContent>
                    <DialogFooter>
                        <Button type="submit" className="w-full" onClick={handleSignIn}>Sign In</Button>
                    </DialogFooter>
                </Card>
            </TabsContent>

            {/* --- Sign Up Tab --- */}
            <TabsContent value="signup">
                 <Card as="form" onSubmit={handleSignUp} className="border-none shadow-none">
                    <CardHeader>
                        <DialogTitle>Create your account</DialogTitle>
                        <DialogDescription>
                            It's quick and easy. Let's get you started.
                        </DialogDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="space-y-2">
                            <Label htmlFor="signup-fullname">Full Name</Label>
                            <Input id="signup-fullname" placeholder="Nimal Krishna" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="signup-email">Email</Label>
                            <Input id="signup-email" type="email" placeholder="nimal@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="signup-password">Password</Label>
                            <Input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </CardContent>
                    <DialogFooter>
                        <Button type="submit" className="w-full">Create Account</Button>
                    </DialogFooter>
                </Card>
            </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default LoginPage;
