import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import cart_icon from "../../Assets/cart.svg";
import profile_icon from "../../Assets/profile.svg";
import { Logo } from "../UI";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isActive, setActive] = useState(false);
  const navHandler = () => {
    setActive((prevState) => !prevState);
    // disableScroll();
  };
  // const disableScroll = () => {
  //   document.body.classList.toggle("stop-scrolling");
  // };
  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  // }, []);
  return (
    <>
      <nav className={classes.navbar}>
        <div className={classes.logo_container}>
          <Logo />
        </div>
        <div
          className={`${classes.nav_links_container} ${
            isActive ? classes.active : ""
          }`}
        >
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
        <div className={classes.btn}>
          <button className={classes.icon} onClick={navHandler}>
            <span className={classes.line + " " + classes.line1}></span>
            <span className={classes.line + " " + classes.line2}></span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
