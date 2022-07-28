import React, { useContext, useEffect } from "react";
import classes from "./MyItems.module.css";
import { Card, ProductCard } from "../../UI";
import trial1 from "../../../Assets/trial1.png";
import { sellerAuthContext } from "../../../Contexts";

const MyItems = () => {
  const { getSellerProducts, products } = useContext(sellerAuthContext);

  useEffect(() => {
    getSellerProducts();
  }, []);
  console.log(products);
  return (
    <>
      <div>
        <h1 className={classes.text}>Purchased Items</h1>
        <Card smooth width="980px" height="auto">
          <div className={classes.cards_container}>
            {products.map((p, i) => {
              // const product = p.data.sellerProducts;
              return (
                <ProductCard
                  key={i}
                  image={""}
                  name={p.title}
                  price={p.price}
                />
              );
            })}
          </div>
        </Card>
      </div>
    </>
  );
};

export default MyItems;
