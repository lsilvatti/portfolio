import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/atoms/Button/Button";

const MockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" {...props} />
);

describe("Button", () => {
  describe("as a <button>", () => {
    it("renders children", () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
    });

    it("calls onClick when clicked", async () => {
      const onClick = jest.fn();
      render(<Button onClick={onClick}>Click</Button>);
      await userEvent.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("is disabled when disabled prop is set", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
    });

    it("does not call onClick when disabled", async () => {
      const onClick = jest.fn();
      render(<Button disabled onClick={onClick}>Disabled</Button>);
      await userEvent.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });

    it("renders with type=submit", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("applies additional className", () => {
      render(<Button className="extra">Button</Button>);
      expect(screen.getByRole("button")).toHaveClass("extra");
    });

    it("renders iconLeft when provided", () => {
      render(<Button iconLeft={MockIcon}>With Icon</Button>);
      const btn = screen.getByRole("button");
      expect(btn.querySelector("svg")).toBeInTheDocument();
    });

    it("renders iconRight when provided", () => {
      render(<Button iconRight={MockIcon}>With Icon</Button>);
      expect(screen.getByRole("button").querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("as a link (href provided)", () => {
    it("renders as <a> with the correct href", () => {
      render(<Button href="/projects">Projects</Button>);
      const link = screen.getByRole("link", { name: "Projects" });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/projects");
    });

    it("renders as <span aria-disabled> when disabled", () => {
      render(<Button href="/projects" disabled>Projects</Button>);
      const el = screen.getByText("Projects").closest("span");
      expect(el).toHaveAttribute("aria-disabled");
    });
  });
});
