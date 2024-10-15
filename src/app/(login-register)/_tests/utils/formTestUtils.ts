import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const checkExistingFieldsInForm = ({
  headingText,
  fields,
  buttonText,
}: {
  headingText?: string;
  fields: { label: string }[];
  buttonText: string;
}) => {
  if (headingText) {
    const heading = screen.getByText(headingText);
    expect(heading).toBeVisible();
  }

  fields.forEach((field) => {
    const label = screen.getByLabelText(field.label);
    expect(label).toBeVisible();
  });

  const button = screen.getByRole("button", { name: buttonText });
  expect(button).toBeVisible();
};

export const checkEnteringFieldsInForm = async ({
  fields,
}: {
  fields: { label: string; value: string }[];
}) => {
  for (const field of fields) {
    const input = screen.getByLabelText(field.label);
    await userEvent.type(input, field.value);
    expect(input).toHaveValue(field.value);
  }
};

export const checkErrorsIfFieldsEmpty = async ({
  buttonText,
  errors,
}: {
  buttonText: string;
  errors: string[];
}) => {
  const button = screen.getByRole("button", { name: buttonText });

  userEvent.click(button);

  for (const error of errors) {
    const errorMessage = await screen.findByText(error);
    expect(errorMessage).toBeVisible();
  }
};
