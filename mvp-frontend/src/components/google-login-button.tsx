import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/lib/supabase";

export function GoogleLoginButton() {
  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error initiating Google login:', error);
    }
  };

  return (
    <Button 
      variant="outline" 
      className="w-full" 
      onClick={handleGoogleLogin}
    >
      <FcGoogle className="mr-2 h-5 w-5" />
      Continue with Google
    </Button>
  );
}