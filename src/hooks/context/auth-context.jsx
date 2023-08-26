import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";

const Context = createContext({});

export function useAuth() {
  return useContext(Context);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const handleAuthError = (error) => {
    switch (error.code) {
      case "auth/wrong-password":
        return "Wrong password";
      case "auth/user-not-found":
        return "User not found";
      case "auth/weak-password":
        return error.message;
      case "auth/email-already-in-use":
        return "Email already in use";
      default:
        return error.message;
    }
  };

  const login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

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

  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      if (user) {
        setUser(user);
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

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setToken(null);
      removeCookie("token");
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const token = cookies.token || null;
    setToken(token);
  }, [cookies]);

  return (
    <Context.Provider value={{ user, login, register, token, logout }}>
      {children}
    </Context.Provider>
  );
}
