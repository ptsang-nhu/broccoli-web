import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Page from "../page";

describe("Page", () => {
  it("renders a heading and a button", () => {
    render(<Page />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe("A better way to enjoy everyday.");

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe("Request an invite");
  });
});
