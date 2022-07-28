import React, { useContext } from "react";
import classes from "./Footer.module.css";
import { NavLink } from "react-router-dom";
import spider from "../../Assets/spider.png";
import nishant from "../../Assets/nishant.png";
import saurabh from "../../Assets/saurabh.png";
import { Logo } from "../UI";
import {
  omLink,
  nishantLink,
  saurabhLink,
} from "../../Constants/social.contact";
import { sellerAuthContext, userAuthContext } from "../../Contexts";

const Footer = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { isSellerAuthenticated } = useContext(sellerAuthContext);
  const { isUserAuthenticated } = useContext(userAuthContext);

  const authenticated = isSellerAuthenticated || isUserAuthenticated;

  return (
    <>
      <div className={classes.footer_section}>
        <div className={classes.footer_top}>
          <div className={classes.footer_column_logo}>
            {/* <img src={""} alt="logo" className={classes.footer_logo} /> */}
            <Logo />
            <h4 className={classes.text}>FlipVerse</h4>
            <h4 className={classes.text}>Shopping is fun!</h4>
          </div>
          <div className={classes.footer_column}>
            <h2 className={classes.content_top}>Links</h2>

            <NavLink to="/" className={classes.links}>
              Home
            </NavLink>
            <NavLink to="/explore" className={classes.links}>
              Explore
            </NavLink>
            <NavLink to="/verifynft" className={classes.links}>
              Verify NFT
            </NavLink>
            {authenticated && (
              <>
                <NavLink to="/cart" className={classes.links}>
                  Cart
                </NavLink>
                <NavLink
                  to={
                    isSellerAuthenticated
                      ? "/retailer/dashboard"
                      : "/user/dashboard"
                  }
                  className={classes.links}
                >
                  Profile
                </NavLink>
              </>
            )}
            {!authenticated && (
              <>
                <NavLink to="/login" className={classes.links}>
                  Login
                </NavLink>
                <NavLink to="/signup" className={classes.links}>
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
          <div className={classes.footer_column}>
            <h2 className={classes.content_top}>Categories</h2>

            <NavLink to="/" className={classes.links}>
              Sneakers
            </NavLink>
            <NavLink to="/" className={classes.links}>
              Tshirts
            </NavLink>
            <NavLink to="/" className={classes.links}>
              Hoddies
            </NavLink>
            <NavLink to="/" className={classes.links}>
              Bags
            </NavLink>
          </div>

          <div className={classes.footer_column}>
            <h2 className={classes.content_top}>Creators</h2>

            <div className={classes.link_container}>
              <img
                src={spider}
                alt="Om Gawande"
                className={classes.creators_image}
              />
              <a
                href={omLink}
                target="__blank"
                rel="noopener noreferrer"
                className={classes.links_special}
              >
                Om Gawande
              </a>
            </div>
            <div className={classes.link_container}>
              <img
                src={nishant}
                alt="Nishant Bhosale"
                className={classes.creators_image}
              />
              <a
                href={nishantLink}
                target="__blank"
                rel="noopener noreferrer"
                className={classes.links_special}
              >
                Nishant Bhosale
              </a>
            </div>
            <div className={classes.link_container}>
              <img
                src={saurabh}
                alt="Saurabh Barde"
                className={classes.creators_image}
              />
              <a
                href={saurabhLink}
                target="__blank"
                rel="noopener noreferrer"
                className={classes.links_special}
              >
                Saurabh Barde
              </a>
            </div>
          </div>
        </div>
        <div className={classes.footer_bottom}>
          <h3 className={classes.copyright}>
            <span className={classes.copyright_symbol}> © </span> 2022 by
            FLIP-VERSE, Inc
          </h3>
        </div>
      </div>
    </>
  );
};

export default Footer;
