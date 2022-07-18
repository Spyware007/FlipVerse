import React from "react";
import { Button, InputField } from "./Components/UI";
import "./App.css";
import Login from "./Components/Login/Login";

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
          label="Submited"
          // filled
        />
        <div style={{ margin: "100px" }}></div>
        <InputField
          // reference={nameRef}
          type="text"
          // value={name}
          placeholder="Name"
          label="Name"
          name="name"
        />
      </div>
      <Login />
    </>
  );
};

export default App;
