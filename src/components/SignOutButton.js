import React from "react";

function SignOutButton({ onSignOut }) {
  return (
    <button className="sign-out-button" onClick={onSignOut}>
      Sign Out
    </button>
  );
}

export default SignOutButton;
