import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import Footer from "../Footer";

test("Footer should be rendered", () => {
  render(<Footer />);
  const footerFirstLine = screen.getByText("Made with ❤️ in Melbourne");
  const footerSecondLine = screen.getByText(
    "® 2016 Broccoli & Co. All rights reserved.",
  );

  expect(footerFirstLine).toBeInTheDocument();
  expect(footerSecondLine).toBeInTheDocument();
});
