import React from "react";
import classes from "./CategoryPage.module.css";
import { ProductCard } from "../UI";
import trial1 from "../../Assets/trial3.png";

const CategoryPage = () => {
  return (
    <>
      <div className={classes.category_page}>
        <h1 className={classes.category_page_text}>Hoddies</h1>
        <div className={classes.category_page_products}>
          <ProductCard image={trial1} />
          <ProductCard image={trial1} />
          <ProductCard image={trial1} />
          <ProductCard image={trial1} />
          <ProductCard image={trial1} />
          <ProductCard image={trial1} />
          <ProductCard image={trial1} />
          <ProductCard image={trial1} />
          <ProductCard image={trial1} />
          <ProductCard image={trial1} />
          <ProductCard image={trial1} />
          <ProductCard image={trial1} />
          <ProductCard image={trial1} />
          <ProductCard image={trial1} />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
