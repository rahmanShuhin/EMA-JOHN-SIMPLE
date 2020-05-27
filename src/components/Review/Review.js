import React, { useState, useEffect } from "react";
import "./Review.css";
import {
  getDatabaseCart,
  removeFromDatabaseCart
} from "../../utilities/databaseManager";

import Reviewitem from "../Reviewitem/Reviewitem";
import Cart from "../Cart/Cart";
import { Link } from "react-router-dom";
import { useAuth } from "../../use.auth";
const Review = () => {
  const [cart, setCart] = useState([]);
  const auth = useAuth();

  const handleButtonRemove = productKey => {
    //console.log(productKey);
    removeFromDatabaseCart(productKey);
    const newCart = cart.filter(pd => pd.key !== productKey);
    setCart(newCart);
  };
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    fetch('http://localhost:5001/getProductsByKey', {
      method: 'POST',
      body: JSON.stringify(productKeys),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(data => {
        // console.log("ami", data);
        const cartProducts = productKeys.map(key => {
          const product = data.find(pd => pd.key === key);
          product.quantity = savedCart[key];
          return product;
        });
        setCart(cartProducts);
      })

  }, []);
  // console.log(cart);

  return (
    <div className="container">
      <div className="shop-container">
        <h2>Product Review</h2>
        {cart.map(x => (
          <Reviewitem cartItem={x} handleButtonRemove={handleButtonRemove} />
        ))}

        {
          !cart.length && <h1>No Item In The Cart . Keep Shopping</h1>
        }
      </div>
      <div className="cart-container">
        <h2>Order Summary</h2>
        <Cart cart={cart}>
          <Link to="shipment">
            {auth.user ? (
              <button className="btn">Place Order</button>
            ) : (
                <button className="btn">Proceed to login</button>
              )}
          </Link>
        </Cart>
      </div>
    </div>
  );
};
export default Review;
