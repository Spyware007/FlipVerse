import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { sellerAuthContext } from "../../Contexts";
import { InputField, Button } from "../UI";
import classes from "./Login.module.css";
import LoginHero from "./LoginHero";

const Login = () => {
  const { login, error, clearErrors, isAuthenticated } =
    useContext(sellerAuthContext);

  useEffect(() => {
    // if (isAuthenticated) {
    //   props.history.push("/");
    // }

    if (error) {
      // AlertContext.setAlert(error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated]); //,props.history]
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      // AlertContext.setAlert("Please enter all fields", "danger"); add a state
      // AlertContext.setAlert("Passwords do not match", "danger"); add a state
    } else {
      login({ email, password });
    }
  };
  return (
    <>
      <div className={classes.login_section}>
        <div className={classes.left_section}>
          <LoginHero />
        </div>
        <div className={classes.right_section}>
          <h1 className={classes.login_text}>Log in</h1>
          <form className={classes.form} onSubmit={onSubmitHandler}>
            <div className={classes.inputs}>
              <InputField
                // reference={nameRef}
                type="email"
                onChange={onChangeHandler}
                value={email}
                label="Email Address"
                name="email"
                placeholder="Email Address"
                required
              />
              <InputField
                // reference={nameRef}
                type="password"
                onChange={onChangeHandler}
                value={password}
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
