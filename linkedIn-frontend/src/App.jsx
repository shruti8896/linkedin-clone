import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Navigate } from "react-router";
import { useUserContext } from "./contexts/UserContext";
function App() {
  const [count, setCount] = useState(0);
  const { currentUserData, loading } = useUserContext();

  return (
    <Routes>
      <Route
        path="/"
        element={
          loading ? (
            <div>Loading...</div>
          ) : currentUserData ? (
            <Dashboard />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          loading ? (
            <div>Loading...</div>
          ) : currentUserData ? (
            <Dashboard />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
