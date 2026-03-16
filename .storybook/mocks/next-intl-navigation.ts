import React from 'react';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children?: ReactNode;
};

const mockRouter = {
  push: () => {},
  back: () => {},
  replace: () => {},
  forward: () => {},
  refresh: () => {},
  prefetch: () => {},
};

const MockLink = ({ href, children, ...props }: LinkProps) =>
  React.createElement('a', { href, ...props }, children);

// Used by i18n/navigation.ts: const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
export const createNavigation = (_routing: unknown) => ({
  Link: MockLink,
  usePathname: () => '/',
  useRouter: () => mockRouter,
  redirect: () => {},
  permanentRedirect: () => {},
});

// Direct exports (in case anything imports hooks directly from next-intl/navigation)
export const usePathname = () => '/';
export const useRouter = () => mockRouter;
export const Link = MockLink;
export const redirect = () => {};
export const permanentRedirect = () => {};
