import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Navigate } from "react-router";
import { useUserContext } from "./contexts/UserContext";
import UserPage from "./pages/UserPage";
import ConnectionRequests from "./pages/ConnectionRequest";
import Jobs from "./pages/Jobs";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
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
            <Navigate to="/home" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
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
      <Route
        path="/user"
        element={
          loading ? (
            <div>Loading...</div>
          ) : currentUserData ? (
            <UserPage />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      const { currentUserData, loading } = useUserContext();

      <Route
        path="/connectionrequests"
        element={
          loading ? (
            <div>Loading...</div>
    ) : currentUserData ? (
      <ConnectionRequests />
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>
      <Route
        path="/jobs"
        element={
          loading ? (
            <div>Loading...</div>
    ) : currentUserData ? (
      <Jobs />
    ) : (
      <Navigate to="/login" replace />
    )
  }
/>

 <Route
        path="/profile"
        element={
          loading ? (
            <div>Loading...</div>
    ) : currentUserData ? (
      <Profile />
    ) : (
      <Navigate to="/profile" replace />
    )
  }
/>
 <Route
        path="/messages"
        element={
          loading ? (
            <div>Loading...</div>
    ) : currentUserData ? (
      <Messages />
    ) : (
      <Navigate to="/messages" replace />
    )
  }
/>
 <Route
        path="/notifications"
        element={
          loading ? (
            <div>Loading...</div>
    ) : currentUserData ? (
      <Notifications />
    ) : (
      <Navigate to="/notifications" replace />
    )
  }
/>
    </Routes>
  );
}

export default App;
