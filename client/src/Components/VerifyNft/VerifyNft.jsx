import React from "react";
import VerifyHero from "./VerifyHero";
import { InputField, Button, Card } from "../UI";
import classes from "./VerifyNft.module.css";

const VerifyNft = () => {
  return (
    <>
      <div className={classes.verify_nft_section}>
        <div className={classes.hero_section}>
          <VerifyHero />
        </div>
        <div className={classes.form_section}>
          <h2 className={classes.verify_text}>
            Check Your Product's <br />
            <span className={classes.verify_text_span}>Warranty</span>
          </h2>

          <Card width="450px" height="200px" padding="40px">
            <form className={classes.form}>
              <div className={classes.inputs}>
                <InputField
                  // reference={nameRef}
                  type="name"
                  // value={name}
                  label="Unique ID Number"
                  name="nftID"
                  placeholder="Unique ID Number"
                  required
                />
              </div>
              <div className={classes.btn}>
                <Button
                  // onClick={handleClick}
                  label="Verify"
                  filled
                />
              </div>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default VerifyNft;
