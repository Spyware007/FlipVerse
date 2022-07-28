import React, { useContext } from "react";
import classes from "./Profile.module.css";
import { Card, InputField } from "../../UI";
import { userAuthContext } from "../../../Contexts/";

const Profile = () => {
  const { user } = useContext(userAuthContext);
  return (
    <>
      <div className="">
        <Card smooth width="900px" height="400px">
          <div className={classes.profile_card}>
            <div className={classes.profile_pic}></div>
            <div className={classes.inputs}>
              <h1>{user.name}</h1>
              <h1>{user.email}</h1>
              <InputField
                // reference={nameRef}
                type="name"
                // value={name}
                label="Address"
                name="address"
                placeholder="Address"
                required
              />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Profile;
