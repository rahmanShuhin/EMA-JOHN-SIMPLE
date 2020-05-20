import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
//import Shop from "../shop/Shop";
const Product = props => {
  // console.log(props);
  return (
    <div className="main">
      <div className="img-container">
        <img src={props.val.img} alt="" />
      </div>
      <div className="price-container">
        <h3>
          <Link to={"/product/" + props.val.key}>{props.val.name}</Link>
        </h3>
        <p>
          <small>By {props.val.seller}</small>
        </p>
        <h5>Price :{props.val.price}$</h5>
        <small>Only {props.val.stock} stock left order soon</small>
        <br />
        {props.buttonShow && (
          <button
            className="btn"
            onClick={() => props.handleAddProduct(props.val)}
          >
            <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
          </button>
        )}
      </div>
    </div>
  );
};
export default Product;
