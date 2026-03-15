import React from "react";
import { render, screen } from "@testing-library/react";
import { Avatar } from "@/components/atoms/Avatar/Avatar";

describe("Avatar", () => {
  it("renders an img element", () => {
    render(<Avatar src="/photo.jpg" alt="Profile photo" />);
    const img = screen.getByRole("img", { name: "Profile photo" });
    expect(img).toBeInTheDocument();
  });

  it("passes the correct src and alt", () => {
    render(<Avatar src="/photo.jpg" alt="Profile photo" />);
    const img = screen.getByRole("img", { name: "Profile photo" });
    expect(img).toHaveAttribute("src", "/photo.jpg");
    expect(img).toHaveAttribute("alt", "Profile photo");
  });

  it("renders with sm size (width/height = 48)", () => {
    render(<Avatar src="/photo.jpg" alt="Photo" size="sm" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("width", "48");
    expect(img).toHaveAttribute("height", "48");
  });

  it("renders with md size (width/height = 80) by default", () => {
    render(<Avatar src="/photo.jpg" alt="Photo" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("width", "80");
    expect(img).toHaveAttribute("height", "80");
  });

  it("renders with lg size (width/height = 128)", () => {
    render(<Avatar src="/photo.jpg" alt="Photo" size="lg" />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("width", "128");
    expect(img).toHaveAttribute("height", "128");
  });

  it("applies additional className", () => {
    render(<Avatar src="/photo.jpg" alt="Photo" className="extra" />);
    expect(screen.getByRole("img")).toHaveClass("extra");
  });
});
