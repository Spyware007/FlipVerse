import React, { useContext, useEffect } from "react";
import classes from "./MyItems.module.css";
import { Card, ProductCard } from "../../UI";
import trial1 from "../../../Assets/trial1.png";
import { sellerAuthContext } from "../../../Contexts";

const MyItems = () => {
  const { getSellerProducts } = useContext(sellerAuthContext);
  useEffect(() => {
    getSellerProducts();
  }, []);

  return (
    <>
      <div>
        <h1 className={classes.text}>Purchased Items</h1>
        <Card smooth width="980px" height="auto">
          <div className={classes.cards_container}>
            {/* {products.map((p, i) => {
              const product = p.product;
              return (
                <ProductCard
                  image={""}
                  name={product.title}
                  price={product.price}
                />
              );
            })} */}
          </div>
        </Card>
      </div>
    </>
  );
};

export default MyItems;
