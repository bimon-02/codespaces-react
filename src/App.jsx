import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase-config";
import "./App.css";
import AuthProvider from "./hooks/context/auth-context";
import Login from "./components/login";
import { Toaster} from "react-hot-toast"



function App() {
  return (
    <AuthProvider>
      <Login />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
