import React, { useContext, useEffect } from "react";
import classes from "./MyItems.module.css";
import { Card, ProductCard } from "../../UI";
import trial1 from "../../../Assets/trial1.png";
import { sellerAuthContext } from "../../../Contexts";

const MyItems = () => {
	const { getSellerProducts, products } = useContext(sellerAuthContext);

	useEffect(() => {
		getSellerProducts();
	}, []);

	return (
		<>
			<div>
				<h1 className={classes.text}>My Products</h1>
				<Card smooth width="980px" height="auto">
					<div className={classes.cards_container}>
						{products.map((p, i) => {
							// const product = p.data.sellerProducts;
							return (
								<ProductCard
									key={i}
									image={p.image}
									name={p.title}
									price={p.price}
								/>
							);
						})}
					</div>
				</Card>
				<h1 className={classes.text}>Products Ready for Sale</h1>
				<Card smooth width="980px" height="auto">
					<div className={classes.cards_container}>
						{products.map((p, i) => {
							// const product = p.data.sellerProducts;
							if (p.isReadyForSale) {
								return (
									<ProductCard
										key={i}
										image={p.image}
										name={p.title}
										price={p.price}
									/>
								);
							}
						})}
					</div>
				</Card>
			</div>
		</>
	);
};

export default MyItems;
