import React, { useContext, useEffect } from "react";
import classes from "./Explore.module.css";
import { ProductCard } from "../UI";
import trial2 from "../../Assets/trial2.png";
import trial3 from "../../Assets/trial3.png";
import trial4 from "../../Assets/trial4.png";
import trial5 from "../../Assets/trial5.png";
import CartIcon from "../UI/CartIcon/CartIcon";
import { productContext } from "../../Contexts";

const Explore = () => {
  const { getAllProducts, allProducts } = useContext(productContext);
  useEffect(() => {
    getAllProducts();
  }, []);
  console.log(allProducts);
  return (
    <>
      <div className={classes.cart_container}>
        <h1 className={classes.cart_text}>
          Your Explore <CartIcon />{" "}
        </h1>
        <div className={classes.cart_products}>
          {allProducts.map((p, i) => {
            return (
              <ProductCard image={p.image} name={p.title} price={p.price} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Explore;