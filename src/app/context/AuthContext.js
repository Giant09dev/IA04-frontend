// src/context/AuthContext.js
"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation"; // Updated for Next.js 14
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      fetchProfile(storedToken);
    }
  }, []);

  const fetchProfile = async (token) => {
    try {
      console.log(`${process.env.NEXT_PUBLIC_API_URL}/profile`);
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      setUser(res.data);
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  };

  const login = async (email, password) => {
    try {
      console.log(`${process.env.NEXT_PUBLIC_API_URL}/login`);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        email,
        password,
      });
      console.log(res);
      const receivedToken = res.data.token;
      console.log(token);
      localStorage.setItem("token", receivedToken);
      setToken(receivedToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${receivedToken}`;
      fetchProfile(receivedToken);
      router.push("../profile");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    router.push("../login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
