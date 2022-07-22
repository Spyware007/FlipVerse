import React, { useReducer } from "react";
import classes from "./User.module.css";
import { Card } from "../UI";
import { Profile, ChangePass, EditProfile, PurchasedItems } from "./index";

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "profile":
      return {
        ...state,
        asideSection: "profile",
      };
    case "editProfile":
      return {
        ...state,
        asideSection: "editProfile",
      };
    case "changePass":
      return {
        ...state,
        asideSection: "changePass",
      };
    case "purchasedItems":
      return {
        ...state,
        asideSection: "purchasedItems",
      };
    default:
      return {
        ...state,
      };
  }
};

const initialState = {
  asideSection: "profile",
};

const User = () => {
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  return (
    <>
      <div className={classes.user_profile}>
        <div className={classes.user_nav}>
          <Card smooth width="30vw" height="80vh">
            <div className={classes.nav_links_container}>
              <ul className={classes.nav_links}>
                <li className={classes.link_container}>
                  <div
                    onClick={() => dispatch({ type: "profile" })}
                    className={classes.link}
                  >
                    Your Profile
                  </div>
                </li>
                <li className={classes.link_container}>
                  <div
                    onClick={() => dispatch({ type: "editProfile" })}
                    className={classes.link}
                  >
                    Edit Profile
                  </div>
                </li>
                <li className={classes.link_container}>
                  <div
                    onClick={() => dispatch({ type: "purchasedItems" })}
                    className={classes.link}
                  >
                    Purchased Items
                  </div>
                </li>
                <li className={classes.link_container}>
                  <div
                    onClick={() => dispatch({ type: "changePass" })}
                    className={classes.link}
                  >
                    Change Password
                  </div>
                </li>
                <li className={classes.link_container}>
                  <div onClick={""} className={classes.link}>
                    Logout
                  </div>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        <div className={classes.user_sections}>
          {(state.asideSection === "profile" && <Profile />) ||
            (state.asideSection === "editProfile" && <EditProfile />) ||
            (state.asideSection === "changePass" && <ChangePass />) ||
            (state.asideSection === "purchasedItems" && <PurchasedItems />)}
        </div>
      </div>
    </>
  );
};

export default User;
