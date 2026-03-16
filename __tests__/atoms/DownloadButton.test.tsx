import React from "react";
import { render, screen } from "@testing-library/react";
import { DownloadButton } from "@/components/atoms/DownloadButton/DownloadButton";

const CustomIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg aria-hidden="true" data-testid="custom-icon" {...props} />
);

describe("DownloadButton", () => {
  it("renders as a link with the correct href", () => {
    render(<DownloadButton href="/resume.pdf">Download</DownloadButton>);
    const link = screen.getByRole("link", { name: /download/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/resume.pdf");
  });

  it("renders children", () => {
    render(<DownloadButton href="/resume.pdf">Download Resume</DownloadButton>);
    expect(screen.getByText("Download Resume")).toBeInTheDocument();
  });

  it("sets the download attribute to filename when provided", () => {
    render(
      <DownloadButton href="/resume.pdf" filename="my-resume.pdf">
        Download
      </DownloadButton>,
    );
    expect(screen.getByRole("link")).toHaveAttribute("download", "my-resume.pdf");
  });

  it("sets a default download attribute when no filename is provided", () => {
    render(<DownloadButton href="/resume.pdf">Download</DownloadButton>);
    expect(screen.getByRole("link")).toHaveAttribute("download");
  });

  it("opens in a new tab", () => {
    render(<DownloadButton href="/resume.pdf">Download</DownloadButton>);
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link")).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the default Download icon", () => {
    render(<DownloadButton href="/resume.pdf">Download</DownloadButton>);
    const link = screen.getByRole("link");
    expect(link.querySelector("svg")).toBeInTheDocument();
  });

  it("renders a custom iconLeft when provided", () => {
    render(
      <DownloadButton href="/resume.pdf" iconLeft={CustomIcon}>
        Download
      </DownloadButton>,
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("applies additional className", () => {
    render(
      <DownloadButton href="/resume.pdf" className="extra-class">
        Download
      </DownloadButton>,
    );
    expect(screen.getByRole("link")).toHaveClass("extra-class");
  });

  it("renders as disabled when disabled prop is set", () => {
    render(
      <DownloadButton href="/resume.pdf" disabled>
        Download
      </DownloadButton>,
    );
    // disabled link renders as a <span> in Button
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Download")).toBeInTheDocument();
  });
});
