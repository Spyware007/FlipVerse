import React from "react";
import { Card } from "../index";
import classes from "./SingleProductCard.module.css";

const SingleProductCard = ({ image, name, price, id }) => {
  return (
    <Card width="400px" height="460px">
      <div className={classes.image_card}>
        <Card width="310px" height="370px">
          <img
            className={classes.image}
            src={`data:image/jpeg;base64, ${image}`}
            alt="single_product_image"
          />
        </Card>
      </div>
    </Card>
  );
};

export default SingleProductCard;
