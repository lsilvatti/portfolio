import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GoBackButton } from "@/components/molecules/GoBackButton/GoBackButton";

// next-intl mocked globally; next/navigation needs its own mock
const mockBack = jest.fn();
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockBack,
    push: mockPush,
  }),
}));

beforeEach(() => {
  mockBack.mockReset();
  mockPush.mockReset();
  // reset referrer and history state
  Object.defineProperty(document, "referrer", { value: "", configurable: true });
  Object.defineProperty(window, "history", {
    value: { length: 1 },
    configurable: true,
    writable: true,
  });
});

describe("GoBackButton", () => {
  it("renders a button", () => {
    render(<GoBackButton />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls router.push('/') when referrer is external", async () => {
    Object.defineProperty(document, "referrer", {
      value: "https://google.com",
      configurable: true,
    });
    render(<GoBackButton />);
    await userEvent.click(screen.getByRole("button"));
    expect(mockPush).toHaveBeenCalledWith("/");
    expect(mockBack).not.toHaveBeenCalled();
  });

  it("calls router.push('/') when there is no referrer", async () => {
    Object.defineProperty(document, "referrer", { value: "", configurable: true });
    render(<GoBackButton />);
    await userEvent.click(screen.getByRole("button"));
    expect(mockPush).toHaveBeenCalledWith("/");
    expect(mockBack).not.toHaveBeenCalled();
  });

  it("calls router.back() when referrer is internal and history length > 1", async () => {
    Object.defineProperty(document, "referrer", {
      value: window.location.origin + "/some-page",
      configurable: true,
    });
    Object.defineProperty(window, "history", {
      value: { length: 3 },
      configurable: true,
      writable: true,
    });
    render(<GoBackButton />);
    await userEvent.click(screen.getByRole("button"));
    expect(mockBack).toHaveBeenCalledTimes(1);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("calls router.push('/') when referrer is internal but history length is 1", async () => {
    Object.defineProperty(document, "referrer", {
      value: window.location.origin + "/some-page",
      configurable: true,
    });
    Object.defineProperty(window, "history", {
      value: { length: 1 },
      configurable: true,
      writable: true,
    });
    render(<GoBackButton />);
    await userEvent.click(screen.getByRole("button"));
    expect(mockPush).toHaveBeenCalledWith("/");
    expect(mockBack).not.toHaveBeenCalled();
  });
});
