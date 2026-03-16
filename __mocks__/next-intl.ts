import React from "react";

export const useTranslations = jest.fn(() => (key: string) => key);
export const useLocale = jest.fn(() => "en");
export const useFormatter = jest.fn();
export const useNow = jest.fn();
export const useTimeZone = jest.fn();
export const useMessages = jest.fn();
export const NextIntlClientProvider = ({ children }: { children: React.ReactNode }) =>
  React.createElement(React.Fragment, null, children);
export const getTranslations = jest.fn(async () => (key: string) => key);
export const setRequestLocale = jest.fn();
