import React, { useContext } from "react";
import classes from "./Profile.module.css";
import { Card } from "../../UI";
import { sellerAuthContext } from "../../../Contexts";

const Profile = () => {
  const { seller } = useContext(sellerAuthContext);
  return (
    <>
      <div className="">
        <Card smooth width="900px" height="400px">
          <div className={classes.profile_card}>
            <div className={classes.profile_pic}></div>
            <div className={classes.inputs}>
              <h2>Retailer Name:{seller.name}</h2>
              <h2>Retailer Email:{seller.email}</h2>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Profile;
