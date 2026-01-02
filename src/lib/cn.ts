import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Basically the same as shadcn's cn function. Extends the default behavior of
// clsx and de-dupes tailwind classnames
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
