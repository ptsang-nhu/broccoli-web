import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

test("Dialog should be rendered", async () => {
  render(
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Custom close button
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>,
  );

  const button = screen.getByText("Share");
  expect(button).toBeInTheDocument();

  fireEvent.click(button);

  expect(screen.queryByRole("dialog")).toBeInTheDocument();

  const closeButton = screen.getByRole("button", {
    name: "Custom close button",
  });
  expect(closeButton).toBeInTheDocument();

  fireEvent.click(closeButton);

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
