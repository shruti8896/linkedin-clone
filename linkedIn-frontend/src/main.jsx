import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import AuthContext from "./contexts/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./contexts/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster />
    <UserProvider>
      <AuthContext>
        <App />
      </AuthContext>
    </UserProvider>
  </BrowserRouter>,
);
