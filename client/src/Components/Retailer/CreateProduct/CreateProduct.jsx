import React, { useState } from "react";
import { Button, Card, ProductCard, InputField } from "../../UI";
import classes from "./CreateProduct.module.css";

const CreateProduct = () => {
  const [img, setImg] = useState();
  const [product, setProduct] = useState({
    product_name: "",
    brand: "",
    category: "",
    warranty: "",
    price: "",
    description: "",
  });

  const { product_name, brand, category, warranty, price, description } =
    product;
  const onChangeHandler = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  return (
    <>
      <div className={classes.create_product_section}>
        <Card width="900px" height="750px">
          <div className={classes.outer}>
            <div className={classes.inner}>
              <div>
                <ProductCard image={img} name={product_name} price={price} />
                <input
                  className={classes.custom_file_input}
                  type="file"
                  onChange={onImageChange}
                />
              </div>
              <div className={classes.inputs}>
                <InputField
                  onChange={onChangeHandler}
                  // reference={nameRef}
                  type="name"
                  value={product_name}
                  label="Product Name"
                  name="product_name"
                  placeholder="Product Name"
                  required
                />
                <InputField
                  onChange={onChangeHandler}
                  // reference={nameRef}
                  type="name"
                  value={brand}
                  label="Brand"
                  name="brand"
                  placeholder="Brand"
                  required
                />
                <InputField
                  onChange={onChangeHandler}
                  // reference={nameRef}
                  type="name"
                  value={category}
                  label="Category"
                  name="category"
                  placeholder="Category"
                  required
                />
                <InputField
                  onChange={onChangeHandler}
                  // reference={nameRef}
                  type="number"
                  value={price}
                  label="Price"
                  name="price"
                  placeholder="Price"
                  required
                />
                <InputField
                  onChange={onChangeHandler}
                  // reference={nameRef}
                  type="date"
                  value={warranty}
                  label="Warranty Period"
                  name="warranty"
                  placeholder="Warranty Period"
                  required
                />
              </div>
            </div>
            <div>
              <InputField
                onChange={onChangeHandler}
                type="name"
                value={description}
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
