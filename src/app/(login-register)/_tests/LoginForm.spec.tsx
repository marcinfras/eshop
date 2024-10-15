import { describe } from "node:test";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoginForm } from "../_components/LoginForm";
import LoginLayout from "../layout";

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
    return "/login";
  },
}));

describe("LoginForm", () => {
  it("check existing fields in form", () => {
    render(
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
    );

    checkExistingFieldsInForm({
      headingText: "Sign in to your account",
      fields: [{ label: "Email address" }, { label: "Password" }],
      buttonText: "Sign in",
    });
  });

  it("Check entering email and password", async () => {
    render(
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
    );

    await checkEnteringFieldsInForm({
      fields: [
        { label: "Email address", value: "rtl@test.pl" },
        { label: "Password", value: "12345678" },
      ],
    });
  });

  it("Check errors if form fields are empty", async () => {
    render(
      <LoginLayout>
        <LoginForm />
      </LoginLayout>
    );

    await checkErrorsIfFieldsEmpty({
      buttonText: "Sign in",
      errors: [
        "email is a required field",
        "password must be at least 8 characters",
      ],
    });
  });
});
