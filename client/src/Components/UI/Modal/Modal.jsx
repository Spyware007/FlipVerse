import React from "react";
import ReactDOM from "react-dom";
import Card from "../Card/Card";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <Card width="600px" height="300px">
        <div className={classes.content}>{props.children}</div>
      </Card>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      <div className={classes.container}>
        {ReactDOM.createPortal(
          <ModalOverlay onColor={props.onColor}>{props.children}</ModalOverlay>,
          portalElement
        )}
      </div>
    </>
  );
};

export default Modal;
