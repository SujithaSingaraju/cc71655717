import { createContext, useState, useEffect } from "react";

// Create context
export const UserContext = createContext();

// Create provider component
export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);

  // On app start, check if user is in localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.email && storedUser?.name) {
      setUserEmail(storedUser.email);
      setUserName(storedUser.name);
    }
  }, []);

  const login = (email, name) => {
    setUserEmail(email);
    setUserName(name);
    localStorage.setItem("user", JSON.stringify({ email, name }));
  };

  const logout = () => {
    setUserEmail(null);
    setUserName(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ userEmail, userName, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
