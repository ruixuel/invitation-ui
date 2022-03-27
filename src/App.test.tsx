import {
    render,
    screen,
    fireEvent,
    waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "./App";
import { rest, compose } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
    rest.post(
        "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
        (req, res, ctx) => {
            if (
                (req.body as Record<string, string>)["email"] ===
                "usedemail@airwallex.com"
            ) {
                return res(
                    compose(
                        ctx.status(400),
                        ctx.json({
                            errorMessage:
                                "Bad Request: Email is already in use",
                        }),
                    ),
                );
            } else {
                return res(ctx.text("Registerd"));
            }
        },
    ),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders invitation app and register dialog", () => {
    render(<App />);
    const headerText = screen.getByText("Broccoli & Co.");
    expect(headerText).toBeInTheDocument();

    const bodyText = screen.getByText("Be the first to know when we launch.");
    expect(bodyText).toBeInTheDocument();

    const requestButton = screen.getByRole("button", {
        name: "Request an invite",
    });
    expect(requestButton).toBeInTheDocument();

    fireEvent.click(screen.getByText("Request an invite"));
    expect(screen.getByRole("dialog")).toHaveTextContent("Request an invite");

    const footerText = screen.getByText(/All rights reserved/);
    expect(footerText).toBeInTheDocument();
});

test("validate inputs in register dialog", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Request an invite"));

    const nameInput = screen.getByLabelText("name-input");
    const emailInput = screen.getByLabelText("email-input");
    const confirmEmailInput = screen.getByLabelText("confirm-email-input");
    // invalid input value
    fireEvent.change(nameInput, { target: { value: "a" } });
    fireEvent.change(emailInput, { target: { value: "a" } });
    fireEvent.change(confirmEmailInput, { target: { value: "b" } });
    fireEvent.click(screen.getByText("Send"));
    const nameError = screen.getByText(
        "Name should contain at least 3 characters",
    );
    expect(nameError).toBeInTheDocument();
    const emailError = screen.getByText("Invalid Email");
    expect(emailError).toBeInTheDocument();
    const confirmEmailError = screen.getByText(
        "Confirm email does not match Email",
    );
    expect(confirmEmailError).toBeInTheDocument();
});

test("show loading state when firing register request and show successful dialog", async () => {
    render(<App />);
    fireEvent.click(screen.getByText("Request an invite"));
    const nameInput = screen.getByLabelText("name-input");
    const emailInput = screen.getByLabelText("email-input");
    const confirmEmailInput = screen.getByLabelText("confirm-email-input");
    fireEvent.change(nameInput, { target: { value: "test" } });
    fireEvent.change(emailInput, { target: { value: "test@gmail.com" } });
    fireEvent.change(confirmEmailInput, {
        target: { value: "test@gmail.com" },
    });
    fireEvent.click(screen.getByText("Send"));
    expect(screen.getByRole("button")).toHaveTextContent(
        "Sending, please wait...",
    );
    expect(screen.getByRole("button")).toBeDisabled();
    const successDialogText = await screen.findByText("All done!");
    expect(successDialogText).toBeInTheDocument();
    const okButton = await screen.findByRole("button");
    expect(okButton).toHaveTextContent("OK");
    fireEvent.click(okButton);
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
});

test("show server error when firing register request", async () => {
    render(<App />);
    fireEvent.click(screen.getByText("Request an invite"));
    const nameInput = screen.getByLabelText("name-input");
    const emailInput = screen.getByLabelText("email-input");
    const confirmEmailInput = screen.getByLabelText("confirm-email-input");
    fireEvent.change(nameInput, { target: { value: "test" } });
    fireEvent.change(emailInput, {
        target: { value: "usedemail@airwallex.com" },
    });
    fireEvent.change(confirmEmailInput, {
        target: { value: "usedemail@airwallex.com" },
    });
    fireEvent.click(screen.getByText("Send"));
    const errorText = await screen.findByText(/Bad Request/);
    expect(errorText).toBeInTheDocument();
});
