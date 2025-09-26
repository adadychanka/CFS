import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Button from "./Button";

describe("<Button />", () => {
  test("renders a button with text", () => {
    render(<Button />);

    const button = screen.getByRole("button", { name: "Click me" });
    expect(button).toBeInTheDocument();
  });
});
