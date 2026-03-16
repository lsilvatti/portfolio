import React from "react";
import { render, screen } from "@testing-library/react";
import { Link } from "@/components/atoms/Link/Link";

// @/i18n/navigation is mocked in __mocks__ via next-intl mock;
// the Link export from i18n/navigation needs its own mock.
jest.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    children,
    className,
    ...rest
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  ),
  usePathname: jest.fn(() => "/"),
}));

describe("Link", () => {
  describe("internal (default)", () => {
    it("renders children", () => {
      render(<Link href="/projects">Projects</Link>);
      expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument();
    });

    it("passes href to the anchor", () => {
      render(<Link href="/resume">Resume</Link>);
      expect(screen.getByRole("link")).toHaveAttribute("href", "/resume");
    });

    it("does not set target or rel by default", () => {
      render(<Link href="/about">About</Link>);
      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("target");
      expect(link).not.toHaveAttribute("rel");
    });

    it("applies additional className", () => {
      render(<Link href="/" className="extra">Home</Link>);
      expect(screen.getByRole("link")).toHaveClass("extra");
    });
  });

  describe("external", () => {
    it("renders an <a> tag", () => {
      render(<Link href="https://example.com" external>External</Link>);
      expect(screen.getByRole("link", { name: "External" })).toBeInTheDocument();
    });

    it("sets target=_blank and rel=noopener noreferrer", () => {
      render(<Link href="https://example.com" external>External</Link>);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("passes href correctly", () => {
      render(<Link href="https://example.com" external>External</Link>);
      expect(screen.getByRole("link")).toHaveAttribute("href", "https://example.com");
    });
  });

  describe("variants", () => {
    it("applies primary variant class", () => {
      render(<Link href="/" variant="primary">Link</Link>);
      expect(screen.getByRole("link")).toHaveClass("text-primary");
    });

    it("applies muted variant class", () => {
      render(<Link href="/" variant="muted">Link</Link>);
      expect(screen.getByRole("link")).toHaveClass("text-muted");
    });

    it("applies nav variant class", () => {
      render(<Link href="/" variant="nav">Link</Link>);
      expect(screen.getByRole("link")).toHaveClass("capitalize");
    });

    it("applies default variant class when no variant is specified", () => {
      render(<Link href="/">Link</Link>);
      expect(screen.getByRole("link")).toHaveClass("text-foreground");
    });
  });
});
