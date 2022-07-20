import React from "react";
import classes from "./Card.module.css";

const Card = ({ children, width, height, padding }) => {
  return (
    <div
      style={{ width: width, height: height, padding: padding }}
      className={classes.card}
    >
      {children}
    </div>
  );
};

export default Card;
