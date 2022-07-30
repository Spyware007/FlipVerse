import React, { useState, useEffect } from "react";
import VerifyHero from "./VerifyHero";
import { InputField, CustomButton, Card } from "../UI";
import classes from "./VerifyNft.module.css";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useNotification } from "@web3uikit/core";
import abi from "../../Constants/abi.json";

const VerifyNft = () => {
	const {
		enableWeb3,
		isWeb3Enabled,
		isWeb3EnableLoading,
		account,
		Moralis,
		deactivateWeb3,
	} = useMoralis();

	const contractAddress = "0x171F6Cd3aaa32a6f1cFDAa63fF0a2d056473C569";

	const [inputNum, setInputNum] = useState(null);
	const [ownerAddress, setOwnerAddress] = useState("");
	const [currentWalletAddress, setCurrentWalletAddress] = useState("");

	const connectWallet = async () => {
		await enableWeb3();
		localStorage.setItem("connected", "walletconnect");
	};

	useEffect(() => {
		if (!isWeb3Enabled && localStorage.getItem("connected")) {
			enableWeb3();
		}

		setCurrentWalletAddress(account);
	}, [isWeb3Enabled]);

	useEffect(() => {
		console.log(account);
		Moralis.onAccountChanged((account) => {
			if (account == null) {
				window.localStorage.removeItem("connected");
				deactivateWeb3();
			}
		});
	}, []);

	const dispatch = useNotification();

	const { runContractFunction: getOwnerOfToken } = useWeb3Contract({
		abi,
		contractAddress,
		functionName: "ownerOf",
		params: {
			tokenId: inputNum,
		},
	});

	const handleNotification = (message, title) => {
		dispatch({
			type: "info",
			message,
			title,
			position: "topR",
		});
	};

	const handleSuccess = async () => {
		handleNotification("Transaction Successful!", "Tx Notification");
	};

	const handleError = (error) => {
		console.log(error);
		setOwnerAddress("");
		handleNotification(
			"Transaction UnSuccessful! Make sure you are connected to the right account",
			"Tx Notification",
		);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setCurrentWalletAddress(account.toLowerCase());
		try {
			const res = await getOwnerOfToken({
				onSuccess: handleSuccess,
				onError: (error) => handleError(error),
			});
			setOwnerAddress(res.toString().toLowerCase());
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className={classes.verify_nft_section}>
				<div className={classes.hero_section}>
					<VerifyHero />
				</div>
				<div className={classes.form_section}>
					<h2 className={classes.verify_text}>
						Check Your Product's <br />
						<span className={classes.verify_text_span}>Warranty</span>
					</h2>

					<Card width="450px" height="200px" padding="40px">
						<form className={classes.form} onSubmit={handleSubmit}>
							<div className={classes.inputs}>
								<InputField
									// reference={nameRef}
									type="number"
									// value={name}
									onChange={(e) => setInputNum(e.target.value)}
									label="Unique ID Number"
									name="nftID"
									placeholder="Unique ID Number"
									required
								/>
							</div>

							<div className={classes.btn}>
								<CustomButton label="Verify" filled />
							</div>
						</form>
					</Card>
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
					{isWeb3Enabled && ownerAddress && (
						<h3 className={classes.verify_text}>
							Account is owned by {ownerAddress}
						</h3>
					)}
					{ownerAddress === (currentWalletAddress || "") && (
						<h4 className={classes.verify_text}>
							You are the owner of this Card!
						</h4>
					)}
				</div>
			</div>
		</>
	);
};

export default VerifyNft;
