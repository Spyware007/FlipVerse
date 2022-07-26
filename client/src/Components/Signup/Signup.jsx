import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { sellerAuthContext } from "../../Contexts";
import classes from "./Signup.module.css";
import { Card, InputField, Button } from "../UI";
import SignupHero from "./SignupHero";

const Signup = (props) => {
  const redirect = useNavigate();
  const { registerUser, error, clearErrors, isAuthenticated } =
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
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onChangeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      // AlertContext.setAlert("Please enter all fields", "danger"); add a state
    } else if (password !== password2) {
      // AlertContext.setAlert("Passwords do not match", "danger"); add a state
    } else {
      registerUser({ name, email, password });

      redirect("/");
    }
  };
  return (
    <>
      <div className={classes.signup}>
        <div className={classes.left_section}>
          <Card width="500px" height="600px" padding="0px">
            <div className={classes.form_container}>
              <h1 className={classes.signup_text}>Create Account.</h1>
              <form className={classes.form} onSubmit={onSubmitHandler}>
                <div className={classes.inputs}>
                  <InputField
                    // reference={nameRef}
                    onChange={onChangeHandler}
                    type="name"
                    value={name}
                    label="Name"
                    name="name"
                    placeholder="Name"
                    required
                  />
                  <InputField
                    // reference={nameRef}
                    onChange={onChangeHandler}
                    type="email"
                    value={email}
                    label="Email Address"
                    name="email"
                    placeholder="Email Address"
                    required
                  />
                  <InputField
                    // reference={nameRef}
                    onChange={onChangeHandler}
                    type="password"
                    value={password}
                    label="Password"
                    name="password"
                    placeholder="Password"
                    required
                  />
                  <InputField
                    // reference={nameRef}
                    onChange={onChangeHandler}
                    type="password"
                    value={password2}
                    label="Confirm Password"
                    name="password2"
                    placeholder="Confirm Password"
                    required
                  />
                </div>
                <div className={classes.btn}>
                  <Button
                    // onClick={handleClick}
                    label="Create User"
                    filled
                  />
                  <Button
                    // onClick={handleClick}
                    label="Create Seller"
                    filled
                  />
                </div>
                <p className={classes.signup_para}>
                  Already a user?<NavLink to="/login"> Log In</NavLink>
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
