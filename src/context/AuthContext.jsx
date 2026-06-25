import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  useEffect(() => {
    const savedUser =
      localStorage.getItem(
        "user"
      );

    if (savedUser) {
      setUser(
        JSON.parse(savedUser)
      );
    }
  }, []);

  const register = async (
    name,
    email,
    password
  ) => {
    try {
      const response =
        await axios.post(
          "http://localhost:5000/api/users/register",
          {
            name,
            email,
            password,
          }
        );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

      setUser(
        response.data.user
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const login = async (
    email,
    password
  ) => {
    try {
      const response =
        await axios.post(
          "http://localhost:5000/api/users/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

      setUser(
        response.data.user
      );

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(
      "user"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);