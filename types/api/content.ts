import { LocaleProps } from "types/locales";

export interface ContentResponse extends LocaleProps {
  tags: string[];
  _id: string;
  thumbnail: string;
  title: string;
}
