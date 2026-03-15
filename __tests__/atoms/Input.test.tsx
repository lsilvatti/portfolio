import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "@/components/atoms/Input/Input";

describe("Input", () => {
  it("renders without a label by default", () => {
    render(<Input placeholder="Enter value" />);
    expect(screen.getByPlaceholderText("Enter value")).toBeInTheDocument();
  });

  it("renders the label when provided", () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it("shows required asterisk when required", () => {
    render(<Input label="Name" required />);
    expect(screen.getByRole("textbox")).toBeRequired();
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("shows hint text when provided and no error", () => {
    render(<Input label="Email" hint="We'll never spam you." />);
    expect(screen.getByText("We'll never spam you.")).toBeInTheDocument();
  });

  it("shows external error message and sets aria-invalid", () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email");
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });

  it("does not show hint when an external error is present", () => {
    render(<Input label="Email" hint="We'll never spam you." error="Required" />);
    expect(screen.queryByText("We'll never spam you.")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("Required");
  });

  it("validates email on blur and shows error for invalid input", async () => {
    render(<Input label="Email" validate="email" />);
    const input = screen.getByLabelText("Email");
    await userEvent.type(input, "notvalid");
    await userEvent.tab();
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  it("validates email on blur and clears error for valid input", async () => {
    render(<Input label="Email" validate="email" />);
    const input = screen.getByLabelText("Email");
    await userEvent.type(input, "valid@email.com");
    await userEvent.tab();
    await waitFor(() => {
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  it("clears validation error on change after blur", async () => {
    render(<Input label="Name" validate="name" />);
    const input = screen.getByLabelText("Name");
    await userEvent.type(input, "1");
    await userEvent.tab();
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    await userEvent.type(input, "a"); 
    await waitFor(() => expect(screen.queryByRole("alert")).not.toBeInTheDocument());
  });

  it("shows character count when showCharCount is true", async () => {
    render(<Input label="Text" showCharCount maxLength={100} />);
    const input = screen.getByLabelText("Text");
    await userEvent.type(input, "Hi");
    expect(screen.getByText(/2\s*\/\s*100/)).toBeInTheDocument();
  });

  it("calls the onChange callback", async () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "x");
    expect(onChange).toHaveBeenCalled();
  });

  it("calls the onBlur callback", async () => {
    const onBlur = jest.fn();
    render(<Input onBlur={onBlur} />);
    await userEvent.click(screen.getByRole("textbox"));
    await userEvent.tab();
    expect(onBlur).toHaveBeenCalled();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Input disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
