import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import cart_icon from "../../Assets/cart.svg";
import profile_icon from "../../Assets/profile.svg";
import { sellerAuthContext, userAuthContext } from "../../Contexts";

import { Logo } from "../UI";
import classes from "./Navbar.module.css";

const Navbar = () => {
	const redirect = useNavigate();
	const { isSellerAuthenticated, logoutSeller } = useContext(sellerAuthContext);
	const { isUserAuthenticated, logout } = useContext(userAuthContext);
	// const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isActive, setActive] = useState(false);
	const navHandler = () => {
		setActive((prevState) => !prevState);
		// disableScroll();
	};
	const authenticated = isSellerAuthenticated || isUserAuthenticated;
	const logoutHandler = () => {
		if (isSellerAuthenticated) {
			logoutSeller();
		} else {
			logout();
		}
		redirect("/login");
	};

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
						{!authenticated && (
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
					{authenticated && (
						<>
							<li className={classes.link_container}>
								<div onClick={logoutHandler} className={classes.link}>
									Logout
								</div>
							</li>
							<div className={classes.icons_container}>
								<div className={classes.icon_container}>
									<img className={classes.icon} src={cart_icon} alt="" />
								</div>
								<div className={classes.icon_container}>
									<img className={classes.icon} src={profile_icon} alt="" />
								</div>
							</div>
						</>
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
