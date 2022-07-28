import React from "react";
import { Card } from "../index";
import classes from "./ProductCard.module.css";
import rs_icon from "../../../Assets/rs_icon.png";

const ProductCard = ({
  image,
  name,
  price,
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
            <img
              className={classes.image}
              src={`data:image/jpeg;base64, ${image}`}
              alt="product_image"
            />
          </Card>
          <h4 className={classes.name}>{name}</h4>
          <div className={classes.price_container}>
            <img className={classes.price_symbol} src={rs_icon} alt="rsicon" />
            <span className={classes.price}>{price}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
