import React from "react";
import logo from "../../images/logo.png";
import "./Header.css";
import { useAuth } from "../../use.auth";
const Header = () => {
  const auth = useAuth();
  //console.log(auth.user, 1);
  return (
    <div className="header">
      <img src={logo} alt="logo" />
      <nav>
        <a href="/shop">shop</a>
        <a href="/review">Order Review</a>
        <a href="/inventory">Inventry</a>
        {
          auth.user && <span style={{ color: "gold" }}>welcome {auth.user.name}</span>
        }
        {auth.user ? (
          <a href="/login" style={{ color: "red" }}>Sign Out</a>

        ) : (
            <a href="/login" style={{ color: "red" }}>Sign In</a>
          )}
      </nav>
    </div>
  );
};
export default Header;
