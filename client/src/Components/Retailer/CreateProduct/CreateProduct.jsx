import React, { useState, useContext } from "react";
import { Button, Card, ProductCard, InputField } from "../../UI";
import classes from "./CreateProduct.module.css";
import { sellerAuthContext } from "../../../Contexts";

const CreateProduct = () => {
	const { addProduct } = useContext(sellerAuthContext);
	// console.log(products.product);

	const [img, setImg] = useState();
	const [product, setProduct] = useState({
		title: "",
		brand: "",
		category: "",
		price: "",
		description: "",
	});

	const { title, brand, category, price, description } = product;

	const onChangeHandler = (e) => {
		setProduct({
			...product,
			[e.target.name]: e.target.value,
		});
	};
	const onImageChange = (e) => {
		setImg(e.target.files);
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		// console.log(seller);
		if (
			title === "" ||
			brand === "" ||
			category === "" ||
			price === "" ||
			description === ""
		) {
			// AlertContext.setAlert("Please enter all fields", "danger"); add a state
			alert("please fill all filed");
		} else {
			const dataArray = new FormData();
			dataArray.append(title);
			dataArray.append(brand);
			dataArray.append(category);
			dataArray.append(price);
			dataArray.append(description);
			dataArray.append(title);
			dataArray.append(img);
			console.log(dataArray);
			try {
				// product = [...product, img];
				await addProduct(dataArray);
				// await addImageToProduct(img, seller, products.product._id);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<>
			<div className={classes.create_product_section}>
				<Card width="900px" height="750px">
					<form className={classes.outer} onSubmit={submitHandler}>
						<div className={classes.inner}>
							<div>
								<ProductCard image={img} name={title} price={price} />
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
									value={title}
									label="Product Name"
									name="title"
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
								{/* <InputField
                  onChange={onChangeHandler}
                  // reference={nameRef}
                  type="date"
                  value={warranty}
                  label="Warranty Period"
                  name="warranty"
                  placeholder="Warranty Period"
                  required
                /> */}
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
					</form>
				</Card>
			</div>
		</>
	);
};

export default CreateProduct;
