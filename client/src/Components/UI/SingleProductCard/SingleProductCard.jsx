import React from "react";
import { Card } from "../index";
import classes from "./SingleProductCard.module.css";

import trial1 from "../../../Assets/trial1.png";

const SingleProductCard = () => {
  return (
    <Card width="400px" height="460px">
      <div className={classes.image_card}>
        <Card width="310px" height="370px">
          <img className={classes.image} src={trial1} alt="trial" />
        </Card>
      </div>
    </Card>
  );
};

export default SingleProductCard;
