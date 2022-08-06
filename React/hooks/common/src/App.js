import React from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = React.useState("");

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    inputRef && inputRef.current.focus();
  }, []);

  const handleOnChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
      <h1>Common hooks</h1>

      <p>useState, useRef, useEffect</p>

      <p>
        onload (useEffect), focus on Input (useRef), typing in input onChange
        (useState)
      </p>

      <label htmlFor="name">Name:</label>

      <input
        type="text"
        id="name"
        name="name"
        ref={inputRef}
        value={inputValue}
        onChange={handleOnChange}
      />

      {inputValue && <p>Input value: {inputValue}</p>}
    </div>
  );
}

export default App;
