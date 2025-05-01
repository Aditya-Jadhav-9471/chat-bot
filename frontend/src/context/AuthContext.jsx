import { createContext, useEffect, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.userId, role: decoded.role });
      } catch (err) {
        console.error("Invalid token", err);
        logout();
      }
    }
    setLoading(false); // FINISH loading after trying
  }, []);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      localStorage.setItem("token", token);
      setUser({ id: decoded.userId, role: decoded.role });
    } catch (err) {
      console.error("Invalid token on login", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
