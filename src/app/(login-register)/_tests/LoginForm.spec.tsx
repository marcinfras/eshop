import { describe } from "node:test";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginForm } from "../_components/LoginForm";
import LoginLayout from "../layout";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: () => jest.fn(),
    };
  },
  usePathname() {
    return "/login";
  },
}));

// jest.mock("next-auth/react", () => ({
//   signIn: jest.fn(),
// }));

// jest.mock("../../_components/ui/use-toast", () => ({
//   toast: jest.fn(),
// }));

describe("LoginForm", () => {
  it("check existing fields in form", () => {
    render(
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
    );
    const heading = screen.getByText("Sign in to your account");
    const email = screen.getByLabelText("Email address");
    const password = screen.getByLabelText("Password");
    const loginButton = screen.getByRole("button", {
      name: "Sign in",
    });
    // fireEvent.change(email, {
    //   target: {
    //     value: "test email",
    //   },
    // });

    expect(heading).toBeVisible();
    expect(loginButton).toBeVisible();
    expect(email).toBeVisible();
    expect(password).toBeVisible();
  });

  it("Check entering email and password", () => {
    render(
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
    );

    const email = screen.getByLabelText("Email address");
    const password = screen.getByLabelText("Password");

    fireEvent.change(email, {
      target: {
        value: "rtl@test.pl",
      },
    });

    fireEvent.change(password, {
      target: {
        value: "12345678",
      },
    });

    expect(email).toHaveValue("rtl@test.pl");
    expect(password).toHaveValue("12345678");
  });

  it("Check errors if form fields are empty", async () => {
    render(
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
    );
    const loginButton = screen.getByRole("button", { name: "Sign in" });

    fireEvent.click(loginButton);

    const emailError = await screen.findByText("email is a required field");
    const passwordError = await screen.findByText(
      "password must be at least 8 characters"
    );

    expect(emailError).toBeVisible();
    expect(passwordError).toBeVisible();
  });
});
