import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";

function ThemeConsumer() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

describe("ThemeContext", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("provides a default theme (light when no stored/system preference)", async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    await act(async () => {});
    expect(screen.getByTestId("theme").textContent).toBe("light");
  });

  it("toggles from light to dark", async () => {
    localStorage.setItem("portfolio-theme", "light");
    document.documentElement.setAttribute("data-theme", "light");

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    await act(async () => {});
    expect(screen.getByTestId("theme").textContent).toBe("light");

    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByTestId("theme").textContent).toBe("dark");
  });

  it("toggles from dark to light", async () => {
    localStorage.setItem("portfolio-theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    await act(async () => {});
    expect(screen.getByTestId("theme").textContent).toBe("dark");

    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByTestId("theme").textContent).toBe("light");
  });

  it("persists the toggled theme value in localStorage", async () => {
    document.documentElement.setAttribute("data-theme", "light");
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    await act(async () => {});
    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(localStorage.getItem("portfolio-theme")).toBe("dark");
  });

  it("applies data-theme attribute to documentElement when theme changes", async () => {
    document.documentElement.setAttribute("data-theme", "light");
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    await act(async () => {});
    await userEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("throws when useTheme is used outside ThemeProvider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => {
      render(<ThemeConsumer />);
    }).toThrow("useTheme must be used within a ThemeProvider");
    spy.mockRestore();
  });

  it("does not overwrite the existing DOM data-theme on initial render", async () => {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("portfolio-theme", "dark");

    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );
    await act(async () => {});

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(screen.getByTestId("theme").textContent).toBe("dark");
  });
});
