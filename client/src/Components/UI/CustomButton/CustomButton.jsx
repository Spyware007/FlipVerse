import React from "react";
import classes from "./CustomButton.module.css";

const CustomButton = ({
  children,
  onClick,
  label,
  disabled,
  filled,
  padding = "0.5em 1.5em",
  fontSize = "17px",
}) => {
  return (
    <>
      <button
        style={{ padding: padding, fontSize: fontSize }}
        className={filled ? classes.fill : classes.btn}
        onClick={onClick}
        disabled={disabled}
      >
        {label || children}
      </button>
    </>
  );
};

export default CustomButton;
