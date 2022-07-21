import React from "react";
import classes from "./Login.module.css";
import LoginHero from "./LoginHero";

import { InputField, Button } from "../UI";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className={classes.login_section}>
        <div className={classes.left_section}>
          <LoginHero />
        </div>
        <div className={classes.right_section}>
          <h1 className={classes.login_text}>Log in</h1>
          <form className={classes.form}>
            <div className={classes.inputs}>
              <InputField
                // reference={nameRef}
                type="email"
                // value={name}
                label="Email Address"
                name="email"
                placeholder="Email Address"
                required
              />
              <InputField
                // reference={nameRef}
                type="password"
                // value={name}
                label="Password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <div className={classes.btn}>
              <Button
                // onClick={handleClick}
                label="Log In"
                filled
              />
            </div>
            <p className={classes.login_para}>
              Don&apos;t have an account ?
              <NavLink to="/signup"> Create an Account</NavLink>
            </p>
            {/* <div className={classes.btn}>
              <Button
                // onClick={handleClick}
                label="Sign Up"
                // filled
              />
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
