import { AppLocales } from "types";

export const DEFAULT_LOCALE = "pt";

export const getSerializedLocale = (locale: string): AppLocales => {
  if (locale.includes("pt")) {
    return "pt";
  }
  if (locale.includes("tl")) {
    return "tl";
  }
  return "en";
};
