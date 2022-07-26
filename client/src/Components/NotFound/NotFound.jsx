import React from "react";
import classes from "./NotFound.module.css";
import not_found from "../../Assets/not_found.png";

const NotFound = () => {
  return (
    <>
      <div className={classes.not_found}>
        <img className={classes.image_404} src={not_found} alt="not found" />
        <h1 className={classes.text}>Page Not Found</h1>
      </div>
    </>
  );
};

export default NotFound;
