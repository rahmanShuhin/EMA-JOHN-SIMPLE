import React from "react";
import "./Cart.css";
//import { UserContext } from "../../App";
const Cart = props => {
  //console.log(props.cart);
  const newTaka = props.cart;
  //const user = useContext(UserContext);
  //console.log(user);
  let tk = 0;
  newTaka.map(x => {
    tk = tk + parseFloat(x.price) * x.quantity;
  });
  let ship = 0;
  if (tk > 0) {
    ship = 10;
  }
  let tax = Math.round(tk / 10);
  return (
    <div>
      <h5>Item Order:{props.cart.length}</h5>
      <p>Items:{tk}</p>
      <p>Shipping & Handling:{ship}</p>
      <p>Total before Tax:{tk + ship}</p>
      <p>Estimated Tax:{tax}</p>
      <h3>Order Total:{tk + ship + tax}</h3>
      {props.children}
    </div>
  );
};
export default Cart;
