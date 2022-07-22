import React from "react";
import classes from "./Card.module.css";

const CurvedCard = (children, width, height, padding) => (
  <div
    style={{ width: width, height: height, padding: padding }}
    className={classes.card}
  >
    {children}
  </div>
);
const SmoothCard = (children, width, height, padding) => (
  <div
    style={{ width: width, height: height, padding: padding }}
    className={classes.smooth_card}
  >
    {children}
  </div>
);

const Card = ({ children, width, height, padding, smooth }) => {
  return (
    <>
      {smooth
        ? SmoothCard(children, width, height, padding)
        : CurvedCard(children, width, height, padding)}
    </>
  );
};

export default Card;
