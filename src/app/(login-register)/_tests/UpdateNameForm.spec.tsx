import { describe } from "node:test";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import {
  checkEnteringFieldsInForm,
  checkErrorsIfFieldsEmpty,
  checkExistingFieldsInForm,
} from "./utils/formTestUtils";
import { UpdateNameForm } from "@/app/account/_components/UpdateNameForm";

jest.mock("next-auth/react", () => ({
  useSession() {
    return {};
  },
}));

describe("UpdateNameForm", () => {
  it("check existing fields in form", () => {
    render(<UpdateNameForm />);

    checkExistingFieldsInForm({
      headingText: "Account Settings",
      fields: [{ label: "Name" }],
      buttonText: "Update Profile",
    });
  });

  it("Check entering email and password", async () => {
    render(<UpdateNameForm />);
    await checkEnteringFieldsInForm({
      fields: [{ label: "Name", value: "Marcin" }],
    });
  });

  it("Check errors if form fields are empty", async () => {
    render(<UpdateNameForm />);
    await checkErrorsIfFieldsEmpty({
      buttonText: "Update Profile",
      errors: ["name is a required field"],
    });
  });
});
