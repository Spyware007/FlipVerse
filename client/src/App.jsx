import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { SellerPrivateRoute, UserPrivateRoute } from "./PrivateRoutes";

import { Loading } from "./Components/UI";
import { setAuthSellerToken, setAuthUserToken } from "./utils/setAuthToken";
import sellerAuthContext from "./Contexts/SellerAuthContext/sellerAuthContext";
import userAuthContext from "./Contexts/UserAuthContext/userAuthContext";

import {
  Home,
  Login,
  Product,
  Signup,
  VerifyNft,
  User,
  Retailer,
  Navbar,
  Footer,
  NotFound,
  Cart,
  CategoryPage,
  Explore,
} from "./Components";

import "./App.css";
// import Explore from "./Components/Explore/Explore";

if (localStorage.sellerToken) {
  setAuthSellerToken(localStorage.sellerToken);
}
if (localStorage.userToken) {
  setAuthUserToken(localStorage.userToken);
}

const App = () => {
  const location = useLocation();
  const { loadSellerIfTokenFound } = useContext(sellerAuthContext);
  const { loadUserIfTokenFound } = useContext(userAuthContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    loadSellerIfTokenFound();
    loadUserIfTokenFound();
  }, [location]);

  const [loading, setLoading] = useState(true);

  setTimeout(() => setLoading(false), 1800);

  return (
    <>
      <div className="App">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />}></Route>
              <Route path="/verifynft" element={<VerifyNft />}></Route>
              <Route
                path="/retailer/dashboard"
                element={
                  <SellerPrivateRoute>
                    <Retailer />
                  </SellerPrivateRoute>
                }
              ></Route>
              <Route
                path="/user/dashboard"
                element={
                  <UserPrivateRoute>
                    <User />
                  </UserPrivateRoute>
                }
              ></Route>
              <Route path="/category" element={<CategoryPage />}></Route>
              <Route path="/product/:productId" element={<Product />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/explore" element={<Explore />}></Route>
              <Route path="*" element={<NotFound />}></Route>
              {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default App;
