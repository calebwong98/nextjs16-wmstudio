"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { signIn } from "@/lib/auth/_client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

interface SignInCardProps {
  callbackUrl?: string;
}

export function SignInCard({ callbackUrl }: SignInCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn.social({
        provider: "google",
        callbackURL: callbackUrl || "/",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Choose a login method to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={cn("flex w-full flex-col gap-2")}>
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <GoogleIcon className="size-5" />
            <span>{isLoading ? "Signing in..." : "Sign in with Google"}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
