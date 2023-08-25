import { useAuth } from "../hooks/context/auth-context";

const Login = () => {
  const { user, login, register, token, logout } = useAuth();
  const handleLogin = async () => {
    const user = await login("jyrwa@gmail.com", "123Clashofclan@");
    if (user) {
      console.log(user);
    } else {
      console.log("error");
    }
  };
  const handleRegister = async () => {
    const user = await register("jyrwa90@gmail.com", "123Clashofclan@"); // Using the register
    if (user) {
      console.log(user);
    } else {
      console.log("error");
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <h1>IS Login:{!!token ? "true" : "false"}</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>SignUp</button>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Login;
