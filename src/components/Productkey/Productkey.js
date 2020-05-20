import React from "react";
import "./Productkey.css";
import Product from "../Product/Product";
import fakeData from "../../fakeData";
import { useParams } from "react-router-dom";

const Productkey = () => {
  const { productkey } = useParams();
  const product = fakeData.find(pd => pd.key === productkey);
  
  return (
    <div>
      <Product val={product} buttonShow={false}/>
    </div>
  );
};
export default Productkey;
