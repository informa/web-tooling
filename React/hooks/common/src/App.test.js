import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("App", () => {
  test("should render the title", () => {
    render(<App />);

    const title = screen.getByText("Common hooks");

    expect(title).toBeInTheDocument();
  });

  test("should render the checkbox, un-checked", () => {
    render(<App />);

    const checkbox = screen.getByLabelText("Show Input");

    expect(checkbox).not.toBeChecked();
  });

  test("should not render the input", () => {
    render(<App />);

    const input = screen.queryByText("Name:");

    expect(input).not.toBeInTheDocument();
  });

  describe("when show input is true", () => {
    test("should focus on input", async () => {
      render(<App />);

      const checkbox = screen.getByLabelText("Show Input");

      await userEvent.click(checkbox);

      const input = screen.getByLabelText("Name:");

      expect(input).toHaveFocus();
    });

    test("should update input value onChange", async () => {
      render(<App />);

      const checkbox = screen.getByLabelText("Show Input");

      await userEvent.click(checkbox);

      const input = screen.getByLabelText("Name:");

      const inputValue = "test";

      await userEvent.type(input, inputValue);

      expect(input.value).toBe(inputValue);

      expect(screen.getByText(/Input value:/i)).toHaveTextContent(inputValue);
    });
  });
});
