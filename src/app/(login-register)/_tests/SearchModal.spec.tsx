import { Autocomplete } from "@/app/_components/Autocomplete/Autocomplete";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe } from "node:test";

describe("Autocomplete", () => {
  beforeAll(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "searchModal");
    document.body.appendChild(modalRoot);
  });

  test("should open SearchModal when button is clicked and close after click outside", async () => {
    render(<Autocomplete />);

    const openButton = screen.getByRole("button", { name: "Search..." });
    expect(openButton).toBeInTheDocument();

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await userEvent.click(openButton);

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const dialog = screen.getByRole("dialog");

    await userEvent.click(dialog);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
