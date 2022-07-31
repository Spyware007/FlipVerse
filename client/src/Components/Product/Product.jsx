import React, { useEffect, useContext, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { CustomButton, SingleProductCard } from "../UI";
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
	const contractAddress = "0x171F6Cd3aaa32a6f1cFDAa63fF0a2d056473C569";
	const [sellerWalletAddress, setSellerWalletAddress] = useState("");
	const [userAccountAddress, setUserAccountAddress] = useState("");
	const [tokenId, setTokenId] = useState(null);
	const [isSold, setIsSold] = useState(false);
	const [warrantyDuration, setWarrantyDuration] = useState(null);

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

	const { runContractFunction: setDurationForTokenId } = useWeb3Contract({
		abi,
		contractAddress,
		functionName: "setDurationForTokenId",
		params: {
			tokenId: tokenId,
			duration: warrantyDuration,
		},
	});

	const { runContractFunction: changeWarrantyPeriod } = useWeb3Contract({
		abi,
		contractAddress,
		functionName: "changeWarrantyPeriod",
		params: {
			hasPurchased: true,
			tokenId: tokenId,
		},
	});

	const { runContractFunction: transferWarrantyCard } = useWeb3Contract({
		abi,
		contractAddress,
		functionName: "safeTransferFrom(address,address,uint256)",
		params: {
			from: sellerWalletAddress,
			to: userAccountAddress,
			tokenId: tokenId,
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
			const pr = await getSingleProduct(productId);
			setTokenId(pr.productTokenId);
			setWarrantyDuration(pr.warrantyDurationInSeconds);
			setIsSold(pr.sold);
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
		if (!sellerWalletAddress && hasWarranty) {
			handleSuccess("Please connect a wallet!", "Notification");
			return;
		}
		orderProduct(pId, sellerWalletAddress);
		handleSuccess("Ordered Successfully", "Notification");
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

	const handleSuccess = async (message, notification) => {
		handleNotification(message, notification);
	};

	const handleError = (error) => {
		console.log(error);
		handleNotification(
			"Transaction UnSuccessful! Make sure you are connected to the right account",
			"Tx Notification",
		);
	};

	let hasProductTokenId =
		productTokenId === undefined || tokenId === null ? false : true;

	const handleDispatch = async (productId, tokenId) => {
		if (hasProductTokenId && hasWarranty) {
			await dispatchProductWithWarranty(productId, tokenId);
			handleSuccess("Product Dispatched...!", "Notification");
		} else {
			handleSuccess(
				"Product Dispatch Unsuccessful! Please check everything!",
				"Notification",
			);
		}
	};

	const handleCreateWarrantyCard = async () => {
		try {
			const res = await createWarrantyCard({
				onSuccess: () =>
					handleSuccess("Transaction Successful!", "Tx Notification"),
				onError: (error) => handleError(error),
			});

			res.wait(1).then((transactionReceipt) => {
				const tokenIdNum = parseInt(transactionReceipt.logs[0].topics[3]);
				setTokenId(tokenIdNum);
				updateProductToken(productId, tokenIdNum, orderedBy._id);
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleAddWarrantyDuration = async () => {
		setWarrantyDuration(warrantyDurationInSeconds);
		setTokenId(productTokenId);

		try {
			console.log("ej");
			const res = await setDurationForTokenId({
				onSuccess: () =>
					handleSuccess("Transaction Successful!", "Tx Notification"),
				onError: (error) => handleError(error),
			});
			console.log(res);
		} catch (error) {
			console.log(error);
		}
	};

	const changeWarrantyPeriodOfNFT = async () => {
		setTokenId(productTokenId);
		try {
			const res2 = await changeWarrantyPeriod({
				onSuccess: () =>
					handleSuccess("Transaction Successful!", "Tx Notification"),
				onError: (error) => handleError(error),
			});
			console.log(res2);
		} catch (error) {}
	};

	const handleTransferOfWarranty = async () => {
		setUserAccountAddress(orderedBy.walletAddress);
		if (userAccountAddress === "") return;

		try {
			await transferWarrantyCard({
				onSuccess: () =>
					handleSuccess("Transaction Successful!", "Tx Notification"),
				onError: (error) => handleError(error),
			});
			return;
		} catch (error) {
			console.log(error);
		}
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
						{isUserAuthenticated && isSold && (
							<p className={classes.product_description}>
								TokenId for warranty is:{tokenId}
							</p>
						)}
						<div className={classes.price_container}>
							<img className={classes.price_symbol} src={rs_icon} alt="" />
							<span className={classes.price}>{price}</span>
						</div>
						{hasWarranty && !isSold && (
							<h4>
								Product available with warranty of{" "}
								{warrantyDurationInSeconds / (3600 * 365 * 24)} years
							</h4>
						)}
						<div className={classes.btn}>
							{isUserAuthenticated && !isSold && (
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
							{isWeb3Enabled &&
								isSellerAuthenticated &&
								!hasProductTokenId &&
								hasWarranty && (
									<CustomButton
										onClick={handleCreateWarrantyCard}
										label="Create Warranty Card NFT"
										padding="0.5em 7em"
										filled
									/>
								)}
							{isWeb3Enabled &&
								!isSold &&
								isSellerAuthenticated &&
								hasWarranty && (
									<CustomButton
										onClick={handleAddWarrantyDuration}
										label="Add Duration"
										padding="0.5em 7em"
										filled
									/>
								)}
							{isWeb3Enabled &&
								isSellerAuthenticated &&
								!isSold &&
								hasProductTokenId &&
								isReadyForSale &&
								hasWarranty && (
									<CustomButton
										onClick={changeWarrantyPeriodOfNFT}
										label={"Start Warranty"}
										padding="0.5em 7em"
										filled
									/>
								)}
							{isWeb3Enabled &&
								isSellerAuthenticated &&
								hasProductTokenId &&
								!isSold &&
								isReadyForSale &&
								hasWarranty && (
									<CustomButton
										onClick={handleTransferOfWarranty}
										label={"Transfer Warranty Card NFT"}
										padding="0.5em 7em"
										filled
									/>
								)}
							{hasWarranty ? (
								isSellerAuthenticated &&
								hasProductTokenId &&
								isReadyForSale &&
								!isSold && (
									<CustomButton
										onClick={() => handleDispatch(productId, tokenId)}
										label="DISPATCH"
										padding="0.5em 11em"
										filled
									/>
								)
							) : !isSold ? (
								<CustomButton
									onClick={() => handleDispatch(productId, tokenId)}
									label="DISPATCH"
									padding="0.5em 11em"
									filled
								/>
							) : null}

							{isWeb3Enabled &&
								!isSellerAuthenticated &&
								!isSold &&
								"This address will be used to store your warranty card"}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Product;
