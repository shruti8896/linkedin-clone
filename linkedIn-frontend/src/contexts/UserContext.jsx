import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { getCurrentUser } from "../services/userServices";
import { useMemo } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [currentUserAccessToken, setCurrentUserAccessToken] = useState(null);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        console.log("running userContext:Fetching current User Data............");
        const userData = await getCurrentUser();
        setCurrentUserData(userData);
      } catch (error) {
        console.error("Failed to fetch current user", error);
        setCurrentUserData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchCurrentUser();
  }, []);
  const login = (user) => setCurrentUserData(user);
  const logout = () => setCurrentUserData(null);

  const value = useMemo(
    () => ({
      currentUserData,
      setCurrentUserData,
      login,
      logout,
      loading,
      currentUserAccessToken,
      setCurrentUserAccessToken,
    }),
    [currentUserData, loading],
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = () => useContext(UserContext);
