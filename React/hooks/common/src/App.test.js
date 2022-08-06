import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("should render the title", () => {
    render(<App />);

    const title = screen.getByText("Common hooks");

    expect(title).toBeInTheDocument();
  });

  test("should focus on input", () => {
    render(<App />);

    const input = screen.getByLabelText("Name:");

    expect(input).toHaveFocus();
  });

  test("should update input value onChange", async () => {
    render(<App />);

    const input = screen.getByLabelText("Name:");

    const inputValue = "test";

    fireEvent.change(input, { target: { value: inputValue } });

    await waitFor(() => screen.getByText(/Input value:/i));

    expect(input.value).toBe(inputValue);

    expect(screen.getByText(/Input value:/i)).toHaveTextContent(inputValue);
  });
});
