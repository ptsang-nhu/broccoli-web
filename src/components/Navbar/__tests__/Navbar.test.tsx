import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Navbar from "../Navbar";

test("Navbar should be rendered", () => {
  render(<Navbar />);
  const logoText = screen.getByText("BROCOLI & CO.");

  expect(logoText).toBeInTheDocument();
});
