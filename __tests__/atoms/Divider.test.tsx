import React from "react";
import { render, screen } from "@testing-library/react";
import { Divider } from "@/components/atoms/Divider/Divider";

describe("Divider", () => {
  it("renders an <hr> element", () => {
    render(<Divider data-testid="divider" />);
    expect(screen.getByTestId("divider").tagName).toBe("HR");
  });

  it("applies additional className", () => {
    render(<Divider className="my-class" data-testid="divider" />);
    expect(screen.getByTestId("divider")).toHaveClass("my-class");
  });

  it("renders without error for all color variants", () => {
    const colors = ["primary", "secondary", "muted", "border"] as const;
    colors.forEach((color) => {
      const { unmount } = render(<Divider color={color} data-testid={`divider-${color}`} />);
      expect(screen.getByTestId(`divider-${color}`)).toBeInTheDocument();
      unmount();
    });
  });

  it("renders without error for all size variants", () => {
    const sizes = ["thin", "medium", "thick"] as const;
    sizes.forEach((size) => {
      const { unmount } = render(<Divider size={size} data-testid={`divider-${size}`} />);
      expect(screen.getByTestId(`divider-${size}`)).toBeInTheDocument();
      unmount();
    });
  });

  it("renders vertical orientation without error", () => {
    render(<Divider orientation="vertical" data-testid="vdivider" />);
    expect(screen.getByTestId("vdivider")).toBeInTheDocument();
  });

  it("does not add animation class when animated=false (default)", () => {
    render(<Divider data-testid="divider" />);
    expect(screen.getByTestId("divider")).not.toHaveClass("animate-grow-x");
  });

  it("adds animation class when animated=true with horizontal orientation", () => {
    render(<Divider animated data-testid="divider" />);
    expect(screen.getByTestId("divider")).toHaveClass("animate-grow-x");
  });

  it("does not add animation class for vertical divider even when animated=true", () => {
    render(<Divider animated orientation="vertical" data-testid="divider" />);
    expect(screen.getByTestId("divider")).not.toHaveClass("animate-grow-x");
  });
});
