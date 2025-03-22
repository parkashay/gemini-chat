import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Moon, Sparkles, Sun } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "../providers/theme-provider";

export default function Header() {
  const { setTheme } = useTheme();
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
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
