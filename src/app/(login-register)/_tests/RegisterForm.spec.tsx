import { describe } from "node:test";
import "@testing-library/jest-dom";
import { RegisterForm } from "../_components/RegisterForm";
import LoginLayout from "../layout";
import { render } from "@testing-library/react";
import {
  checkEnteringFieldsInForm,
  checkErrorsIfFieldsEmpty,
  checkExistingFieldsInForm,
} from "./utils/formTestUtils";

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

    checkExistingFieldsInForm({
      headingText: "Create a new account",
      fields: [
        { label: "Name" },
        { label: "Email address" },
        { label: "Password" },
      ],
      buttonText: "Create account",
    });
  });

  it("Check entering email and password", async () => {
    render(
      <LoginLayout>
        <RegisterForm />
      </LoginLayout>
    );

    await checkEnteringFieldsInForm({
      fields: [
        { label: "Name", value: "testName" },
        { label: "Email address", value: "rtl@test.pl" },
        { label: "Password", value: "12345678" },
      ],
    });
  });

  it("Check errors if form fields are empty", async () => {
    render(
      <LoginLayout>
        <RegisterForm />
      </LoginLayout>
    );

    await checkErrorsIfFieldsEmpty({
      buttonText: "Create account",
      errors: [
        "name is a required field",
        "email is a required field",
        "password must be at least 8 characters",
      ],
    });
  });
});
