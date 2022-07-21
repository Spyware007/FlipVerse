const verifyId = (id) => {
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
		return true;
	}
	return false;
};

const findProductInProductsArray = (products, pId) => {
	products.find((id) => {
		return id.toString() === pId;
	});

	return -1;
};

const getIndexOfProduct = (products, pId) => {
	let index = products.indexOf(pId);
	return index;
};

export { verifyId, findProductInProductsArray, getIndexOfProduct };
