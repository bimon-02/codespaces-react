import "./App.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebase-config";

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState("");

  const register = async (event) => {
    event.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      if (user) {
        setUser(user.user);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      if (user) {
        setUser(user.user);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async (event) => {
    event.preventDefault();
    await auth.signOut();
    setUser("");
  };

  return (
    <div className="App" style={styles.container}>
      <div style={styles.formContainer}>
        <h3>Register User</h3>
        <form onSubmit={register}>
          <input
            placeholder="Email..."
            style={styles.input}
            onChange={(event) => setRegisterEmail(event.target.value)}
          />
          <input
            placeholder="Password..."
            style={styles.input}
            onChange={(event) => setRegisterPassword(event.target.value)}
          />
          <button type="submit" style={styles.button}>
            Create User
          </button>
        </form>
      </div>
      <div style={styles.formContainer}>
        <h3>Login</h3>
        <form onSubmit={login}>
          <input
            placeholder="Email..."
            style={styles.input}
            onChange={(event) => setLoginEmail(event.target.value)}
          />
          <input
            placeholder="Password..."
            style={styles.input}
            onChange={(event) => setLoginPassword(event.target.value)}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>

      <h4 style={styles.loggedInMessage}>
        User Logged in: {user.email ?? "please login"}
      </h4>
      <form onSubmit={logout}>
        <button type="submit" style={styles.button}>
          Signout
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  formContainer: {
    marginBottom: "20px",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    width: "250px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 20px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  loggedInMessage: {
    marginBottom: "20px",
  },
};

export default App;
