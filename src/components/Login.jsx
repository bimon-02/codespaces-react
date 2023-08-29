import React, { useState } from "react";
import { useAuth } from "../hooks/context/auth-context";
import { toast } from "react-hot-toast";

const Login = () => {
  const { login, register, token, logout } = useAuth();

  const [email, setEmail] = useState("bimon2000@gmail.com");
  const [password, setPassword] = useState("123456");

  const handleAuthentication = async (action) => {
    console.log("Action:", action);
    console.log("Email:", email);
    console.log("Password:", password);

    const user = await action(email, password);
    console.log("User:", user);

    if (user) {
      toast.success(`${action === login ? "Login" : "Register"} successful`);
    } else {
      toast.error("Authentication failed");
    }
  };


  return (
    <div>
      <h1>Is Logged In: {token ? "true" : "false"}</h1>

      {!token ? (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => handleAuthentication(login)}>Login</button>
          <button onClick={() => handleAuthentication(register)}>
            Sign Up
          </button>
        </>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
    </div>
  );
};

export default Login;
