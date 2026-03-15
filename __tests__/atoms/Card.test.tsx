import React from "react";
import { render, screen } from "@testing-library/react";
import { Card } from "@/components/atoms/Card/Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders as a <div>", () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId("card").tagName).toBe("DIV");
  });

  it("applies additional className", () => {
    render(<Card className="extra-class" data-testid="card">Content</Card>);
    expect(screen.getByTestId("card")).toHaveClass("extra-class");
  });

  it("passes through arbitrary props", () => {
    render(<Card aria-label="my card">Content</Card>);
    expect(screen.getByLabelText("my card")).toBeInTheDocument();
  });

  it("renders with variant=primary without error", () => {
    render(<Card variant="primary" data-testid="card">Primary</Card>);
    expect(screen.getByTestId("card")).toBeInTheDocument();
  });

  it("renders with variant=ghost without error", () => {
    render(<Card variant="ghost" data-testid="card">Ghost</Card>);
    expect(screen.getByTestId("card")).toBeInTheDocument();
  });

  it("renders with padding=none without error", () => {
    render(<Card padding="none" data-testid="card">No padding</Card>);
    expect(screen.getByTestId("card")).toBeInTheDocument();
  });
});
