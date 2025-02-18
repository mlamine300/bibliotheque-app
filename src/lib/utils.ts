import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getInitials: (name: string) => string = (name) => {
  return name
    .split(" ")
    .reduce((p, n) => p + n.at(0)?.toUpperCase(), "")
    .slice(0, 2);
};
