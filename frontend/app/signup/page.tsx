import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import SignUpCard from "@/components/auth/SignUpCard";

export const metadata = {
  title: "Create an Account - FixFlow AI",
  description: "Sign up for FixFlow AI to book trusted professionals.",
};

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUpCard />
    </AuthLayout>
  );
}