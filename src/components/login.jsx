import { useAuth } from "../hooks/context/auth-context";


const Login = () => {
    const { user, login } = useAuth();
    const handleLogin = async () => {
        const user = await login("jyrwa@gmail.com", "123Clashofclans@");

    }
    return (
        <div>
            <h1>Login{user.email}</h1>
            <button onClick={login}>Login</button>
        </div>
    );
}

export default Login;