import { type ClassValue, clsx } from "clsx/clsx";
import { twMerge } from "tailwind-merge/dist/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
