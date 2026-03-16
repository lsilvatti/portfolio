import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ShareButton } from "@/components/atoms/ShareButton/ShareButton";

// next-intl is globally mocked via moduleNameMapper → __mocks__/next-intl.ts

const writeText = jest.fn();
const shareMock = jest.fn();

function setClipboard() {
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
    writable: true,
  });
}

function setShareSupported(supported: boolean) {
  Object.defineProperty(navigator, "share", {
    value: supported ? shareMock : undefined,
    configurable: true,
    writable: true,
  });
}

beforeEach(() => {
  writeText.mockReset();
  shareMock.mockReset();
  setClipboard();
});

describe("ShareButton — Web Share API not available (fallback to clipboard)", () => {
  beforeEach(() => setShareSupported(false));

  it("renders a button", () => {
    render(<ShareButton url="https://example.com" />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("copies the provided URL to clipboard", async () => {
    writeText.mockResolvedValue(undefined);
    render(<ShareButton url="https://example.com" />);
    await userEvent.click(screen.getByRole("button"));
    expect(writeText).toHaveBeenCalledWith("https://example.com");
  });

  it("falls back to window.location.href when no url prop is given", async () => {
    writeText.mockResolvedValue(undefined);
    render(<ShareButton />);
    await userEvent.click(screen.getByRole("button"));
    expect(writeText).toHaveBeenCalledWith(window.location.href);
  });

  it("shows a success toast after copying", async () => {
    writeText.mockResolvedValue(undefined);
    render(<ShareButton url="https://example.com" />);
    await userEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });

  it("shows a failure toast when clipboard write fails", async () => {
    writeText.mockRejectedValue(new Error("denied"));
    render(<ShareButton url="https://example.com" />);
    await userEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });
});

describe("ShareButton — Web Share API available", () => {
  beforeEach(() => setShareSupported(true));

  it("calls navigator.share with the provided data", async () => {
    shareMock.mockResolvedValue(undefined);
    render(<ShareButton title="My Page" text="Check this" url="https://example.com" />);
    await userEvent.click(screen.getByRole("button"));
    expect(shareMock).toHaveBeenCalledWith({
      title: "My Page",
      text: "Check this",
      url: "https://example.com",
    });
  });

  it("does not show an error toast when user aborts the share", async () => {
    shareMock.mockRejectedValue(Object.assign(new Error("AbortError"), { name: "AbortError" }));
    render(<ShareButton url="https://example.com" />);
    await userEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.queryByRole("status")).not.toBeInTheDocument();
    });
  });

  it("shows a failure toast on non-abort share errors", async () => {
    shareMock.mockRejectedValue(new Error("some other error"));
    render(<ShareButton url="https://example.com" />);
    await userEvent.click(screen.getByRole("button"));
    await waitFor(() => {
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });
});
