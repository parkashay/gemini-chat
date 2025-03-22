import { Navigate, Route, Routes } from "react-router";
import { Layout } from "./components/layouts/layout";
import Homepage from "./pages/home";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import ChatPage from "./pages/chat";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/chat"
          element={
            <>
              <SignedIn>
                <ChatPage />
              </SignedIn>
              <SignedOut>
                <Navigate to="/" />
              </SignedOut>
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
