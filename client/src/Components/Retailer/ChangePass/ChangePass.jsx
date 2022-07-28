import React from "react";
import classes from "./ChangePass.module.css";
import { Card, InputField, CustomButton } from "../../UI";

const ChangePass = () => {
  return (
    <>
      <Card width="800px" height="320px">
        <div className={classes.outer_container}>
          <div className={classes.inputs}>
            <InputField
              // reference={nameRef}
              type="password"
              // value={name}
              label="Enter New Password"
              name="password"
              placeholder="Password"
              required
            />
            <InputField
              // reference={nameRef}
              type="password"
              // value={name}
              label="Confirm New Password"
              name="confirm_password"
              placeholder="Confirm Password"
              required
            />
          </div>
          <CustomButton filled label="Change Password" />
        </div>
      </Card>
    </>
  );
};

export default ChangePass;
