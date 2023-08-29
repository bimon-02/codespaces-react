import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../services/firebase/firebase-config";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const {
    cookies,
    set: setCookie,
    remove: removeCookie,
  } = useCookies(["token"]);

  const handleAuthError = (error) => {
    const errorMessages = {
      "auth/wrong-password": "Wrong password",
      "auth/user-not-found": "User not found",
      "auth/weak-password": error.message,
      "auth/email-already-in-use": "Email already in use",
    };

    return errorMessages[error.code] || error.message;
  };

  const authenticate = async (
    authFunction,
    email,
    password,
    successMessage
  ) => {
    try {
      const { user } = await authFunction(auth, email, password);

      if (user) {
        setUser(user);
        const token = await user.getIdToken();
        setToken(token);
        setCookie("token", token, {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 3600, // Token expiration time (1 hour)
        });
        toast.success(successMessage);
        return user;
      } else {
        setUser(null);
        return null;
      }
    } catch (error) {
      const errorMessage = handleAuthError(error);
      toast.error(errorMessage);
      return null;
    }
  };

  const login = async (email, password) => {
    return authenticate(
      signInWithEmailAndPassword,
      email,
      password,
      "Login successful",
      
    );
  };

  const register = async (email, password) => {
    return authenticate(
      createUserWithEmailAndPassword,
      email,
      password,
      "Register successful"
    );
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setToken("");
      removeCookie("token");
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // useEffect(() => {
  //   const token = cookies.token || "";
  //   setToken(token);
  // }, [cookies]);

  return (
    <AuthContext.Provider value={{ user, login, register, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
