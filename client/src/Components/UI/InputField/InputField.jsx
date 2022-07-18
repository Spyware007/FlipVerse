import React from "react";
import classes from "./InputField.module.css";

const InputField = ({
  value,
  label,
  reference,
  name,
  placeholder,
  type,
  required,
}) => {
  return (
    <>
      <div className={`${classes.form__group} ${classes.field}`}>
        <input
          ref={reference}
          type={type}
          value={value}
          name={name}
          className={classes.form__field}
          placeholder={placeholder}
          required={required}
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
