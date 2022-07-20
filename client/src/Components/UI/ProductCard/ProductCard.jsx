import React from "react";
import { Card } from "../index";
import classes from "./ProductCard.module.css";
import rs_icon from "../../../Assets/rs_icon.png";
import trial5 from "../../../Assets/trial5.png";

const ProductCard = () => {
  return (
    <Card width="300px" height="390px">
      <div className={classes.content_container}>
        <Card width="230px" height="250px">
          <img className={classes.image} src={trial5} alt="trial5" />
        </Card>
        <h4 className={classes.name}>Demon Slayer's Hoddie Slayer's Hoddie</h4>
        <div className={classes.price_container}>
          <img className={classes.price_symbol} src={rs_icon} alt="" />
          <span className={classes.price}>2000</span>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
