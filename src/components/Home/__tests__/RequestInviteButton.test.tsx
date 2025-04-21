import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RequestInviteButton from "../RequestInviteButton";

function mockFetch(
  data: unknown,
  { ok, delayMs }: { ok: boolean; delayMs?: number } = {
    ok: true,
    delayMs: 100,
  },
) {
  return jest.fn().mockImplementation(
    () =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve({
              ok,
              json: () => data,
            }),
          delayMs,
        ),
      ),
  );
}

jest.setTimeout(15000);

describe("RequestInviteButton", () => {
  it("renders dialog and form inputs", async () => {
    render(<RequestInviteButton />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();

    const nameInput = screen.getByPlaceholderText("Full name");
    expect(nameInput).toBeInTheDocument();
    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeInTheDocument();
    const confirmEmailInput = screen.getByPlaceholderText("Confirm email");
    expect(confirmEmailInput).toBeInTheDocument();

    const buttonSend = screen.getByRole("button", { name: "Send" });
    expect(buttonSend).toBeInTheDocument();

    await userEvent.click(buttonSend, { delay: 100 });

    expect(screen.queryByText("Full name is required")).toBeInTheDocument();
    expect(screen.queryByText("Email is required")).toBeInTheDocument();
    expect(screen.queryByText("Confirm email is required")).toBeInTheDocument();

    await userEvent.type(nameInput, "Love is war", { delay: 20 });
    expect(screen.queryByText("Full name is required")).toBeNull();

    await userEvent.type(emailInput, "Love is war", { delay: 20 });
    expect(
      screen.queryByText("This has to to a valid email"),
    ).toBeInTheDocument();
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, "kaguya@sama.com", { delay: 20 });
    expect(screen.queryByText("This has to to a valid email")).toBeNull();

    expect(screen.queryByText("Confirm email is required")).toBeInTheDocument();
    await userEvent.type(confirmEmailInput, "Love is war", { delay: 20 });
    expect(
      screen.queryByText("This has to to a valid email"),
    ).toBeInTheDocument();
    await userEvent.clear(confirmEmailInput);
    await userEvent.type(confirmEmailInput, "kaguya@sama.com", { delay: 20 });
    expect(screen.queryByText("This has to to a valid email")).toBeNull();
  });

  it("submit success", async () => {
    window.fetch = mockFetch("Registered", { ok: true, delayMs: 1000 });

    render(<RequestInviteButton />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    const nameInput = screen.getByPlaceholderText("Full name");
    const emailInput = screen.getByPlaceholderText("Email");
    const confirmEmailInput = screen.getByPlaceholderText("Confirm email");

    await userEvent.type(nameInput, "Love is war", { delay: 20 });
    await userEvent.type(emailInput, "kaguya@sama.com", { delay: 20 });
    await userEvent.type(confirmEmailInput, "kaguya@sama.com", { delay: 20 });

    const buttonSend = screen.getByRole("button", { name: "Send" });
    await userEvent.click(buttonSend, { delay: 100 });
    expect(
      screen.getByRole("button", { name: "Sending, please wait..." }),
    ).toBeInTheDocument();

    // Click dialog over and not dismiss dialog when submitting
    const dialogOverlay = document.body.querySelector(
      '[data-slot="dialog-overlay"]',
    );
    expect(dialogOverlay).toBeInTheDocument();
    await userEvent.click(dialogOverlay!, { delay: 100 });

    await userEvent.click(buttonSend, { delay: 900 });

    expect(screen.queryByText("All done!")).toBeInTheDocument();

    const buttonOk = screen.getByRole("button", { name: "OK" });
    await userEvent.click(buttonOk, { delay: 1000 });

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("submit fail", async () => {
    window.fetch = mockFetch(
      {
        errorMessage: "Bad Request: Email is already in use",
      },
      { ok: false },
    );

    render(<RequestInviteButton />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    const nameInput = screen.getByPlaceholderText("Full name");
    const emailInput = screen.getByPlaceholderText("Email");
    const confirmEmailInput = screen.getByPlaceholderText("Confirm email");

    await userEvent.type(nameInput, "Love is war", { delay: 20 });
    await userEvent.type(emailInput, "usedemail@airwallex.com", { delay: 20 });
    await userEvent.type(confirmEmailInput, "usedemail@airwallex.com", {
      delay: 20,
    });

    const buttonSend = screen.getByRole("button", { name: "Send" });
    await userEvent.click(buttonSend, { delay: 1000 });

    expect(
      screen.queryByText("Bad Request: Email is already in use"),
    ).toBeInTheDocument();
  });

  it("submit fail with unknown error from server", async () => {
    window.fetch = mockFetch(null, { ok: false });

    render(<RequestInviteButton />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    const nameInput = screen.getByPlaceholderText("Full name");
    const emailInput = screen.getByPlaceholderText("Email");
    const confirmEmailInput = screen.getByPlaceholderText("Confirm email");

    await userEvent.type(nameInput, "Love is war", { delay: 20 });
    await userEvent.type(emailInput, "usedemail@airwallex.com", { delay: 20 });
    await userEvent.type(confirmEmailInput, "usedemail@airwallex.com", {
      delay: 20,
    });

    const buttonSend = screen.getByRole("button", { name: "Send" });
    await userEvent.click(buttonSend, { delay: 1000 });
    expect(screen.queryByText("Unknown error from server")).toBeInTheDocument();
  });

  it("revalidate confirm email when change email", async () => {
    render(<RequestInviteButton />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    const nameInput = screen.getByPlaceholderText("Full name");
    const emailInput = screen.getByPlaceholderText("Email");
    const confirmEmailInput = screen.getByPlaceholderText("Confirm email");

    await userEvent.type(nameInput, "Love is war", { delay: 20 });
    await userEvent.type(emailInput, "usedemail@airwallex.com", { delay: 20 });
    await userEvent.type(confirmEmailInput, "usedemail@airwallex.comxxx", {
      delay: 20,
    });
    await userEvent.click(screen.getByRole("button", { name: "Send" }), {
      delay: 1000,
    });
    expect(
      screen.queryByText("Email and confirm email must match"),
    ).toBeInTheDocument();

    await userEvent.type(emailInput, "xxx", { delay: 20 });
    expect(
      screen.queryByText("Email and confirm email must match"),
    ).not.toBeInTheDocument();
  });
});
