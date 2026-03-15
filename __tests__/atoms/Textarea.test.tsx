import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "@/components/atoms/Input/Textarea";

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("textbox").tagName).toBe("TEXTAREA");
  });

  it("renders the label when provided", () => {
    render(<Textarea label="Message" />);
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("shows hint text when no error is present", () => {
    render(<Textarea label="Message" hint="Max 500 characters." />);
    expect(screen.getByText("Max 500 characters.")).toBeInTheDocument();
  });

  it("shows external error and sets aria-invalid", () => {
    render(<Textarea label="Message" error="Message is too short." />);
    expect(screen.getByRole("alert")).toHaveTextContent("Message is too short.");
    expect(screen.getByLabelText("Message")).toHaveAttribute("aria-invalid", "true");
  });

  it("hides hint when error is present", () => {
    render(<Textarea label="Message" hint="Max 500 chars." error="Required" />);
    expect(screen.queryByText("Max 500 chars.")).not.toBeInTheDocument();
  });

  it("validates on blur when required", async () => {
    render(<Textarea label="Message" required />);
    const textarea = screen.getByRole("textbox");
    await userEvent.click(textarea);
    await userEvent.tab();
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  it("validates on blur with minLength", async () => {
    render(<Textarea label="Message" minLength={10} />);
    const textarea = screen.getByLabelText("Message");
    await userEvent.type(textarea, "Short");
    await userEvent.tab();
    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
  });

  it("clears error on change", async () => {
    render(<Textarea label="Message" required />);
    const textarea = screen.getByRole("textbox");
    await userEvent.click(textarea);
    await userEvent.tab();
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    await userEvent.type(textarea, "x");
    await waitFor(() => expect(screen.queryByRole("alert")).not.toBeInTheDocument());
  });

  it("shows character count when showCharCount is true", async () => {
    render(<Textarea label="Message" showCharCount maxLength={200} />);
    const textarea = screen.getByLabelText("Message");
    await userEvent.type(textarea, "Hello");
    expect(screen.getByText(/5\s*\/\s*200/)).toBeInTheDocument();
  });

  it("respects the rows prop", () => {
    render(<Textarea rows={6} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "6");
  });

  it("is disabled when disabled prop is set", () => {
    render(<Textarea disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
