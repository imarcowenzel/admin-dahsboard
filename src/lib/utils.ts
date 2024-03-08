import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const currencyformatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const percentageFormatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 0, // Defina o número máximo de casas decimais desejado
});