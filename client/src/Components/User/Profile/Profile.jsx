import React, { useContext } from "react";
import classes from "./Profile.module.css";
import { Card, ProductCard } from "../../UI";
import { userAuthContext } from "../../../Contexts/";

const Profile = () => {
  const { user } = useContext(userAuthContext);
  return (
    <>
      <div className={classes.profile_container}>
        <Card smooth width="auto" height="auto">
          <div className={classes.profile_card}>
            <div className={classes.profile_pic}>
              <ProductCard image={user.image} alt="user_image" disabled />
            </div>
            <div className={classes.inputs}>
              <h1>Name: {user.name}</h1>
              <h2>Email: {user.email}</h2>
              <h3>Address: {user.address}</h3>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Profile;
