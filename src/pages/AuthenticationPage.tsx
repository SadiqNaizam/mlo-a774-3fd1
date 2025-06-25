import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AuthenticationPage: React.FC = () => {
  console.log('AuthenticationPage loaded');
  const navigate = useNavigate();

  const handleAuthSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted, navigating to dashboard...');
    // In a real app, you would perform authentication here.
    // On success, navigate to the dashboard.
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 md:p-6">
        <Tabs defaultValue="login" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          {/* Login Tab */}
          <TabsContent value="login">
            <Card>
              <form onSubmit={handleAuthSubmit}>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" type="email" placeholder="user@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input id="login-password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button type="submit" className="w-full">Login</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup">
            <Card>
               <form onSubmit={handleAuthSubmit}>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Create an Account</CardTitle>
                  <CardDescription>
                    Start moving your data in seconds. It's free!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input id="signup-name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="user@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">Create Account</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AuthenticationPage;