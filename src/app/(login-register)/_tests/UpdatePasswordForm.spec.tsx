import { describe } from "node:test";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import {
  checkEnteringFieldsInForm,
  checkErrorsIfFieldsEmpty,
  checkExistingFieldsInForm,
} from "./utils/formTestUtils";

import { UpdatePasswordForm } from "@/app/account/_components/UpdatePasswordForm";

jest.mock("next-auth/react", () => ({
  useSession() {
    return {};
  },
}));

describe("UpdatePasswordForm", () => {
  it("check existing fields in form", () => {
    render(<UpdatePasswordForm />);

    checkExistingFieldsInForm({
      headingText: "Security",
      fields: [{ label: "New Password" }, { label: "Confirm Password" }],
      buttonText: "Change Password",
    });
  });

  it("Check entering email and password", async () => {
    render(<UpdatePasswordForm />);
    await checkEnteringFieldsInForm({
      fields: [
        { label: "New Password", value: "12345678" },
        { label: "Confirm Password", value: "12345678" },
      ],
    });
  });

  it("Check errors if form fields are empty", async () => {
    render(<UpdatePasswordForm />);
    await checkErrorsIfFieldsEmpty({
      buttonText: "Change Password",
      errors: [
        "password must be at least 8 characters",
        "confirmPassword must be at least 8 characters",
      ],
    });
  });
});
