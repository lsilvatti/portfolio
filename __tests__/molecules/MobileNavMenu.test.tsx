import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileNavMenu } from "@/components/molecules/MobileNavMenu/MobileNavMenu";

jest.mock("@/i18n/navigation", () => ({
  usePathname: jest.fn(),
  Link: ({
    href,
    children,
    className,
    onClick,
    ...rest
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  ),
}));

// createPortal renders directly into the DOM in tests
jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (node: React.ReactNode) => node,
}));

const { usePathname } = jest.requireMock("@/i18n/navigation");

const items = [
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Connect", href: "/connect" },
];

describe("MobileNavMenu", () => {
  beforeEach(() => {
    usePathname.mockReturnValue("/");
  });

  it("renders the toggle button", () => {
    render(<MobileNavMenu items={items} />);
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("opens the menu when the toggle button is clicked", async () => {
    render(<MobileNavMenu items={items} />);
    await userEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("button", { name: /close menu/i })).toBeInTheDocument();
  });

  it("renders all nav items after opening", async () => {
    render(<MobileNavMenu items={items} />);
    await userEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Resume" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Connect" })).toBeInTheDocument();
  });

  it("closes the menu when Escape is pressed", async () => {
    render(<MobileNavMenu items={items} />);
    await userEvent.click(screen.getByRole("button", { name: /open menu/i }));
    await userEvent.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("closes the menu when a nav link is clicked", async () => {
    render(<MobileNavMenu items={items} />);
    await userEvent.click(screen.getByRole("button", { name: /open menu/i }));
    await userEvent.click(screen.getByRole("link", { name: "Resume" }));
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("applies active styles to the current route link", async () => {
    usePathname.mockReturnValue("/resume");
    render(<MobileNavMenu items={items} />);
    await userEvent.click(screen.getByRole("button", { name: /open menu/i }));
    const activeLink = screen.getByRole("link", { name: "Resume" });
    expect(activeLink).toHaveClass("text-secondary");
    const inactiveLink = screen.getByRole("link", { name: "Projects" });
    expect(inactiveLink).not.toHaveClass("text-secondary");
  });

  it("does not apply active styles when no route matches", async () => {
    usePathname.mockReturnValue("/");
    render(<MobileNavMenu items={items} />);
    await userEvent.click(screen.getByRole("button", { name: /open menu/i }));
    for (const link of screen.getAllByRole("link")) {
      expect(link).not.toHaveClass("text-secondary");
    }
  });
});
