import React from "react";
import classes from "./PurchasedItems.module.css";
import { Card, ProductCard } from "../../UI";
import trial1 from "../../../Assets/trial1.png";

const PurchasedItems = () => {
  return (
    <>
      <div className={classes.purchased_products}>
        <h1 className={classes.text}>Purchased Items</h1>
        <Card smooth width="auto" height="auto">
          <div className={classes.cards_container}>
            <ProductCard image={trial1} />
            <ProductCard image={trial1} />
            <ProductCard image={trial1} />
            <ProductCard image={trial1} />
          </div>
        </Card>
      </div>
    </>
  );
};

export default PurchasedItems;
