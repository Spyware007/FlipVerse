import React, { useEffect, useContext, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { CustomButton, ProductCard, SingleProductCard } from "../UI";
import { useNotification } from "@web3uikit/core";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./Product.module.css";
import abi from "../../Constants/abi.json";
import rs_icon from "../../Assets/rs_icon.png";
import {
	productContext,
	sellerAuthContext,
	userAuthContext,
} from "../../Contexts";

const Product = () => {
	const contractAddress = "0xc7e886c33eb26501c966eaf35db7bb15dd46b45d";
	const [sellerWalletAddress, setSellerWalletAddress] = useState("");
	const [userAccountAddress, setUserAccountAddress] = useState("");
	const [tokenId, setTokenId] = useState(null);

	const {
		getSingleProduct,
		product,
		orderProduct,
		dispatchProductWithWarranty,
		updateProductToken,
	} = useContext(productContext);
	const { isSellerAuthenticated } = useContext(sellerAuthContext);
	const { isUserAuthenticated } = useContext(userAuthContext);
	const { productId } = useParams();

	const dispatch = useNotification();

	const {
		title,
		brand,
		category,
		description,
		price,
		isReadyForSale,
		productTokenId,
		image,
		orderedBy,
		hasWarranty,
		warrantyDurationInSeconds,
	} = product;

	// const { runContractFunction: getBlockTimeStamp } = useWeb3Contract({
	// 	abi,
	// 	contractAddress,
	// 	functionName: "getBlockTimeStamp",
	// 	params: {},
	// });

	const { runContractFunction: createWarrantyCard } = useWeb3Contract({
		abi,
		contractAddress,
		functionName: "safeMint",
		params: {
			to: sellerWalletAddress,
			uri: {
				"name": `${title}`,
				"description": `${description}`,
				"image":
					"https://images.pexels.com/photos/1311590/pexels-photo-1311590.jpeg?auto=compress&cs=tinysrgb&w=600",
			},
		},
	});

	const { runContractFunction: transferWarrantyCard } = useWeb3Contract({
		abi,
		contractAddress,
		functionName: "safeTransferFrom(address,address,uint256)",
		params: {
			from: sellerWalletAddress,
			to: userAccountAddress || "",
			tokenId: 0,
		},
	});

	const { runContractFunction: changeWarrantyCardOwner } = useWeb3Contract({
		abi,
		contractAddress,
		functionName: "changeCurrentOwner",
		params: {
			hasPurchased: true,
			newOwner: "0xbE6B4Bc688Ac02374922D9f7a8697C6D1EEA395C" || "",
			tokenId: 0,
		},
		overrides: {
			gasLimit: 300000000,
		},
	});

	const redirect = useNavigate();

	const {
		enableWeb3,
		isWeb3Enabled,
		isWeb3EnableLoading,
		account,
		Moralis,
		deactivateWeb3,
	} = useMoralis();

	useEffect(() => {
		const getProduct = async () => {
			await getSingleProduct(productId);
		};

		getProduct();

		if (!isWeb3Enabled && localStorage.getItem("connected")) {
			enableWeb3();
		}

		setSellerWalletAddress(account);
	}, [isWeb3Enabled]);

	useEffect(() => {
		Moralis.onAccountChanged((account) => {
			setSellerWalletAddress(account);
			if (account == null) {
				window.localStorage.removeItem("connected");
				deactivateWeb3();
			}
		});
	}, []);

	const connectWallet = async () => {
		await enableWeb3();
		localStorage.setItem("connected", "walletconnect");
		setSellerWalletAddress(account);
	};

	const handleClick = (pId) => {
		if (!sellerWalletAddress) {
			console.log("Connect to a wallet first to receive warranty!");
			return;
		}
		orderProduct(pId, sellerWalletAddress);
	};

	const unauthorized = () => {
		redirect("/");
	};

	const handleNotification = (message, title) => {
		dispatch({
			type: "info",
			message,
			title,
			position: "topR",
		});
	};

	const handleSuccess = async (tx) => {
		await tx.wait(1);
		handleNotification("Transaction Successful!", "Tx Notification");
	};

	const handleError = (error) => {
		console.log(error);
		handleNotification(
			"Transaction UnSuccessful! Something went wrong",
			"Tx Notification",
		);
	};

	const handleDispatch = async (productId, tokenId) => {
		if (!tokenId && hasWarranty) {
			alert("Please create warranty!");
			return;
		}
		await dispatchProductWithWarranty(productId, tokenId);
	};

	const handleCreateWarrantyCard = async () => {
		try {
			const res = await createWarrantyCard({
				onSuccess: handleSuccess,
				onError: (error) => handleError(error),
			});
			res.wait(1).then((transactionReceipt) => {
				const tokenIdNum = parseInt(transactionReceipt.logs[0].topics[3]);
				setTokenId(tokenIdNum);
				console.log(productId);
				updateProductToken(productId, tokenIdNum);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleTransferOfWarranty = async () => {
		setUserAccountAddress(orderedBy.walletAddress);
		if (userAccountAddress === "") return;

		try {
			await transferWarrantyCard({
				onSuccess: handleSuccess,
				onError: (error) => handleError(error),
			});
			return;
		} catch (error) {
			console.log(error);
		}
	};

	const changeOwnership = async () => {
		setUserAccountAddress(orderedBy.walletAddress);
		if (userAccountAddress === "") return;
		try {
			const res2 = await changeWarrantyCardOwner({
				onSuccess: handleSuccess,
				onError: (error) => handleError(error),
			});
			console.log(res2);
		} catch (error) {}
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
									onClick={() => handleDispatch(productId, tokenId)}
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
							{/* {isWeb3Enabled && (
								<CustomButton
									onClick={async () => {
										try {
											const res = await getBlockTimeStamp();
											console.log(parseInt(parseInt(res._hex)));
											console.log(res);
										} catch (error) {
											console.log(error);
										}
									}}
									label="Get Timestamp"
									padding="0.5em 11em"
									filled
								/>
							)} */}
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
							{isWeb3Enabled &&
								isSellerAuthenticated &&
								!productTokenId &&
								hasWarranty && (
									<CustomButton
										onClick={handleCreateWarrantyCard}
										label="Create Warranty Card NFT"
										padding="0.5em 7em"
										filled
									/>
								)}
							{isWeb3Enabled &&
								isSellerAuthenticated &&
								productTokenId &&
								isReadyForSale &&
								hasWarranty && (
									<CustomButton
										onClick={handleTransferOfWarranty}
										label={"Transfer Warranty Card NFT"}
										padding="0.5em 7em"
										filled
									/>
								)}
							{isWeb3Enabled &&
								isSellerAuthenticated &&
								productTokenId &&
								isReadyForSale &&
								hasWarranty && (
									<CustomButton
										onClick={changeOwnership}
										label={"Change Owner"}
										padding="0.5em 7em"
										filled
									/>
								)}
							{isWeb3Enabled &&
								!isSellerAuthenticated &&
								"This address will be used to store your warranty card"}
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
