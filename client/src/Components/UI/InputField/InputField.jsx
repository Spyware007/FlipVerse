import React from "react";
import classes from "./InputField.module.css";

const InputField = ({ value, label, name, placeholder, type, onChange }) => {
  return (
    <>
      <div className={`${classes.form__group} ${classes.field}`}>
        <input
          type={type}
          value={value}
          name={name}
          className={classes.form__field}
          placeholder={placeholder}
          onChange={onChange}
        />
        {label && (
          <label className={classes.form__label} for={`${name}`}>
            {label}
          </label>
        )}
      </div>
    </>
  );
};

export default InputField;
