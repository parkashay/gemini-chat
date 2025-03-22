import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Sparkles } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-10 w-full bg-accent shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-header">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Sparkles className="text-yellow-600 size-8" />
            <span className="ml-2 font-medium">Gemini Chat</span>
          </div>

          {/* Authentication */}
          <div>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="cursor-pointer">Sign In</Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
