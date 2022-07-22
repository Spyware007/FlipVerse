import React, { useReducer } from "react";
import classes from "./User.module.css";
import { Card } from "../UI";
import { Profile, ChangePass, EditProfile, PurchasedItems } from "./";
import profile from "../../Assets/profile.svg";
import editProfile from "../../Assets/edit.svg";
import changePass from "../../Assets/changePass.svg";
import purchased from "../../Assets/purchased.svg";
import logout from "../../Assets/logout.svg";

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
          <Card smooth width="25vw" height="80vh">
            <div className={classes.nav_links_container}>
              <ul className={classes.nav_links}>
                <li className={classes.link_container}>
                  <div
                    onClick={() => dispatch({ type: "profile" })}
                    className={classes.link}
                  >
                    Your Profile{" "}
                    <span>
                      <img className={classes.icon} src={profile} alt="icons" />
                    </span>
                  </div>
                </li>
                <li className={classes.link_container}>
                  <div
                    onClick={() => dispatch({ type: "editProfile" })}
                    className={classes.link}
                  >
                    Edit Profile{" "}
                    <span>
                      <img
                        className={classes.icon}
                        src={editProfile}
                        alt="icons"
                      />
                    </span>
                  </div>
                </li>
                <li className={classes.link_container}>
                  <div
                    onClick={() => dispatch({ type: "purchasedItems" })}
                    className={classes.link}
                  >
                    Purchased Items{" "}
                    <span>
                      <img
                        className={classes.icon}
                        src={purchased}
                        alt="icons"
                      />
                    </span>
                  </div>
                </li>
                <li className={classes.link_container}>
                  <div
                    onClick={() => dispatch({ type: "changePass" })}
                    className={classes.link}
                  >
                    Change Password{" "}
                    <span>
                      <img
                        className={classes.icon}
                        src={changePass}
                        alt="icons"
                      />
                    </span>
                  </div>
                </li>
                <li className={classes.link_container}>
                  <div onClick={""} className={classes.link}>
                    Logout{" "}
                    <span>
                      <img className={classes.icon} src={logout} alt="icons" />
                    </span>
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
