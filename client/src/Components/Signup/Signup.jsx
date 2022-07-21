import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Signup.module.css";
import { Card, InputField, Button } from "../UI";
import SignupHero from "./SignupHero";

const Signup = () => {
  return (
    <>
      <div className={classes.signup}>
        <div className={classes.left_section}>
          <Card width="500px" height="600px" padding="0px">
            <div className={classes.form_container}>
              <h1 className={classes.signup_text}>Create Account.</h1>
              <form className={classes.form}>
                <div className={classes.inputs}>
                  <InputField
                    // reference={nameRef}
                    type="name"
                    // value={name}
                    label="Name"
                    name="name"
                    placeholder="Name"
                    required
                  />
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
                  <InputField
                    // reference={nameRef}
                    type="password"
                    // value={name}
                    label="Confirm Password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <div className={classes.btn}>
                  <Button
                    // onClick={handleClick}
                    label="Create"
                    filled
                  />
                </div>
                <p className={classes.signup_para}>
                  Already login ?<NavLink to="/signup"> Sign Up</NavLink>
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
          </Card>
        </div>

        <div className={classes.right_section}>
          <SignupHero />
        </div>
      </div>
    </>
  );
};

export default Signup;
