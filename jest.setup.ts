import "@testing-library/jest-dom";

// jsdom doesn't implement navigation; suppress the noisy console.error it produces
// when anchor links are clicked in tests.
const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  const msg = args[0] instanceof Error ? args[0].message : String(args[0]);
  if (msg.includes("Not implemented: navigation")) {
    return;
  }
  originalConsoleError(...args);
};

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
