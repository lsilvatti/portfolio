import { renderHook, act } from "@testing-library/react";
import { useToast } from "@/components/atoms/Toast/useToast";

describe("useToast", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("initialises with an empty message", () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.message).toBe("");
  });

  it("show() sets the message after a microtask", () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.show("Hello!");
      jest.runAllTimers();
    });
    expect(result.current.message).toBe("Hello!");
  });

  it("show() can re-trigger with the same message consecutively", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.show("Same message");
      jest.runAllTimers();
    });
    expect(result.current.message).toBe("Same message");

    act(() => {
      result.current.show("Same message");
      jest.runAllTimers();
    });
    expect(result.current.message).toBe("Same message");
  });

  it("show() updates message when called with a different value", () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.show("First");
      jest.runAllTimers();
    });
    act(() => {
      result.current.show("Second");
      jest.runAllTimers();
    });
    expect(result.current.message).toBe("Second");
  });
});
