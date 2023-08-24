import { createContext, useContext, useState } from "react";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const Context = createContext({});

export function useAuth() {
  return useContext(Context);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState(null);

  const login = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        setUser(user.user);
          setUid(user.user.uid);
          return user.user
      } else {
        setUser(null);
        setUid(null);
      }
    } catch (error) {}
  };
  return (
    <Context.Provider value={{ user, uid, login }}>{children}</Context.Provider>
  );
}
