// Import necessary modules and components
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Import the Toaster from react-hot-toast

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./components/Home";

// Define the main App component
function App() {
  return (
    <div className="App">
      {/* Begin Router setup */}
      <Router>
        {/* Place the Toaster here to enable toast notifications */}
        <Toaster />

        {/* Set up routes */}
        <Routes>
          {/* Create a route for paths that require authentication */}
          <Route path="/" element={<ProtectedRoutes />}>
            {/* Define a nested route for the dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Define the root route */}
            <Route path="/" element={<Home />} exact />
          </Route>

          {/* Create a separate route for the login page */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

// Export the App component as the default export
export default App;
