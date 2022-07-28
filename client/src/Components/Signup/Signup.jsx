import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import sellerAuthContext from "../../Contexts/SellerAuthContext/sellerAuthContext";
import userAuthContext from "../../Contexts/UserAuthContext/userAuthContext";
import classes from "./Signup.module.css";
import { Card, InputField, CustomButton } from "../UI";
import SignupHero from "./SignupHero";

const Signup = (props) => {
  const redirect = useNavigate();
  const {
    registerSeller,
    sellerError,
    clearSellerErrors,
    isSellerAuthenticated,
  } = useContext(sellerAuthContext);

  const { registerUser, error, clearErrors, isUserAuthenticated } =
    useContext(userAuthContext);

  useEffect(() => {
    if (isSellerAuthenticated || isUserAuthenticated) {
      redirect("/");
    }
    if (sellerError) {
      clearSellerErrors();
    } else if (error) {
      clearErrors();
    }
    //eslint-disable-next-line
  }, [sellerError, isSellerAuthenticated, error, isUserAuthenticated]); //,props.history]
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

  const onSubmitSellerHandler = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      // AlertContext.setAlert("Please enter all fields", "danger"); add a state
    } else if (password !== password2) {
      // AlertContext.setAlert("Passwords do not match", "danger"); add a state
    } else {
      try {
        await registerSeller({ name, email, password });
        redirect("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      // AlertContext.setAlert("Please enter all fields", "danger"); add a state
    } else if (password !== password2) {
      // AlertContext.setAlert("Passwords do not match", "danger"); add a state
    } else {
      try {
        await registerUser({ name, email, password });
        redirect("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

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
                  {!isUserAuthenticated ? (
                    <CustomButton
                      onClick={onSubmitHandler}
                      label="Create User"
                      disabled={isUserAuthenticated}
                      filled
                    />
                  ) : null}
                  {!isSellerAuthenticated ? (
                    <CustomButton
                      onClick={onSubmitSellerHandler}
                      label="Create Seller"
                      disabled={isSellerAuthenticated}
                      filled
                    />
                  ) : null}
                </div>
                <p className={classes.signup_para}>
                  Already a user?<NavLink to="/login"> Log In</NavLink>
                </p>
                {/* <div className={classes.btn}>
              <CustomButton
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
