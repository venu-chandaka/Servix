import React from "react";
import AuthLayout from "@/components/auth/AuthLayout"; 
import LoginCard from "@/components/auth/LoginCard"; 

// ADD THESE TWO LINES:
console.log("Is AuthLayout undefined?", AuthLayout);
console.log("Is LoginCard undefined?", LoginCard);

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginCard />
    </AuthLayout>
  );
}