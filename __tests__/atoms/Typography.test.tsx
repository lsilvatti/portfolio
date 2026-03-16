import React from "react";
import { render, screen } from "@testing-library/react";
import { Typography } from "@/components/atoms/Typography/Typography";

describe("Typography", () => {
  it("renders children as a <p> by default (body variant)", () => {
    render(<Typography>Hello</Typography>);
    const el = screen.getByText("Hello");
    expect(el.tagName).toBe("P");
  });

  it("renders h1 variant as <h1>", () => {
    render(<Typography variant="h1">Heading 1</Typography>);
    expect(screen.getByText("Heading 1").tagName).toBe("H1");
  });

  it("renders h2 variant as <h2>", () => {
    render(<Typography variant="h2">Heading 2</Typography>);
    expect(screen.getByText("Heading 2").tagName).toBe("H2");
  });

  it("renders h3 variant as <h3>", () => {
    render(<Typography variant="h3">Heading 3</Typography>);
    expect(screen.getByText("Heading 3").tagName).toBe("H3");
  });

  it("renders h4 variant as <h4>", () => {
    render(<Typography variant="h4">Heading 4</Typography>);
    expect(screen.getByText("Heading 4").tagName).toBe("H4");
  });

  it("renders small variant as <span>", () => {
    render(<Typography variant="small">Small text</Typography>);
    expect(screen.getByText("Small text").tagName).toBe("SPAN");
  });

  it("renders caption variant as <span>", () => {
    render(<Typography variant="caption">Caption text</Typography>);
    expect(screen.getByText("Caption text").tagName).toBe("SPAN");
  });

  it("overrides the tag with the `as` prop", () => {
    render(<Typography as="section">Section content</Typography>);
    expect(screen.getByText("Section content").tagName).toBe("SECTION");
  });

  it("applies additional className", () => {
    render(<Typography className="custom-class">Styled</Typography>);
    expect(screen.getByText("Styled")).toHaveClass("custom-class");
  });

  it("passes through arbitrary props (e.g. data-testid)", () => {
    render(<Typography data-testid="typo">Test</Typography>);
    expect(screen.getByTestId("typo")).toBeInTheDocument();
  });

  it("renders ul variant as <ul>", () => {
    render(<Typography variant="ul"><li>Item</li></Typography>);
    expect(screen.getByRole("list").tagName).toBe("UL");
  });

  it("renders ol variant as <ol>", () => {
    render(<Typography variant="ol"><li>Item</li></Typography>);
    expect(screen.getByRole("list").tagName).toBe("OL");
  });

  it("renders li variant as <li>", () => {
    render(<ul><Typography variant="li">List item</Typography></ul>);
    expect(screen.getByRole("listitem").tagName).toBe("LI");
  });
});
