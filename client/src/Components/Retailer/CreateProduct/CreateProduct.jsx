import React from "react";
import { Button, Card, ProductCard, InputField } from "../../UI";
import trial1 from "../../../Assets/trial1.png";
import classes from "./CreateProduct.module.css";

const CreateProduct = () => {
  return (
    <>
      <div>
        <Card width="900px" height="650px">
          <div className={classes.outer}>
            <div className={classes.inner}>
              <ProductCard image={trial1} />
              <div className={classes.inputs}>
                <InputField
                  // reference={nameRef}
                  type="name"
                  // value={name}
                  label="Product Name"
                  name="name"
                  placeholder="Product Name"
                  required
                />
                <InputField
                  // reference={nameRef}
                  type="name"
                  // value={name}
                  label="Brand"
                  name="brand"
                  placeholder="Brand"
                  required
                />
                <InputField
                  // reference={nameRef}
                  type="name"
                  // value={name}
                  label="Category"
                  name="category"
                  placeholder="Category"
                  required
                />
                <InputField
                  // reference={nameRef}
                  type="number"
                  // value={name}
                  label="Price"
                  name="price"
                  placeholder="Price"
                  required
                />
                <InputField
                  // reference={nameRef}
                  type="date"
                  // value={name}
                  label="Warranty Period"
                  name="warranty"
                  placeholder="Warranty Period"
                  required
                />
              </div>
            </div>
            <div>
              <InputField
                type="name"
                // value={name}
                label="Description"
                name="description"
                placeholder="Description"
                required
              />
            </div>
            <div>
              <Button filled label="Create" />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default CreateProduct;
