import React from "react";
import { Card } from "../index";
import classes from "./ProductCard.module.css";
import rs_icon from "../../../Assets/rs_icon.png";
import { Link } from "react-router-dom";

const ProductCard = ({
  image,
  name,
  price,
  outerWidth = "300px",
  outerHeight = "390px",
  innerWidth = "230px",
  innerHeight = "250px",
  id,
  alt = "product_image",
  show = false,
  disabled,
}) => {
  return (
    <Link to={!disabled ? `/product/${id}` : ""}>
      <div className={classes.product_card}>
        <Card width={outerWidth} height={outerHeight} styles>
          <div className={classes.content_container}>
            <Card width={innerWidth} height={innerHeight}>
              {show ? (
                <img className={classes.image} src={image} alt={alt} />
              ) : (
                <img
                  className={classes.image}
                  src={`data:image/jpeg;base64, ${image}`}
                  alt={alt}
                />
              )}
            </Card>
            <h4 className={classes.name}>{name}</h4>
            <div className={classes.price_container}>
              <img
                className={classes.price_symbol}
                src={rs_icon}
                alt="rsicon"
              />
              <span className={classes.price}>{price}</span>
            </div>
          </div>
        </Card>
      </div>
    </Link>
  );
};

export default ProductCard;
