import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a price as a clean currency string. */
export function formatCurrency(value: number, currency: string = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Add a UTM-friendly query string. */
export function withParams(url: string, params: Record<string, string>) {
  const u = new URL(url, "https://placeholder.local");
  Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
  return url.startsWith("http") ? u.toString() : `${u.pathname}${u.search}`;
}
