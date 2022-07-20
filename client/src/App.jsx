import React, { useState } from "react";

import { Loading } from "./Components/UI";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => setLoading(false), 6000);
  return (
    <>
      <div className="App">{loading ? <Loading /> : <></>}</div>
    </>
  );
};

export default App;
