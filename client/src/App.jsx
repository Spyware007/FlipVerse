import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { SellerState, UserState } from "./Contexts";
import { SellerPrivateRoute, UserPrivateRoute } from "./PrivateRoutes";
import { Loading } from "./Components/UI";
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
} from "./Components";

import "./App.css";

const App = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // console.log(location);
    // fetch("/api/products")
    //   .then((data) => {
    //     // console.log(data);
    //     return data.json();
    //   })
    //   .then((d) => console.log(d));
  }, [location]);
  const [loading, setLoading] = useState(true);

  setTimeout(() => setLoading(false), 1800);
  return (
    <>
      <SellerState>
        <UserState>
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
                  <Route
                    path="/category/:id"
                    element={<CategoryPage />}
                  ></Route>
                  <Route
                    path="/product/:productId"
                    element={<Product />}
                  ></Route>
                  <Route path="/cart/:userId" element={<Cart />}></Route>
                  <Route path="*" element={<NotFound />}></Route>
                  {/* <Route path="*" element={<Navigate to="/" />} /> */}
                </Routes>
                <Footer />
              </>
            )}
          </div>
        </UserState>
      </SellerState>
    </>
  );
};

export default App;
