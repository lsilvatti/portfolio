// Mock for next/link — renders a plain <a> so RTL can assert href, etc.
import React from "react";

const Link = ({
  href,
  children,
  className,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
  <a href={href} className={className} {...rest}>
    {children}
  </a>
);

export default Link;
