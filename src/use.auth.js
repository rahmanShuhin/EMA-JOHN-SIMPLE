import React, { useContext, useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useState, createContext } from "react";
import { Route, Redirect } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();
export const AuthContextProvider = props => {
  const auth = Auth();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
export const PrivateRoute = ({ children, ...rest }) => {
  const auth = Auth();
  const isLogin = localStorage.getItem("user");
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin ? (
          children
        ) : (

            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
};
const Auth = () => {
  const [user, setUser] = useState(null);
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const updateUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(updateUser);
        return res.user;
      })
      .catch(error => {
        console.log(error.message);
        setUser(null);
        return error.message;
      });
  };
  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(function () {
        setUser(null);
        return true;
      })
      .catch(function (error) {
        // An error happened.
        console.log(error.message);
        return false;
      });
  };
  useEffect(() => {
    //console.log("ami number one");
    firebase.auth().onAuthStateChanged(function (usr) {
      if (usr) {
        const { displayName, email, photoURL } = usr;
        const updateUser = {
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(updateUser);
        //console.log("yesssssssssss");
      } else {
        // No user is signed in.
        //console.log("no user is signed in")
      }
    });
  }, []);
  return {
    user,
    signInWithGoogle,
    signOut
  };
};
export default Auth;
