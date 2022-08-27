import React, { useContext, createContext, useState } from "react";
import "./App.css";

export const themes = {
  light: {
    name: "light",
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    name: "dark",
    foreground: "#ffffff",
    background: "#222222",
  },
};

// Create new context which holds themes.light by default
export const ThemeContext = createContext(themes.light);

function App() {
  // Set ThemeContext via state
  const [theme, setTheme] = useState("light");

  return (
    <>
      <h1>React context</h1>

      <h2>Theme context example</h2>

      <ThemeContext.Provider value={themes.dark}>
        <Button>button</Button>
      </ThemeContext.Provider>

      <ThemeContext.Provider value={themes.light}>
        <Button>button</Button>
      </ThemeContext.Provider>

      <h2>Passing the context to nested components.</h2>

      <fieldset>
        <legend>Select a theme:</legend>
        <div>
          <input
            type="radio"
            id="light"
            name="theme"
            value="light"
            checked={theme === "light"}
            onChange={({ target }) => setTheme(target.value)}
          />
          <label for="light">Light</label>
        </div>
        <div>
          <input
            type="radio"
            id="dark"
            name="theme"
            value="dark"
            checked={theme === "dark"}
            onChange={({ target }) => setTheme(target.value)}
          />
          <label for="dark">Dark</label>
        </div>
      </fieldset>

      <ThemeContext.Provider value={themes[theme]}>
        <Page>
          <PageTitle>Using theme</PageTitle>
          <Button>button</Button>
        </Page>
      </ThemeContext.Provider>
    </>
  );
}

function Button({ children }) {
  // Using context in components that are nested children

  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      {children}
    </button>
  );
}

function PageTitle({ children }) {
  // Using context in components that are nested children

  const theme = useContext(ThemeContext);

  return (
    <h3>
      {children} :{theme.name}
    </h3>
  );
}

function Page({ children }) {
  const theme = useContext(ThemeContext);

  // Conditional code based on context
  const backgroundMap = {
    light: { backgroundColor: "#111111", color: "#eeeeee" },
    dark: { backgroundColor: "#eeeeee", color: "#111111" },
  };

  return (
    <div
      style={{
        padding: "100px",
        backgroundColor: backgroundMap[theme.name].backgroundColor,
        color: backgroundMap[theme.name].color,
      }}
    >
      {children}
    </div>
  );
}

export default App;
