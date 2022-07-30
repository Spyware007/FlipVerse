import React, { useContext, useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import classes from "./CategoryPage.module.css";
import { ProductCard } from "../UI";
// import trial1 from "../../Assets/trial3.png";
import { productContext } from "../../Contexts";

const CategoryPage = () => {
	const { getCategorizedProducts, categorizedProducts } =
		useContext(productContext);
	const { search } = useLocation();
	const values = queryString.parse(search);
	const { category } = values;

	getCategorizedProducts(category);
	console.log(category);
	useEffect(() => {
		console.log("Runksdkfj");
	}, []);

	console.log(categorizedProducts);
	return (
		<>
			<div className={classes.category_page}>
				<h1 className={classes.category_page_text}>{category}</h1>
				<div className={classes.category_page_products}>
					{categorizedProducts &&
						categorizedProducts.products.map((p, i) => {
							return (
								<ProductCard
									key={i}
									image={p.image}
									name={p.title}
									price={p.price}
									id={p._id}
								/>
							);
						})}
					{categorizedProducts.products.length === 0 && (
						<h1 className={classes.notfound}>No Products in this category</h1>
					)}
				</div>
			</div>
		</>
	);
};

export default CategoryPage;
