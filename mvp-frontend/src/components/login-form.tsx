'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { GoogleLoginButton } from "@/components/google-login-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  async function onSubmit(formData: FormData) {
    setError(null)
    setIsLoading(true);

    try {
      const result = await login(formData)
      
      if (result?.error) {
        setError(result.error)
        return
      }

      router.push('/')
    } catch (error) {
      setError('An error occurred during login')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (user) {
    return null;
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
      <form action={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                Forgot your password?
              </a>
            </div>
            <Input 
              id="password"
              name="password" 
              type="password"
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <GoogleLoginButton /> */}
        </form>
        <div className="mt-4 text-center text-sm">
          Don&#39;t have an account?{" "}
          <a
            href="signup"
            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
          >
            Sign up
          </a>
        </div>
      </CardContent>
    </Card>
  );
}