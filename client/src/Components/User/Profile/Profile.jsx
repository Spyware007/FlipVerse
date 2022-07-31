import React, { useContext } from "react";
import classes from "./Profile.module.css";
import { Card, ProductCard } from "../../UI";
import { userAuthContext } from "../../../Contexts/";

const Profile = () => {
	const { user } = useContext(userAuthContext);
	return (
		<>
			<div className={classes.profile}>
				<Card smooth width="auto" height="auto">
					<div className={classes.profile_card}>
						<div className={classes.profile_pic}>
							<img
								className={classes.image}
								src={`data:image/jpeg;base64, ${user.image}`}
								alt="seller_image"
							/>
						</div>
						<div className={classes.inputs}>
							<h1>Name: {user.name}</h1>
							<h2>Email: {user.email}</h2>
							{user.address && <h3>Address: {user.address}</h3>}
						</div>
					</div>
				</Card>
			</div>
		</>
	);
};

export default Profile;
