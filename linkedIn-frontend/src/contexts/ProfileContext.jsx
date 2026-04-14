import { createContext, useContext, useState } from "react";

export const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [editProfile, setEditProfile] = useState(false);
  return (
    <ProfileContext.Provider value={{ editProfile, setEditProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfileContext = () => useContext(ProfileContext);
