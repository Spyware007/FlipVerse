import React from "react";
import classes from "./Button.module.css";

const Button = ({
	children,
	onClick,
	label,
	disabled,
	filled,
	padding = "0.5em 1.5em",
}) => {
	return (
		<>
			<button
				style={{ padding: padding }}
				className={filled ? classes.fill : classes.btn}
				onClick={onClick}
				disabled={disabled}
			>
				{label || children}
			</button>
		</>
	);
};

export default Button;
