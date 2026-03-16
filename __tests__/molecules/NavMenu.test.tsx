import React from "react";
import { render, screen } from "@testing-library/react";
import { NavMenu } from "@/components/molecules/NavMenu/NavMenu";

jest.mock("@/i18n/navigation", () => ({
  usePathname: jest.fn(),
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
}));

const { usePathname } = jest.requireMock("@/i18n/navigation");

const items = [
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Connect", href: "/connect" },
];

describe("NavMenu", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/");
  });

  it("renders all nav items", () => {
    render(<NavMenu items={items} />);
    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Resume" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Connect" })).toBeInTheDocument();
  });

  it("renders correct hrefs", () => {
    render(<NavMenu items={items} />);
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute("href", "/resume");
  });

  it("does not mark any item as active when on a different path", () => {
    usePathname.mockReturnValue("/");
    render(<NavMenu items={items} />);
    for (const link of screen.getAllByRole("link")) {
      expect(link).toHaveAttribute("data-active", "false");
    }
  });

  it("marks the matching item as active", () => {
    usePathname.mockReturnValue("/resume");
    render(<NavMenu items={items} />);
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute("data-active", "true");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("data-active", "false");
    expect(screen.getByRole("link", { name: "Connect" })).toHaveAttribute("data-active", "false");
  });

  it("renders inside a <nav> element", () => {
    render(<NavMenu items={items} />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("applies additional className to the nav", () => {
    render(<NavMenu items={items} className="extra-class" />);
    expect(screen.getByRole("navigation")).toHaveClass("extra-class");
  });

  it("renders nothing when items is empty", () => {
    render(<NavMenu items={[]} />);
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });
});
