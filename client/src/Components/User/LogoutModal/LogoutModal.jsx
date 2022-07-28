import React, { useContext } from "react";
import { CustomButton, Modal } from "../../UI";
import { userAuthContext } from "../../../Contexts";
import { useNavigate } from "react-router-dom";
import classes from "./LogoutModal.module.css";

const LogoutModal = (props) => {
  const { logout } = useContext(userAuthContext);
  const redirect = useNavigate();
  const onClickLogout = () => {
    logout();
    redirect("/");
  };
  return (
    <Modal onClose={props.onClose}>
      <h1 className={classes.text}>Are you sure you want to logout?</h1>
      <div className={classes.btns}>
        <CustomButton label="Logout" onClick={onClickLogout} />
        <CustomButton label="Cancel" filled onClick={props.onClose} />
      </div>
    </Modal>
  );
};

export default LogoutModal;
