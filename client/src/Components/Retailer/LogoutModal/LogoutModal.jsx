import React, { useContext } from "react";
import { Button, Modal } from "../../UI";
import classes from "./LogoutModal.module.css";
import { sellerAuthContext } from "../../../Contexts";

const LogoutModal = (props) => {
  const { logoutSeller } = useContext(sellerAuthContext);

  return (
    <Modal onClose={props.onClose}>
      <h1 className={classes.text}>Are you sure you want to logout?</h1>
      <div className={classes.btns}>
        <Button label="Logout" onClick={logoutSeller} />
        <Button label="Cancel" filled onClick={props.onClose} />
      </div>
    </Modal>
  );
};

export default LogoutModal;
