import React from "react";
import classes from "./Button.module.css";

const Button = ({ onClick, label, filled }) => {
  return (
    <>
      <button className={filled ? classes.fill : classes.btn} onClick={onClick}>
        {label}
      </button>
    </>
  );
};

export default Button;
