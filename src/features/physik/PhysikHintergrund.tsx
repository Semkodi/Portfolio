import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

/**
 * PhysikHintergrund - Eine interaktive Hintergrund-Komponente mit Matter.js.
 * Erzeugt schwebende Partikel, die auf physikalische Gesetze und Mausinteraktionen reagieren.
 */
const PhysikHintergrund: React.FC = () => {
    const leinwandReferenz = useRef<HTMLDivElement>(null);
    const engineReferenz = useRef<Matter.Engine>(Matter.Engine.create());

    useEffect(() => {
        if (!leinwandReferenz.current) return;

        const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;
        const leinwand = leinwandReferenz.current;
        const breite = window.innerWidth;
        const hoehe = window.innerHeight;

        // Initialisierung des Matter.js Renderers
        const renderer = Render.create({
            element: leinwand,
            engine: engineReferenz.current,
            options: {
                width: breite,
                height: hoehe,
                wireframes: false,
                background: 'transparent',
            }
        });

        // Erstellung der unsichtbaren Weltgrenzen
        const boden = Bodies.rectangle(breite / 2, hoehe + 50, breite, 100, { isStatic: true });
        const links = Bodies.rectangle(-50, hoehe / 2, 100, hoehe, { isStatic: true });
        const rechts = Bodies.rectangle(breite + 50, hoehe / 2, 100, hoehe, { isStatic: true });
        const decke = Bodies.rectangle(breite / 2, -50, breite, 100, { isStatic: true });

        // Generierung interaktiver Partikel (Kreise)
        const partikel = Array.from({ length: 15 }).map(() => {
            const radius = Math.random() * 20 + 10;
            return Bodies.circle(
                Math.random() * breite,
                Math.random() * hoehe,
                radius,
                {
                    restitution: 0.8, // Elastizität für Abprall-Effekt
                    friction: 0.05,
                    render: {
                        fillStyle: 'rgba(99, 102, 241, 0.1)', // Indigo mit niedriger Deckkraft
                        strokeStyle: 'rgba(99, 102, 241, 0.2)',
                        lineWidth: 1
                    }
                }
            );
        });

        // Integration der Maus-Interaktion in die Physik-Welt
        const maus = Mouse.create(renderer.canvas);
        const mausBeschraenkung = MouseConstraint.create(engineReferenz.current, {
            mouse: maus,
            constraint: {
                stiffness: 0.2, // Weichheit der Anziehung
                render: { visible: false }
            }
        });

        // Hinzufügen aller Objekte zur Simulation
        Composite.add(engineReferenz.current.world, [boden, links, rechts, decke, ...partikel, mausBeschraenkung]);

        // Start der Physik-Loop und des Renderers
        Render.run(renderer);
        const runner = Runner.create();
        Runner.run(runner, engineReferenz.current);

        // Sauberes Entfernen der Instanzen beim Unmount
        return () => {
            Render.stop(renderer);
            Runner.stop(runner);
            Engine.clear(engineReferenz.current);
            renderer.canvas.remove();
        };
    }, []);

    return (
        <div
            ref={leinwandReferenz}
            className="fixed inset-0 -z-20 pointer-events-none opacity-50"
            aria-hidden="true" // Rein dekoratives Element, für Screenreader ausblenden
        />
    );
};

export default PhysikHintergrund;
