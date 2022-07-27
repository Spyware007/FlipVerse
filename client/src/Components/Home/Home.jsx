import React, { useRef } from "react";
import { Button, ProductCard, LandingHero } from "../UI";
import classes from "./Home.module.css";
import {
  shoe1,
  shoe2,
  tshirt1,
  tshirt2,
  bag1,
  bag2,
  hoodie1,
  hoodie2,
} from "../../Assets/Home";
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
            {/* <SplineModel /> */}
            <LandingHero />
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
            <div className={classes.product_small_images}>
              <img
                src={shoe1}
                className={classes.product_small_image1}
                alt=""
              />
              <img
                src={shoe2}
                className={classes.product_small_image2}
                alt=""
              />
            </div>
            <div className={classes.content}>
              <h1 className={classes.our_product_text}>Sneakers</h1>
              <Button label="Explore" filled padding="15px 40px" />
            </div>
          </div>
          <div className={classes.our_product2}>
            <div>
              <div className={classes.content}>
                <h1 className={classes.our_product_text}>Hoddies</h1>
                <Button label="Explore" filled padding="15px 40px" />
              </div>
            </div>
            <div className={classes.product_small_images}>
              <img
                src={hoodie1}
                className={classes.product_small_image1}
                alt=""
              />

              <img
                src={hoodie2}
                className={classes.product_small_image2}
                alt=""
              />
            </div>
          </div>

          <div className={classes.our_product3}>
            <div className={classes.product_small_images}>
              <img src={bag1} className={classes.product_small_image1} alt="" />
              <img src={bag2} className={classes.product_small_image2} alt="" />
            </div>
            <div className={classes.content}>
              <h1 className={classes.our_product_text}>Bagpacks</h1>
              <Button label="Explore" filled padding="15px 40px" />
            </div>
          </div>
          <div className={classes.our_product4}>
            <div>
              <div className={classes.content}>
                <h1 className={classes.our_product_text}>T-shirts</h1>
                <Button label="Explore" filled padding="15px 40px" />
              </div>
            </div>
            <div className={classes.product_small_images}>
              <img
                src={tshirt1}
                className={classes.product_small_image1}
                alt=""
              />
              <img
                src={tshirt2}
                className={classes.product_small_image2}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
