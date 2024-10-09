import { describe } from "node:test";
import "@testing-library/jest-dom";
import { RegisterForm } from "../_components/RegisterForm";
import LoginLayout from "../layout";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: () => jest.fn(),
    };
  },
  usePathname() {
    return "/register";
  },
}));

describe("Register Form", () => {
  it("check existing fields in form", () => {
    render(
      <LoginLayout>
        <RegisterForm />
      </LoginLayout>
    );

    const heading = screen.getByText("Create a new account");
    const name = screen.getByLabelText("Name");
    const email = screen.getByLabelText("Email address");
    const password = screen.getByLabelText("Password");
    const registerButton = screen.getByRole("button", {
      name: "Create account",
    });

    expect(heading).toBeVisible();
    expect(name).toBeVisible();
    expect(registerButton).toBeVisible();
    expect(email).toBeVisible();
    expect(password).toBeVisible();
  });

  it("Check entering email and password", () => {
    render(
      <LoginLayout>
        <RegisterForm />
      </LoginLayout>
    );

    const name = screen.getByLabelText("Name");
    const email = screen.getByLabelText("Email address");
    const password = screen.getByLabelText("Password");

    fireEvent.change(name, {
      target: {
        value: "testName",
      },
    });

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

    expect(name).toHaveValue("testName");
    expect(email).toHaveValue("rtl@test.pl");
    expect(password).toHaveValue("12345678");
  });

  it("Check errors if form fields are empty", async () => {
    render(
      <LoginLayout>
        <RegisterForm />
      </LoginLayout>
    );
    const registerButton = screen.getByRole("button", {
      name: "Create account",
    });

    fireEvent.click(registerButton);

    const nameError = await screen.findByText("name is a required field");
    const emailError = await screen.findByText("email is a required field");
    const passwordError = await screen.findByText(
      "password must be at least 8 characters"
    );

    expect(nameError).toBeVisible();
    expect(emailError).toBeVisible();
    expect(passwordError).toBeVisible();
  });
});
