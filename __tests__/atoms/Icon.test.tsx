import React from "react";
import { render, screen } from "@testing-library/react";
import { Icon } from "@/components/atoms/Icon/Icon";

// A minimal SVG icon component for testing
const TestIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg data-testid="svg-icon" {...props} />
);

describe("Icon", () => {
  it("renders the provided icon component", () => {
    render(<Icon icon={TestIcon} />);
    expect(screen.getByTestId("svg-icon")).toBeInTheDocument();
  });

  it("always sets aria-hidden=true", () => {
    render(<Icon icon={TestIcon} />);
    expect(screen.getByTestId("svg-icon")).toHaveAttribute("aria-hidden", "true");
  });

  it("applies size class for xs", () => {
    render(<Icon icon={TestIcon} size="xs" />);
    expect(screen.getByTestId("svg-icon")).toHaveClass("h-4", "w-4");
  });

  it("applies size class for sm (default)", () => {
    render(<Icon icon={TestIcon} />);
    expect(screen.getByTestId("svg-icon")).toHaveClass("h-5", "w-5");
  });

  it("applies size class for md", () => {
    render(<Icon icon={TestIcon} size="md" />);
    expect(screen.getByTestId("svg-icon")).toHaveClass("h-6", "w-6");
  });

  it("applies size class for lg", () => {
    render(<Icon icon={TestIcon} size="lg" />);
    expect(screen.getByTestId("svg-icon")).toHaveClass("h-8", "w-8");
  });

  it("merges additional className", () => {
    render(<Icon icon={TestIcon} className="extra-class" />);
    expect(screen.getByTestId("svg-icon")).toHaveClass("extra-class");
  });
});
