import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useCookies } from "react-cookie";

const Context = createContext({});

export function useAuth() {
  return useContext(Context);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [token, setToken] = useState("");

  const getToken = async () => {
    const token = cookies.token ?? null;
    setToken(token);
  };
  const logout = async () => {
    try {
      return await signOut(auth).then(() => {
        console.log("logout");
        setUser(null);
        setUid(null);
        setToken(null);
        removeCookie("token");
      });
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
console.log(user);
      if (user) {
        
        setUser(user.user);
        setUid(user.user.uid);
        const token = await user.user.getIdToken();
        setToken(token);
        setCookie(
          "token",
          token,
          { path: "/" },
          { httpOnly: true },
          { secure: true },
          { sameSite: "strict" },
          { maxAge: 3600 }
        );
        return user.user;
      } else {
        setUser(null);
        setUid(null);
      }
    } catch (error) {
      console.log(error);
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
        setUid(user.uid);

        return user;
      } else {
        setUser(null);
        setUid(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [cookies]);
  return (
    <Context.Provider value={{ user, uid, login, register, token, logout }}>
      {children}
    </Context.Provider>
  );
}
