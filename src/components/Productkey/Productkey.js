import React, { useState, useEffect } from "react";
import "./Productkey.css";
import Product from "../Product/Product";
import { useParams } from "react-router-dom";

const Productkey = () => {
  const { productkey } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetch('http://localhost:5001/product/' + productkey)
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [])

  return (
    <div>
      {
        product && <Product val={product} buttonShow={false} />
      }
    </div>
  );
};
export default Productkey;
