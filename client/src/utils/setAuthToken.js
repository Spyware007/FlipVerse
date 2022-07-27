import axios from "axios";

const setAuthSellerToken = (token) => {
	if (token) {
		axios.defaults.headers.common["x-auth-seller-token"] = token;
	} else {
		delete axios.defaults.headers.common["x-auth-seller-token"];
	}
};
const setAuthUserToken = (token) => {
	if (token) {
		axios.defaults.headers.common["x-auth-user-token"] = token;
	} else {
		delete axios.defaults.headers.common["x-auth-user-token"];
	}
};
export { setAuthSellerToken, setAuthUserToken };
