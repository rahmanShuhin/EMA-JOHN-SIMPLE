import React from "react";
import "./Reviewitem.css";
const Reviewitem = props => {
  const { name, quantity } = props.cartItem;
  return (
    <div className="main">
      <div className="img-container">
        <img src={props.cartItem.img} alt="" />
      </div>
      <div className="price-container">
        <h3>{name}</h3>
        <h5>Quantity :{quantity}</h5>
        <p>
          <small>By {props.cartItem.seller}</small>
        </p>
        <h5>Price :{props.cartItem.price}$</h5>
        <small>Only {props.cartItem.stock} stock left order soon</small>
        <br />
        {(
          <button
            className="btn"
            onClick={() => props.handleButtonRemove(props.cartItem.key)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};
export default Reviewitem;
