import React, { createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.css";
import Header from "./components/Header/Header";
import Shop from "./components/shop/Shop";
import Review from "./components/Review/Review";
import Inventory from "./components/Inventory/Inventory";
import Notfound from "./components/Notfound/Notfound";
import Productkey from "./components/Productkey/Productkey";
import Login from "./components/Login/Login";
import Shipment from "./components/Shipment/Shipment"
import { AuthContextProvider, PrivateRoute } from "./use.auth";
export const UserContext = createContext();
export default function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/">
              <Shop />
            </Route>
            <Route path="/shop">
              <Shop />
            </Route>
            <Route path="/review">
              <Review />
            </Route>
            <Route path="/inventory">
              <Inventory />
            </Route>
            <PrivateRoute path="/shipment">
              <Shipment />
            </PrivateRoute>
            <Route path="/product/:productkey">
              <Productkey />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="*">
              <Notfound />
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}
