import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

function Login() {
  const [activeTab, setActiveTab] = useState("login"); // Default to login tab

  const getButtonText = (tab) => {
    return tab === "login" ? "Login" : "Register";
  };

  return (
    <div>
      <h1>{getButtonText(activeTab)}</h1>
      <div>
        <button
          className={activeTab === "login" ? "active" : ""}
          onClick={() => setActiveTab("login")}
        >
          {getButtonText("login")}
        </button>
        <button
          className={activeTab === "register" ? "active" : ""}
          onClick={() => setActiveTab("register")}
        >
          {getButtonText("register")}
        </button>
      </div>
      {activeTab === "login" && <LoginForm />}
      {activeTab === "register" && <RegistrationForm />}
      <h4>User logged in: {activeTab === "login" ? "true" : "false"}</h4>
    </div>
  );
}

export default Login;
