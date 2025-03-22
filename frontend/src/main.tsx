import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "./components/providers/theme-provider.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark">
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ClerkProvider>
    </ThemeProvider>
  </StrictMode>
);
