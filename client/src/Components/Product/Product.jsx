import React, { useEffect, useContext } from "react";
import { Button, ProductCard, SingleProductCard } from "../UI";
import { useParams, useNavigate } from "react-router-dom";
import classes from "./Product.module.css";
import rs_icon from "../../Assets/rs_icon.png";
import {
	productContext,
	sellerAuthContext,
	userAuthContext,
} from "../../Contexts";

const Product = () => {
	const redirect = useNavigate();
	const { getSingleProduct, product } = useContext(productContext);
	const { isSellerAuthenticated } = useContext(sellerAuthContext);
	const { isUserAuthenticated } = useContext(userAuthContext);
	const { productId } = useParams();

	useEffect(() => {
		getSingleProduct(productId);
	}, [productId]);

	const {
		title,
		brand,
		description,
		price,
		isReadyForSale,
		image,
		hasWarranty,
		warrantyDurationInSeconds,
	} = product;
	const handleClick = () => {};
	const unauthorized = () => {
		redirect("/");
	};
	const authorizedPerson = isSellerAuthenticated || isUserAuthenticated;

	return (
		<>
			<div className={classes.product_page}>
				<div className={classes.product}>
					<div>
						<SingleProductCard image={image} />
					</div>
					<div className={classes.product_content}>
						<h1 className={classes.product_name}>{title}</h1>
						<p className={classes.product_description}>{description}</p>
						<div className={classes.price_container}>
							<img className={classes.price_symbol} src={rs_icon} alt="" />
							<span className={classes.price}>{price}</span>
						</div>
						{hasWarranty && (
							<h4>
								Product available with warranty of{" "}
								{warrantyDurationInSeconds / (3600 * 365 * 24)} years
							</h4>
						)}
						<div className={classes.btn}>
							{isSellerAuthenticated && isReadyForSale && (
								<Button
									// onClick={handleClick}
									label="DISPATCH"
									padding="0.5em 11em"
									filled
								/>
							)}
							{isUserAuthenticated && (
								<Button
									onClick={handleClick}
									label="BUY"
									padding="0.5em 11em"
									filled
								/>
							)}
							{!authorizedPerson && (
								<Button
									onClick={unauthorized}
									label="LOGIN"
									padding="0.5em 11em"
									filled
								/>
							)}
							{/* <Button
                // onClick={handleClick}
                // label="Add to Cart"
                padding="0.5em 8em"
                // filled
              >
                Add to Cart
                <CartIcon />
              </Button> */}
						</div>
					</div>
				</div>
				<div className={classes.similar_container}>
					<h1 className={classes.similar_text}>Similar Products</h1>
					<div className={classes.similar_products}>
						<ProductCard image={""} />
						<ProductCard image={""} />
						<ProductCard image={""} />
						<ProductCard image={""} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Product;
