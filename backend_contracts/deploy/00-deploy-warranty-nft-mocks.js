const { developmentChains } = require("../helper-hardhat-config.js");
const { network } = require("hardhat");

module.exports = async function ({ getNamedAccounts, deployments }) {
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();
	const chainId = network.config.chainId;

	if (developmentChains.includes(network.name)) {
		log("Local network detected! Deploying mocks...");
		// Deploy a mock
		await deploy("ERC721Mock", {
			from: deployer,
			log: true,
			args: ["Testing Warranty Mock", "TWM"],
		});
		log("Mocks deployed");
	}
};

module.exports.tag = ["all", "mocks"];
