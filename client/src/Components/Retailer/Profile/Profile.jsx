import React, { useContext } from "react";
import classes from "./Profile.module.css";
import { Card } from "../../UI";
import { sellerAuthContext } from "../../../Contexts";

const Profile = () => {
	const { seller } = useContext(sellerAuthContext);
	return (
		<>
			<div className={classes.profile}>
				<Card smooth width="auto" height="auto">
					<div className={classes.profile_card}>
						<div className={classes.profile_pic}>
							<img
								className={classes.image}
								src={`data:image/jpeg;base64, ${seller?.image || ""}`}
								alt="seller_image"
							/>
						</div>
						<div className={classes.inputs}>
							<h2>Retailer Name: {seller.name}</h2>
							<h2>Retailer Email: {seller.email}</h2>
						</div>
					</div>
				</Card>
			</div>
		</>
	);
};

export default Profile;
