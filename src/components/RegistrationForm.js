import React from "react";

function RegistrationForm() {
  return (
    <form>
      <label htmlFor="newUsername">Username:</label>
      <input
        type="text"
        id="newUsername"
        name="newUsername"
        placeholder="Choose a username"
        required
      />
      <label htmlFor="newPassword">Password:</label>
      <input
        type="password"
        id="newPassword"
        name="newPassword"
        placeholder="Choose a password"
        required
      />
      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="Confirm your password"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
