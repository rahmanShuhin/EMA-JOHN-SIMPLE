import React from "react";
import Auth from "../../use.auth";

const Login = () => {
  const auth = Auth();
  const handleSignIn = () => {
    auth.signInWithGoogle().then(res => {
      //console.log("redirect now");
      //window.location.pathname = "/review";
      localStorage.setItem("user", true);
      window.location.pathname = "/review";
      // e.preventDefault();
    });
  };
  const handleSignOut = () => {
    auth.signOut()
      .then(res => {
        auth.user = null;
        localStorage.removeItem("user");
        window.location.pathname = "/shop";
      })
  }
  return (
    <div>
      {auth.user ? (
        <div>
          <button onClick={handleSignOut}>Sign Out</button>
          <h2>Hi i'm {auth.user.name}</h2>
        </div>
      ) : (
          <button onClick={handleSignIn}>Sign In With Google</button>
        )}
    </div>
  );
};
export default Login;
