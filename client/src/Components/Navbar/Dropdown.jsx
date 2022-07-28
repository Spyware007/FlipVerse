import React, { useState } from "react";
import { MenuItems } from "./MenuItems";
import classes from "./Dropdown.module.css";
import { NavLink } from "react-router-dom";

function Dropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={
          click
            ? `${classes.dropdown_menu} ${classes.clicked}`
            : classes.dropdown_menu
        }
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <NavLink
                className={classes.dropdown_link}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
