import React, { useState, useEffect } from "react";
import Product from "../Product/Product.js";
import Cart from "../Cart/Cart";
import { Link } from 'react-router-dom';
import {
  addToDatabaseCart,
  getDatabaseCart
} from "../../utilities/databaseManager";
import "./Shop.css";
const Shop = () => {
  const [Data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5001/products')
      .then(res => res.json())
      .then(data => setData(data));
  }, [])
  const handleAddProduct = val => {
    //console.log(val);
    const toBeAdded = val.key;
    const sameProduct = cart.find(pd => val.key === toBeAdded);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter(pd => pd.key !== toBeAdded);
      newCart = [...others, sameProduct];
    } else {
      val.quantity = 1;
      newCart = [...cart, val];
    }
    //console.log(newCart);
    setCart(newCart);
    addToDatabaseCart(val.key, count);
  };
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    if (Data.length) {
      const previouscart = productKeys.map(existingkey => {
        const product = Data.find(pd => pd.key === existingkey);
        product.quantity = savedCart[existingkey];
        return product;
      });
      setCart(previouscart);
    }

  }, [Data]);
  return (
    <div>
      <div className="container">
        <div className="shop-container">
          {Data.map(data => (
            <Product
              val={data}
              handleAddProduct={handleAddProduct}
              buttonShow={true}
            />
          ))}
        </div>
        <div className="cart-container">
          <h2>Order Summary</h2>
          <Cart cart={cart}>
            <Link to="/review">
              <button className="btn">Review Your order</button>
            </Link>
          </Cart>
        </div>
      </div>
    </div>
  );
};
export default Shop;
