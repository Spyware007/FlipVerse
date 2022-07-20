import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loading } from "./Components/UI";
import {
  Home,
  Login,
  Product,
  Signup,
  VerifyNft,
  User,
  Retailer,
} from "./Components";

import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => setLoading(false), 1800);
  return (
    <>
      <div className="App">
        {loading ? (
          <Loading />
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />}></Route>
              <Route path="/verifynft" element={<VerifyNft />}></Route>
              <Route path="/product/:productId" element={<Product />}></Route>
              <Route path="/user/:userId" element={<User />}></Route>
              <Route
                path="/retailer/:retailerId"
                element={<Retailer />}
              ></Route>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        )}
      </div>
      <Product />
    </>
  );
};

export default App;
