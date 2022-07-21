import React from "react";
import classes from "./Cart.module.css";
import { ProductCard } from "../UI";

import trial2 from "../../Assets/trial2.png";
import trial3 from "../../Assets/trial3.png";
import trial4 from "../../Assets/trial4.png";
import trial5 from "../../Assets/trial5.png";
import CartIcon from "../UI/CartIcon/CartIcon";

const Cart = () => {
  return (
    <>
      <div className={classes.cart_container}>
        <h1 className={classes.cart_text}>
          Your Cart <CartIcon />{" "}
        </h1>
        <div className={classes.cart_products}>
          <ProductCard image={trial2} />
          <ProductCard image={trial3} />
          <ProductCard image={trial4} />
          <ProductCard image={trial3} />
          <ProductCard image={trial5} />
          <ProductCard image={trial2} />
          <ProductCard image={trial5} />
          <ProductCard image={trial4} />
        </div>
      </div>
    </>
  );
};

export default Cart;
