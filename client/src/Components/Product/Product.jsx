import React, { useEffect, useContext, useState } from "react";
import { useMoralis } from "react-moralis";
import { CustomButton, ProductCard, SingleProductCard } from "../UI";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./Product.module.css";
import rs_icon from "../../Assets/rs_icon.png";
import {
	productContext,
	sellerAuthContext,
	userAuthContext,
} from "../../Contexts";

const Product = () => {
	const redirect = useNavigate();

	const [walletAddress, setWalletAddress] = useState("");

	const { getSingleProduct, product, orderProduct } =
		useContext(productContext);
	const { isSellerAuthenticated } = useContext(sellerAuthContext);
	const { isUserAuthenticated } = useContext(userAuthContext);
	const { productId } = useParams();

	const {
		enableWeb3,
		isWeb3Enabled,
		isWeb3EnableLoading,
		account,
		Moralis,
		deactivateWeb3,
	} = useMoralis();

	useEffect(() => {
		getSingleProduct(productId);
		if (!isWeb3Enabled && localStorage.getItem("connected")) {
			enableWeb3();
		}
		setWalletAddress(account);
	}, [isWeb3Enabled]);

	useEffect(() => {
		Moralis.onAccountChanged((account) => {
			console.log(`Account changed to ${account}`);
			setWalletAddress(account);
			if (account == null) {
				window.localStorage.removeItem("connected");
				deactivateWeb3();
				console.log("Null Account found");
			}
		});
	}, []);

	const connectWallet = async () => {
		await enableWeb3();
		localStorage.setItem("connected", "walletconnect");
		setWalletAddress(account);
	};

	const handleClick = (pId) => {
		if (!walletAddress) {
			console.log("Connect to a wallet first to receive warranty!");
			return;
		}
		orderProduct(pId, walletAddress);
	};

	const {
		title,
		brand,
		category,
		description,
		price,
		isReadyForSale,
		image,
		hasWarranty,
		warrantyDurationInSeconds,
	} = product;

	const unauthorized = () => {
		redirect("/");
	};
	const authorizedPerson = isSellerAuthenticated || isUserAuthenticated;

	return (
		<>
			<div className={classes.product_page}>
				<div className={classes.product}>
					<div>
						<SingleProductCard image={image} />
					</div>
					<div className={classes.product_content}>
						<h1 className={classes.product_name}>{title}</h1>
						<h2 className={classes.product_name}>Brand: {brand}</h2>
						<h3 className={classes.product_name}>Category: {category}</h3>
						<p className={classes.product_description}>{description}</p>
						<div className={classes.price_container}>
							<img className={classes.price_symbol} src={rs_icon} alt="" />
							<span className={classes.price}>{price}</span>
						</div>
						{hasWarranty && (
							<h4>
								Product available with warranty of{" "}
								{warrantyDurationInSeconds / (3600 * 365 * 24)} years
							</h4>
						)}
						<div className={classes.btn}>
							{isSellerAuthenticated && isReadyForSale && (
								<CustomButton
									// onClick={handleClick}
									label="DISPATCH"
									padding="0.5em 11em"
									filled
								/>
							)}
							{isUserAuthenticated && (
								<CustomButton
									onClick={() => handleClick(productId)}
									label="BUY"
									padding="0.5em 11em"
									filled
								/>
							)}
							{!authorizedPerson && (
								<CustomButton
									onClick={unauthorized}
									label="LOGIN"
									padding="0.5em 11em"
									filled
								/>
							)}
							<CustomButton
								label={
									isWeb3Enabled
										? `Connected to ${account.slice(0, 4)}...${account.slice(
												39,
												account.length,
										  )}`
										: "Connect Wallet"
								}
								filled
								padding={`0.5em ${isWeb3Enabled ? 5.2 : 8}em`}
								onClick={connectWallet}
								disabled={isWeb3EnableLoading}
							/>
							{/* {isWeb3Enabled &&
								"This address will be used to store your warranty card"} */}
							{/* <CustomButton
                // onClick={handleClick}
                // label="Add to Cart"
                padding="0.5em 8em"
                // filled
              >
                Add to Cart
                <CartIcon />
              </CustomButton> */}
						</div>
					</div>
				</div>
				<div className={classes.similar_container}>
					<h1 className={classes.similar_text}>Similar Products</h1>
					<div className={classes.similar_products}>
						<ProductCard image={""} />
						<ProductCard image={""} />
						<ProductCard image={""} />
						<ProductCard image={""} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Product;
