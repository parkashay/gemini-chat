import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInButton, useUser } from "@clerk/clerk-react";
import { Sparkles } from "lucide-react";
import { Navigate } from "react-router";

export default function Homepage() {
  const { isSignedIn } = useUser();
  if (isSignedIn) {
    return <Navigate to="/chat" replace />;
  }
  return (
    <div className="flex items-center justify-center bg-background h-full-auto">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
          <CardDescription>Sign in to Gemini Chat and start prompting</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-6 p-6">
          <div className="rounded-full bg-primary/20 p-4">
            <Sparkles size={54} className="text-yellow-600" />
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-xl font-medium">Login to start chatting with AI</h3>
            <p className="text-muted-foreground">
              Connect with our intelligent assistant and get answers to all your questions
            </p>
          </div>
        </CardContent>

        <CardFooter>
          <SignInButton mode="modal">
            <Button className="w-full cursor-pointer" size="lg">
              Sign In
            </Button>
          </SignInButton>
        </CardFooter>
      </Card>
    </div>
  );
}
