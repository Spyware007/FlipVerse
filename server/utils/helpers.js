const verifyId = (id) => {
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
		return true;
	}
	return false;
};

const findProductInProductsArray = (products, pId) => {
	products.find((id) => {
		if (id !== null) {
			return id.toString() === pId;
		}
	});

	return -1;
};

export { verifyId, findProductInProductsArray };
