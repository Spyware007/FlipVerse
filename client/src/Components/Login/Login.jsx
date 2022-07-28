import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { sellerAuthContext, userAuthContext } from "../../Contexts";
import { InputField, CustomButton } from "../UI";
import classes from "./Login.module.css";
import LoginHero from "./LoginHero";

const Login = () => {
  const redirect = useNavigate();
  const { loginSeller, sellerError, clearSellerErrors, isSellerAuthenticated } =
    useContext(sellerAuthContext);
  const { login, error, clearErrors, isUserAuthenticated } =
    useContext(userAuthContext);

  useEffect(() => {
    if (isUserAuthenticated || isSellerAuthenticated) {
      redirect("/");
    }

    if (sellerError) {
      // AlertContext.setAlert(error, "danger");
      clearSellerErrors();
    } else if (error) {
      clearErrors();
    }
    //eslint-disable-next-line
  }, [sellerError, error, isSellerAuthenticated, isUserAuthenticated]); //,props.history]
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

  const onSubmitSellerHandler = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      // AlertContext.setAlert("Please enter all fields", "danger"); add a state
      // AlertContext.setAlert("Passwords do not match", "danger"); add a state
    } else {
      try {
        await loginSeller({ email, password });
        redirect("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      // AlertContext.setAlert("Please enter all fields", "danger"); add a state
      // AlertContext.setAlert("Passwords do not match", "danger"); add a state
    } else {
      try {
        await login({ email, password });
        redirect("/");
      } catch (error) {
        console.log(error);
      }
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
              {!isUserAuthenticated ? (
                <CustomButton
                  onClick={onSubmitHandler}
                  disabled={isUserAuthenticated}
                  label="User Log In"
                  filled
                />
              ) : null}
              {!isSellerAuthenticated ? (
                <CustomButton
                  onClick={onSubmitSellerHandler}
                  label="Seller Log In"
                  disabled={isSellerAuthenticated}
                  filled
                />
              ) : null}
            </div>
            <p className={classes.login_para}>
              Don&apos;t have an account ?
              <NavLink to="/signup"> Create an Account</NavLink>
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
      </div>
    </>
  );
};

export default Login;
