import React, { createContext, useContext } from "react";
export const authDataContext = createContext();

function AuthContext({ children }) {
  const serverURL = "http://localhost:8080/";
  let value = {
    serverURL,
  };
  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  );
}

export default AuthContext;
export const useAuthContext = () => useContext(authDataContext);
