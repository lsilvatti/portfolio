import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CopyButton } from "@/components/atoms/CopyButton/CopyButton";

// next-intl is globally mocked via moduleNameMapper → __mocks__/next-intl.ts

const writeText = jest.fn();

beforeEach(() => {
  writeText.mockReset();
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
    writable: true,
  });
});

describe("CopyButton", () => {
  it("renders a button with an accessible label", () => {
    render(<CopyButton value="https://example.com" />);
    // IconButton renders aria-label from t('label') — mocked to return the key
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("copies the value to clipboard when clicked", async () => {
    writeText.mockResolvedValue(undefined);
    render(<CopyButton value="https://example.com" />);
    await userEvent.click(screen.getByRole("button"));
    expect(writeText).toHaveBeenCalledWith("https://example.com");
  });

  it("shows a success toast after a successful copy", async () => {
    writeText.mockResolvedValue(undefined);
    render(<CopyButton value="hello" />);
    await userEvent.click(screen.getByRole("button"));
    // toast message is t('copied') — mocked to return the key "common.copyButton.copied"
    await waitFor(() => {
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });

  it("shows a failure toast when clipboard write fails", async () => {
    writeText.mockRejectedValue(new Error("denied"));
    render(<CopyButton value="hello" />);
    await userEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });

  it("applies className to the button wrapper", () => {
    render(<CopyButton value="x" className="extra" />);
    expect(screen.getByRole("button")).toHaveClass("extra");
  });
});
