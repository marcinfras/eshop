import { describe } from "node:test";
import "@testing-library/jest-dom";
import { RegisterForm } from "../_components/RegisterForm";
import LoginLayout from "../layout";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

  it("Check entering email and password", async () => {
    render(
      <LoginLayout>
        <RegisterForm />
      </LoginLayout>
    );

    const name = screen.getByLabelText("Name");
    const email = screen.getByLabelText("Email address");
    const password = screen.getByLabelText("Password");

    await userEvent.type(name, "testName");

    await userEvent.type(email, "rtl@test.pl");

    await userEvent.type(password, "12345678");

    // screen.debug();

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

    userEvent.click(registerButton);

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
