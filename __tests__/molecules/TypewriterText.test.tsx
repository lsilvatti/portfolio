import React from "react";
import { render, screen } from "@testing-library/react";
import { TypewriterText } from "@/components/molecules/TypewriterText/TypewriterText";

// TypewriterAnimation uses timers internally; mock it to keep tests fast and deterministic
jest.mock("@/components/molecules/TypewriterText/TypewriterAnimation", () => ({
  TypewriterAnimation: ({
    prefix,
    words,
  }: {
    prefix?: string;
    words: string[];
    initialText?: string;
  }) => (
    <span data-testid="typewriter-animation">
      {prefix}
      {words[0]}
    </span>
  ),
}));

const words = ["Frontend Developer", "React Engineer", "TypeScript Enthusiast"];

describe("TypewriterText", () => {
  it("renders without crashing", () => {
    render(<TypewriterText words={words} />);
    expect(screen.getByTestId("typewriter-animation")).toBeInTheDocument();
  });

  it("renders the invisible spacer with the longest word", () => {
    render(<TypewriterText words={words} />);
    // The invisible Typography element contains the longest word for layout sizing
    expect(screen.getByText("TypeScript Enthusiast", { exact: false })).toBeInTheDocument();
  });

  it("renders the underscore cursor in the spacer", () => {
    render(<TypewriterText words={words} />);
    expect(screen.getByText("_")).toBeInTheDocument();
  });

  it("renders the prefix in the spacer when provided", () => {
    render(<TypewriterText words={words} prefix="I am a " />);
    // The invisible spacer is aria-hidden="true" and contains the prefix
    const spacers = screen.getAllByText(/I am a/);
    expect(spacers.length).toBeGreaterThanOrEqual(1);
  });

  it("passes prefix and words to TypewriterAnimation", () => {
    render(<TypewriterText words={words} prefix="I am a " />);
    const animation = screen.getByTestId("typewriter-animation");
    expect(animation).toHaveTextContent("I am a");
    expect(animation).toHaveTextContent(words[0]);
  });

  it("applies additional className to the container", () => {
    const { container } = render(<TypewriterText words={words} className="extra" />);
    expect(container.firstChild).toHaveClass("extra");
  });

  it("handles a single word without crashing", () => {
    render(<TypewriterText words={["Only Word"]} />);
    expect(screen.getByTestId("typewriter-animation")).toBeInTheDocument();
  });
});
