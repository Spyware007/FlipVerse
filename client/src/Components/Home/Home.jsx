import React, { useRef } from "react";
import { Button, ProductCard, SplineModel } from "../UI";
import classes from "./Home.module.css";
import trial1 from "../../Assets/trial1.png";
import trial2 from "../../Assets/trial2.png";
import trial3 from "../../Assets/trial3.png";
import trial4 from "../../Assets/trial4.png";
import trial5 from "../../Assets/trial5.png";

const Home = () => {
  const exploreRef = useRef(null);
  const scrollDown = () => {
    exploreRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className={classes.home_page}>
        <div className={classes.landing_slide}>
          <div className={classes.landing}>
            <h1 className={classes.landing_text}>
              Giving the best <br /> e-commerce <br /> experience
            </h1>
            <div className={classes.btn}>
              <Button
                onClick={scrollDown}
                label="Explore"
                filled
                href="explore"
              />
              <Button
                // onClick={handleClick}
                label="Become a Seller"
                // filled
              />
            </div>
          </div>
          <div className={classes.model}>
            <SplineModel />
          </div>
        </div>

        <div ref={exploreRef} className={classes.featured_section}>
          <h1 className={classes.featured_text}>Featured Products</h1>
          <div className={classes.featured_products}>
            <div className={classes.translated1}>
              <ProductCard image={trial1} />
            </div>
            <div className={classes.translated}>
              <ProductCard image={trial2} />
            </div>
            <ProductCard image={trial3} />
            <div className={classes.translated}>
              <ProductCard image={trial4} />
            </div>
            <div className={classes.translated5}>
              <ProductCard image={trial5} />
            </div>
          </div>
        </div>
        <div className={classes.our_products_section}>
          <h1 className={classes.our_products_text}>Our Products</h1>
          <div className={classes.our_product1}>
            <h1 className={classes.our_product_text}>Sneakers</h1>
            <Button label="Explore" filled />
          </div>
          <div className={classes.our_product2}>
            <h1 className={classes.our_product_text}>Hoddies</h1>
            <Button label="Explore" filled />
          </div>
          <div className={classes.our_product3}>
            <h1 className={classes.our_product_text}>BagPacks</h1>
            <Button label="Explore" filled />
          </div>
          <div className={classes.our_product4}>
            <h1 className={classes.our_product_text}>T-shirts</h1>
            <Button label="Explore" filled />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
