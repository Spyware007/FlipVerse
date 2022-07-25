import React from "react";
import Spline from "@splinetool/react-spline";
import classes from "./SplineModel.module.css";

const SplineModel = () => {
  return (
    <div className={classes.container}>
      {/* <Spline scene="https://prod.spline.design/gaSv-uhIf-xU2G43/scene.splinecode" /> */}
      <Spline scene="https://draft.spline.design/5p-WQPvi61S5tVLw/scene.splinecode" />
    </div>
  );
};

export default SplineModel;
