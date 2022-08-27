import { render, screen } from "@testing-library/react";
import { ThemeContext, themes } from "./App";

const ContextObserver = () => (
  <ThemeContext.Consumer>
    {(value) => {
      return <span>Received: {value.name}</span>;
    }}
  </ThemeContext.Consumer>
);

test("Theme shows value from provider", () => {
  render(
    <ThemeContext.Provider value={themes.light}>
      <ContextObserver />
    </ThemeContext.Provider>
  );
  expect(screen.getByText(/^Received:/)).toHaveTextContent("light");
});
