import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./CategoryPage.module.css";
import { ProductCard } from "../UI";

const CategoryPage = () => {
	const [categoryProducts, setCategoryProducts] = useState([]);

	// const { search } = useLocation();
	// const values = queryString.parse(search);
	// const { category } = values;

	const params = new URLSearchParams(window.location.search);
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	useEffect(() => {
		axios
			.post(
				"/api/products/category",
				{ category: params.get("category") },
				config,
			)
			.then((res) => {
				setCategoryProducts(res.data.products);
			});
	}, [params]);

	return (
		<>
			<div className={classes.category_page}>
				<h1 className={classes.category_page_text}>{params.get("category")}</h1>
				<div className={classes.category_page_products}>
					{categoryProducts &&
						categoryProducts.map((p, i) => {
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
					{categoryProducts.length === 0 && (
						<h1 className={classes.notfound}>No Products in this category</h1>
					)}
				</div>
			</div>
		</>
	);
};

export default CategoryPage;
