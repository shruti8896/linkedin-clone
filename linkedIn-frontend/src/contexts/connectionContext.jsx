import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { pendingconnections } from "../services/connectionService";
import { useUserContext } from "./UserContext";
import { useState } from "react";

const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {
  const { currentUserData } = useUserContext();
  const [pendingConnectionList, setPendingConnectionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPendingConnections = async () => {
    try {
      console.log(currentUserData._id);
      const pendingConnections = await pendingconnections(currentUserData._id);
      console.log(pendingConnections.message);
      setPendingConnectionList(pendingConnections.message);
    } catch (error) {
      console.error("Failed to fetch pending connections", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!currentUserData?._id) return;

    fetchPendingConnections();
  }, [currentUserData?._id]);

  return (
    <ConnectionContext.Provider
      value={{
        pendingConnectionList,
        setPendingConnectionList,
        loading,
        fetchPendingConnections,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnectionContext = () => useContext(ConnectionContext);
