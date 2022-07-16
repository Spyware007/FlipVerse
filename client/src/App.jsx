import React from "react";
import { Button, InputField } from "./Components/UI";
import "./App.css";

const App = () => {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          // onClick={handleClick}
          label="Submit"
          // filled
        />
        <div style={{ margin: "100px" }}></div>
        <InputField
          type="text"
          // value={name}
          placeholder="Product Name"
          label="Name"
          name="name"
          // onChange={handleChange}
        />
      </div>
    </>
  );
};

export default App;
