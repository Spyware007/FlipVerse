import React from "react";
import { Button, ProductCard, SingleProductCard } from "../UI";
import classes from "./Product.module.css";
import rs_icon from "../../Assets/rs_icon.png";
import trial1 from "../../Assets/trial1.png";
import trial2 from "../../Assets/trial2.png";
import trial3 from "../../Assets/trial3.png";
import trial4 from "../../Assets/trial4.png";
import trial5 from "../../Assets/trial5.png";
import CartIcon from "../UI/CartIcon/CartIcon";

const Product = () => {
  const handleClick = () => {};
  return (
    <>
      <div className={classes.product_page}>
        <div className={classes.product}>
          <div>
            <SingleProductCard image={trial1} />
          </div>
          <div className={classes.product_content}>
            <h1 className={classes.product_name}>Abstract 3D Digital Art</h1>
            <p className={classes.product_description}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi,
              enim! Veritatis quod cum voluptatibus minima eveniet dolorum
              asperiores iste dignissimos Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Modi, enim! Veritatis quod cum
              voluptatibus minima eveniet dolorum asperiores iste dignissimos
            </p>
            <div className={classes.price_container}>
              <img className={classes.price_symbol} src={rs_icon} alt="" />
              <span className={classes.price}>2000</span>
            </div>
            <div className={classes.btn}>
              <Button
                onClick={handleClick}
                label="BUY"
                padding="0.5em 11em"
                filled
              />
              {/* <Button
                // onClick={handleClick}
                // label="Add to Cart"
                padding="0.5em 8em"
                // filled
              >
                Add to Cart
                <CartIcon />
              </Button> */}
            </div>
          </div>
        </div>
        <div className={classes.similar_container}>
          <h1 className={classes.similar_text}>Similar Products</h1>
          <div className={classes.similar_products}>
            <ProductCard image={trial2} />
            <ProductCard image={trial3} />
            <ProductCard image={trial4} />
            <ProductCard image={trial5} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
