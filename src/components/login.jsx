import React from "react";
import { useAuth } from "../hooks/context/auth-context";
import { toast } from "react-hot-toast";

const Login = () => {

  const { login, register, token, logout } = useAuth();

  const handleAuthentication = async (action, email, password) => {
    const user = await action(email, password);

  const { user, login, register, token, logout } = useAuth();
  const handleLogin = async () => {
    const user = await login("jyrwa@gmail.com", "123Clashofclan@");
    if (user) {
      console.log(user);
    } else {
      toast.error("Login failed");
    }
  };
  const handleRegister = async () => {
    const user = await register("jyrwa90@gmail.com", "123Clashofclan@"); // Using the register

    if (user) {
      toast.success(`${action === login ? "Login" : "Register"} successful`);
    } else {
      console.log("Authentication failed");
    }
  };

  return (
    <div>
      <h1>Is Logged In: {token ? "true" : "false"}</h1>

      {!token ? (
        <>
          <button
            onClick={() =>
              handleAuthentication(login, "jyrwa@gmail.com", "12345678")
            }
          >
            Login
          </button>
          <button
            onClick={() =>
              handleAuthentication(register, "jyrwa90999@gmail.com", "123456")
            }
          >
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
