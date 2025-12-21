// src/components/LoginModal.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

// --- Shadcn UI Component Imports ---
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

// The component now accepts props to control its visibility
function LoginModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // When the modal closes (e.g., successful login), call the onClose prop
  const handleClose = () => {
    onClose(); 
    // Reset fields
    setFullName('');
    setEmail('');
    setPassword('');
  };
  
  // Your handleSignIn and handleSignUp functions remain exactly the same,
  // except they will call the new handleClose() function on success.
 const handleSignIn = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${baseURL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || "Login failed");
    }

    const data = await response.json();
    login(data.token);
    alert("You are logged in!");
    handleClose();

  } catch (error) {
    console.error("Login failed:", error);
    alert(error.message);
  }
};

  const handleSignUp = async (e) => {
     e.preventDefault();
    try {
      const response = await fetch(`${baseURL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),});
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      alert('Registration successful! Please sign in.');
      handleClose(); // Use the new close handler
    } catch (error) {
      alert('Registration failed.');
    }
  };

  return (
    // The Dialog's open state is now controlled by the isOpen prop.
    // onOpenChange calls onClose when the user clicks the 'x' or outside the modal.
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
          {/* ALL OF YOUR TABS, CARD, AND INPUT UI GOES HERE, UNCHANGED */}
          {/* Just copy and paste the entire <Tabs>...</Tabs> block here */}
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <form onSubmit={handleSignIn}>
                  <Card className="border-none shadow-none">
                                        <CardHeader>
                                            <DialogTitle>Welcome back</DialogTitle>
                                            <DialogDescription>
                                                Enter your credentials to access your account.
                                            </DialogDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="signin-email">Email</Label>
                                                <Input id="signin-email" type="email" placeholder="enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="signin-password">Password</Label>
                                                <Input id="signin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                            </div>
                                        </CardContent>
                                        <DialogFooter>
                                            <Button type="submit" className="w-full">Sign In</Button>
                                        </DialogFooter>
                </Card>
              </form>


            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleSignUp}>
                   <Card className="border-none shadow-none">
                   <CardHeader>
                <DialogTitle>Create your account</DialogTitle>
                <DialogDescription>
                  It's quick and easy. Let's get you started.
                </DialogDescription>
               </CardHeader><CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-fullname">Full Name</Label>
                    <Input id="signup-fullname" placeholder="enter your name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                </CardContent><DialogFooter>
                  <Button type="submit" className="w-full">Create Account</Button>
                </DialogFooter>
                </Card>
              </form>
            </TabsContent>
          </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;