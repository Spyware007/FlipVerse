import React, { useReducer, useState } from "react";
import classes from "./User.module.css";
import { Card } from "../UI";
import {
	Profile,
	ChangePass,
	EditProfile,
	PurchasedItems,
	LogoutModal,
} from "./";
import profile from "../../Assets/profile.svg";
import editProfile from "../../Assets/edit.svg";
import changePass from "../../Assets/changePass.svg";
import purchased from "../../Assets/purchased.svg";
import logout from "../../Assets/logout.svg";

const reducerFunction = (state, action) => {
	switch (action.type) {
		case "profile":
			return {
				...state,
				asideSection: "profile",
			};
		case "editProfile":
			return {
				...state,
				asideSection: "editProfile",
			};
		case "changePass":
			return {
				...state,
				asideSection: "changePass",
			};
		case "purchasedItems":
			return {
				...state,
				asideSection: "purchasedItems",
			};
		default:
			return {
				...state,
			};
	}
};

const initialState = {
	asideSection: "profile",
};

const User = () => {
	const [state, dispatch] = useReducer(reducerFunction, initialState);
	const [show, setShow] = useState(false);
	const showHandler = () => {
		setShow(true);
	};
	const hideHandler = () => {
		setShow(false);
	};
	return (
		<>
			{show && <LogoutModal onClose={hideHandler} />}

			<div className={classes.user_profile}>
				<div className={classes.user_nav}>
					<Card smooth width="25vw" height="80vh">
						<div className={classes.nav_links_container}>
							<ul className={classes.nav_links}>
								<li className={classes.link_container}>
									<div
										onClick={() => dispatch({ type: "profile" })}
										className={classes.link}
									>
										<span className={classes.side_nav}>Your Profile </span>
										<span>
											<img className={classes.icon} src={profile} alt="icons" />
										</span>
									</div>
								</li>
								<li className={classes.link_container}>
									<div
										onClick={() => dispatch({ type: "editProfile" })}
										className={classes.link}
									>
										<span className={classes.side_nav}>Edit Profile </span>
										<span>
											<img
												className={classes.icon}
												src={editProfile}
												alt="icons"
											/>
										</span>
									</div>
								</li>
								<li className={classes.link_container}>
									<div
										onClick={() => dispatch({ type: "purchasedItems" })}
										className={classes.link}
									>
										<span className={classes.side_nav}>Purchased Items </span>
										<span>
											<img
												className={classes.icon}
												src={purchased}
												alt="icons"
											/>
										</span>
									</div>
								</li>
								{/* <li className={classes.link_container}>
                  <div
                    onClick={() => dispatch({ type: "changePass" })}
                    className={classes.link}
                  >
                    <span className={classes.side_nav}>Change Password </span>
                    <span>
                      <img
                        className={classes.icon}
                        src={changePass}
                        alt="icons"
                      />
                    </span>
                  </div>
                </li> */}
								<li className={classes.link_container}>
									<div onClick={() => showHandler()} className={classes.link}>
										<span className={classes.side_nav}>Logout </span>
										<span>
											<img className={classes.icon} src={logout} alt="icons" />
										</span>
									</div>
								</li>
							</ul>
						</div>
					</Card>
				</div>

				<div className={classes.user_sections}>
					{(state.asideSection === "profile" && <Profile />) ||
						(state.asideSection === "editProfile" && <EditProfile />) ||
						(state.asideSection === "changePass" && <ChangePass />) ||
						(state.asideSection === "purchasedItems" && <PurchasedItems />)}
				</div>
			</div>
		</>
	);
};

export default User;
