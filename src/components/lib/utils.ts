import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Hilfsfunktion zum Zusammenführen von Tailwind-Klassen.
 * Kombiniert clsx und tailwind-merge für eine konfliktfreie CSS-Klassenauflösung.
 */
export function cn(...eingaben: ClassValue[]) {
    return twMerge(clsx(eingaben));
}
