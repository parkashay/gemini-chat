import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SCRAPING_FLAG } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeScrapingIndicator(text: string) {
  const isScraping = text.includes(SCRAPING_FLAG);
  if (isScraping) {
    return text.replace(/scraping link \d+\/\d+/i, "").replace(SCRAPING_FLAG, "");
  }
  return text;
}
