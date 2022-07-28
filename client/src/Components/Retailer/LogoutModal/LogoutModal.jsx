import React, { useContext } from "react";
import { CustomButton, Modal } from "../../UI";
import classes from "./LogoutModal.module.css";
import { sellerAuthContext } from "../../../Contexts";

const LogoutModal = (props) => {
  const { logoutSeller } = useContext(sellerAuthContext);

  return (
    <Modal onClose={props.onClose}>
      <h1 className={classes.text}>Are you sure you want to logout?</h1>
      <div className={classes.btns}>
        <CustomButton label="Logout" onClick={logoutSeller} />
        <CustomButton label="Cancel" filled onClick={props.onClose} />
      </div>
    </Modal>
  );
};

export default LogoutModal;
