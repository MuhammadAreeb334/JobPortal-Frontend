import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FireAPI } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = async () => {
    try {
      const response = await FireAPI("auth/me", "GET");

      setUser(response.user);
    } catch (error) {
      console.log("Get Current User Error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const logout = async () => {
    try {
      await FireAPI("auth/logout", "POST");

      setUser(null);

      toast.success("Logged out successfully");
    } catch (error) {
      console.log("Logout Error:", error);

      toast.error(error?.message || "Unable to logout. Please try again.");
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    getCurrentUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
