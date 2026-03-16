import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IconButton } from "@/components/atoms/IconButton/IconButton";

const MockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg data-testid="mock-icon" aria-hidden="true" {...props} />
);

describe("IconButton", () => {
  describe("as a <button>", () => {
    it("renders a button with aria-label", () => {
      render(<IconButton icon={MockIcon} label="Copy" />);
      expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
    });

    it("renders the icon", () => {
      render(<IconButton icon={MockIcon} label="Share" />);
      expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    });

    it("calls onClick when clicked", async () => {
      const onClick = jest.fn();
      render(<IconButton icon={MockIcon} label="Click me" onClick={onClick} />);
      await userEvent.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("is disabled when disabled prop is set", () => {
      render(<IconButton icon={MockIcon} label="Disabled" disabled />);
      expect(screen.getByRole("button", { name: "Disabled" })).toBeDisabled();
    });

    it("does not call onClick when disabled", async () => {
      const onClick = jest.fn();
      render(<IconButton icon={MockIcon} label="Disabled" disabled onClick={onClick} />);
      await userEvent.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });

    it("applies additional className", () => {
      render(<IconButton icon={MockIcon} label="Styled" className="extra" />);
      expect(screen.getByRole("button")).toHaveClass("extra");
    });

    it("applies ghost variant classes", () => {
      render(<IconButton icon={MockIcon} label="Ghost" variant="ghost" />);
      expect(screen.getByRole("button")).toHaveClass("bg-transparent");
    });

    it("applies size classes for sm", () => {
      render(<IconButton icon={MockIcon} label="Small" size="sm" />);
      expect(screen.getByRole("button")).toHaveClass("h-8", "w-8");
    });

    it("applies size classes for lg", () => {
      render(<IconButton icon={MockIcon} label="Large" size="lg" />);
      expect(screen.getByRole("button")).toHaveClass("h-12", "w-12");
    });
  });

  describe("as a link (href provided)", () => {
    it("renders as <a> with correct href", () => {
      render(<IconButton icon={MockIcon} label="Go to projects" href="/projects" />);
      expect(screen.getByRole("link", { name: "Go to projects" })).toHaveAttribute(
        "href",
        "/projects",
      );
    });

    it("renders as aria-disabled span when disabled href", () => {
      render(<IconButton icon={MockIcon} label="Disabled link" href="/projects" disabled />);
      expect(screen.queryByRole("link")).not.toBeInTheDocument();
      const span = screen.getByLabelText("Disabled link");
      expect(span.tagName).toBe("SPAN");
      expect(span).toHaveAttribute("aria-disabled");
    });
  });

  describe("with tooltip", () => {
    it("renders the button inside a tooltip trigger", () => {
      render(
        <IconButton
          icon={MockIcon}
          label="With tooltip"
          tooltip={<span>Tooltip text</span>}
        />,
      );
      // The button itself should still be present
      expect(screen.getByRole("button", { name: "With tooltip" })).toBeInTheDocument();
    });
  });
});
