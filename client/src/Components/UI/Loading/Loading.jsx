import React from "react";
import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={classes.loader}>
      <div className={classes.wrapper}>
        <div className={classes.circle}></div>
        <div className={classes.circle}></div>
        <div className={classes.circle}></div>
        <div className={classes.shadow}></div>
        <div className={classes.shadow}></div>
        <div className={classes.shadow}></div>
      </div>
      <div className={classes.text}>
        <span className={classes.letter}>L</span>
        <span className={classes.letter}>O</span>
        <span className={classes.letter}>A</span>
        <span className={classes.letter}>D</span>
        <span className={classes.letter}>I</span>
        <span className={classes.letter}>N</span>
        <span className={classes.letter}>G</span>
      </div>
    </div>
  );
};

export default Loading;
