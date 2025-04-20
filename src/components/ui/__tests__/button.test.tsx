import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import { Button } from "../button";

test("should be rendered", () => {
  render(<Button>Button</Button>);
  const button = screen.getByText("Button");

  expect(button).toBeInTheDocument();
});

test("should be rendered with asChild", () => {
  render(
    <Button asChild>
      <a>Button</a>
    </Button>,
  );
  const button = screen.getByText("Button");

  expect(button).toBeInTheDocument();
});

test("should call the onClick function when click", () => {
  const onButtonClickMock = jest.fn();

  const { getByText } = render(
    <Button onClick={onButtonClickMock}>Button</Button>,
  );
  const button = getByText("Button");

  fireEvent.click(button);

  expect(onButtonClickMock).toHaveBeenCalled();
});
