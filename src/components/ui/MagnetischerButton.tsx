"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/components/lib/utils";

/**
 * Eigenschaften für den interaktiven Magnetischen Button.
 */interface MagnetischerButtonProps {
    /** Button-Inhalt oder Label */
    children: React.ReactNode;
    /** Link-URL, falls der Button als Link agieren soll */
    href?: string;
    /** Wie stark der Button den Mauszeiger anzieht (0–1, Standard: 0.4) */
    staerke?: number;
    /** Pixel-Radius, in dem der Magnetismus aktiviert wird */
    radius?: number;
    /** Visuelle Design-Variante des Buttons */
    variante?: "primary" | "outline" | "ghost" | "dark";
    /** Größe des Buttons */
    groesse?: "sm" | "md" | "lg";
    /** Klick-Ereignishandler */
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    /** Zusätzliche CSS-Klassen */
    klasse?: string;
    /** Barrierefreie Beschreibung */
    ariaLabel?: string;
}

/**
 * MagnetischerButton - Zieht sich elastisch in Richtung des Mauszeigers,
 * wenn dieser in seinen Wirkungsradius tritt. Erzeugt einen hochwertigen Micro-Interaktions-Effekt.
 */
export const MagnetischerButton: React.FC<MagnetischerButtonProps> = ({
    children,
    href,
    staerke = 0.4,
    radius = 80,
    variante = "primary",
    groesse = "md",
    onClick,
    klasse = "",
    ariaLabel
}) => {
    const buttonRef = useRef<HTMLDivElement>(null);
    const [istHovered, setIstHovered] = useState(false);

    // Snappy aber elastische Feder-Konfiguration
    const federKonfiguration = { stiffness: 200, damping: 18, mass: 0.6 };

    const rawX = useSpring(0, federKonfiguration);
    const rawY = useSpring(0, federKonfiguration);

    // Der innere Text bewegt sich etwas weniger als der Button selbst (Parallax-Effekt)
    const textX = useTransform(rawX, (v) => v * 0.45);
    const textY = useTransform(rawY, (v) => v * 0.45);

    const behandleMausBewegung = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = buttonRef.current?.getBoundingClientRect();
        if (!rect) return;

        const zentrumX = rect.left + rect.width / 2;
        const zentrumY = rect.top + rect.height / 2;

        const abstandX = e.clientX - zentrumX;
        const abstandY = e.clientY - zentrumY;
        const abstand = Math.sqrt(abstandX ** 2 + abstandY ** 2);

        if (abstand < radius) {
            rawX.set(abstandX * staerke);
            rawY.set(abstandY * staerke);
            setIstHovered(true);
        } else {
            rawX.set(0);
            rawY.set(0);
            setIstHovered(false);
        }
    };

    const behandleMausVerlassen = () => {
        rawX.set(0);
        rawY.set(0);
        setIstHovered(false);
    };

    // Design-Varianten im Neon-Logo-Look
    const varianten = {
        primary:
            "bg-primary text-black hover:bg-white shadow-lg shadow-primary/15 hover:shadow-primary/35 transition-shadow duration-300",
        outline:
            "border border-primary/20 bg-zinc-950/40 text-primary hover:border-primary hover:bg-white/5",
        ghost:
            "text-muted hover:text-white hover:bg-white/5",
        dark:
            "bg-zinc-900 border border-zinc-800 text-muted hover:text-white shadow-lg",
    };

    // Größenabstufungen
    const groessen = {
        sm: "h-9 px-5 text-xs rounded-xl",
        md: "h-12 px-8 text-sm rounded-2xl",
        lg: "h-14 px-12 text-base rounded-2xl",
    };

    const inhalt = (
        <>
            {/* Feines inneres Glühen bei Hover */}
            <motion.span
                animate={{ opacity: istHovered ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none absolute inset-0 bg-white/5"
            />

            {/* Text mit Parallax-Verschiebung */}
            <motion.span
                style={{ x: textX, y: textY }}
                className="relative z-10 flex items-center justify-center gap-2"
            >
                {children}
            </motion.span>
        </>
    );

    const gemeinsameKlassen = cn(
        "relative inline-flex items-center justify-center font-extrabold tracking-wider uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 overflow-hidden cursor-pointer",
        varianten[variante],
        groessen[groesse],
        klasse
    );

    return (
        <div
            ref={buttonRef}
            onMouseMove={behandleMausBewegung}
            onMouseLeave={behandleMausVerlassen}
            style={{ display: "inline-flex", padding: radius * 0.15 }}
            className="select-none touch-none"
        >
            {href ? (
                <motion.a
                    href={href}
                    onClick={(e) => onClick?.(e)}
                    style={{ x: rawX, y: rawY }}
                    animate={{ scale: istHovered ? 1.04 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    aria-label={ariaLabel}
                    className={gemeinsameKlassen}
                >
                    {inhalt}
                </motion.a>
            ) : (
                <motion.button
                    type="button"
                    onClick={(e) => onClick?.(e)}
                    style={{ x: rawX, y: rawY }}
                    animate={{ scale: istHovered ? 1.04 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    aria-label={ariaLabel}
                    className={gemeinsameKlassen}
                >
                    {inhalt}
                </motion.button>
            )}
        </div>
    );
};

export default MagnetischerButton;

