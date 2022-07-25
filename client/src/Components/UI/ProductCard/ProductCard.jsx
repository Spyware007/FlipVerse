import React from "react";
import { Card } from "../index";
import classes from "./ProductCard.module.css";
import rs_icon from "../../../Assets/rs_icon.png";

const ProductCard = ({
  image,
  outerWidth = "300px",
  outerHeight = "390px",
  innerWidth = "230px",
  innerHeight = "250px",
}) => {
  return (
    <div className={classes.product_card}>
      <Card width={outerWidth} height={outerHeight} styles>
        <div className={classes.content_container}>
          <Card width={innerWidth} height={innerHeight}>
            <img className={classes.image} src={image} alt="product_image" />
          </Card>
          <h4 className={classes.name}>
            Demon Slayer's Hoddie Slayer's Hoddie
          </h4>
          <div className={classes.price_container}>
            <img className={classes.price_symbol} src={rs_icon} alt="rsicon" />
            <span className={classes.price}>2000</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
