import React from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [showInput, setShowInput] = React.useState(false);

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (showInput) {
      inputRef.current.focus();
    }
  }, [showInput]); // UseEffect to run on mount and when this state changes

  const handleOnChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleOnCheckbox = () => {
    setShowInput(!showInput);
  };

  return (
    <div className="App">
      <h1>Common hooks</h1>

      <p>useState, useRef, useEffect</p>

      <p>
        onload (useEffect), focus on Input (useRef), typing in input onChange
        (useState)
      </p>

      <div>
        <label htmlFor="checkbox">Show Input</label>
        <input
          type="checkbox"
          id="checkbox"
          name="checkbox"
          checked={showInput}
          onChange={handleOnCheckbox}
        />
      </div>

      {showInput && (
        <>
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
        </>
      )}
    </div>
  );
}

export default App;
