import React from "react";
import classes from "./Profile.module.css";
import { Card, InputField } from "../../UI";

const Profile = () => {
  return (
    <>
      <div className="">
        <Card smooth width="900px" height="400px">
          <div className={classes.profile_card}>
            <div className={classes.profile_pic}></div>
            <div className={classes.inputs}>
              <InputField
                // reference={nameRef}
                type="name"
                // value={name}
                label="Name"
                name="email"
                placeholder="Name"
                required
              />
              <InputField
                // reference={nameRef}
                type="email"
                // value={name}
                label="Email Id"
                name="email"
                placeholder="Email ID"
                required
              />
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
