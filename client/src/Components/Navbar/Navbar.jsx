import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import cart_icon from "../../Assets/cart.svg";
import profile_icon from "../../Assets/profile.svg";
import { Logo } from "../UI";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <nav className={classes.navbar}>
        <div className={classes.logo_container}>
          <Logo />
        </div>
        <div className={classes.nav_links_container}>
          <ul className={classes.nav_links}>
            <li className={classes.link_container}>
              <NavLink className={classes.link} to="/">
                Home
              </NavLink>
            </li>
            <li className={classes.link_container}>
              <NavLink className={classes.link} to="/">
                Explore
              </NavLink>
            </li>
            <li className={classes.link_container}>
              <NavLink className={classes.link} to="/verifynft">
                Verify Warranty
              </NavLink>
            </li>
            {!isAuthenticated && (
              <>
                <li className={classes.link_container}>
                  <NavLink className={classes.link} to="/signup">
                    Signup
                  </NavLink>
                </li>
                <li className={classes.link_container}>
                  <NavLink className={classes.link} to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {isAuthenticated && (
            <div className={classes.icons_container}>
              <div className={classes.icon_container}>
                <img className={classes.icon} src={cart_icon} alt="" />
              </div>
              <div className={classes.icon_container}>
                <img className={classes.icon} src={profile_icon} alt="" />
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
