import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; 

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  // 1. Fake Email Login (No Supabase required!)
  const loginWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Fake a 1.5 second loading delay so the button spinner shows up
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Successfully logged in!");
      router.push("/dashboard"); 
    } catch (error) {
      toast.error("Invalid login credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Fake Google Login
  const loginWithGoogle = async () => {
    setIsGoogleLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast.success("Successfully logged in with Google!");
      router.push("/dashboard"); 
    } catch (error) {
      toast.error("Failed to authenticate.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return {
    isLoading,
    isGoogleLoading,
    loginWithEmail,
    loginWithGoogle,
  };
}