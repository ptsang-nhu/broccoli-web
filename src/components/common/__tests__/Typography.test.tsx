import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { H1, Text, FooterText } from "../Typography";

test("H1 should be rendered", () => {
  render(<H1>H1 should be rendered</H1>);
  const typography = screen.getByText("H1 should be rendered");

  expect(typography).toBeInTheDocument();
});

test("Text should be rendered", () => {
  render(<Text>Text should be rendered</Text>);
  const typography = screen.getByText("Text should be rendered");

  expect(typography).toBeInTheDocument();
});

test("FooterText should be rendered", () => {
  render(<FooterText>FooterText should be rendered</FooterText>);
  const typography = screen.getByText("FooterText should be rendered");

  expect(typography).toBeInTheDocument();
});
