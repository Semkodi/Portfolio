import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

/**
 * PhysikHintergrund - Eine interaktive Hintergrund-Komponente mit Matter.js.
 * Erzeugt schwebende Partikel, die auf physikalische Gesetze, Mausinteraktionen
 * und echte UI-Elemente (als Hindernisse) reagieren.
 */
const PhysikHintergrund: React.FC = () => {
    const leinwandReferenz = useRef<HTMLDivElement>(null);
    const engineReferenz = useRef<Matter.Engine>(Matter.Engine.create());
    const hindernisKörperReferenz = useRef<Map<Element, Matter.Body>>(new Map());

    useEffect(() => {
        if (!leinwandReferenz.current) return;

        const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;
        const leinwand = leinwandReferenz.current;
        let breite = window.innerWidth;
        let hoehe = window.innerHeight;

        const engine = engineReferenz.current;
        engine.gravity.y = 0.5; // Leichte Erdanziehung

        const renderer = Render.create({
            element: leinwand,
            engine: engine,
            options: {
                width: breite,
                height: hoehe,
                wireframes: false,
                background: 'transparent',
            }
        });

        // Weltgrenzen initialisieren
        let boden = Bodies.rectangle(breite / 2, hoehe + 50, breite, 100, { isStatic: true });
        let links = Bodies.rectangle(-50, hoehe / 2, 100, hoehe, { isStatic: true });
        let rechts = Bodies.rectangle(breite + 50, hoehe / 2, 100, hoehe, { isStatic: true });
        let decke = Bodies.rectangle(breite / 2, -50, breite, 100, { isStatic: true });

        // Partikel generieren (etwas mehr für besseren Effekt)
        const partikel = Array.from({ length: 820 }).map(() => {
            const radius = Math.random() * 12 + 6;
            return Bodies.circle(
                Math.random() * breite,
                -Math.random() * 500, // Von oben einfallen lassen
                radius,
                {
                    restitution: 0.6,
                    friction: 0.1,
                    render: {
                        fillStyle: 'rgba(99, 102, 241, 0.15)',
                        strokeStyle: 'rgba(99, 102, 241, 0.3)',
                        lineWidth: 1
                    }
                }
            );
        });

        const maus = Mouse.create(renderer.canvas);
        const mausBeschraenkung = MouseConstraint.create(engine, {
            mouse: maus,
            constraint: {
                stiffness: 0.1,
                render: { visible: false }
            }
        });

        Composite.add(engine.world, [boden, links, rechts, decke, ...partikel, mausBeschraenkung]);

        /**
         * Scannt das DOM nach interaktiven Elementen und erstellt physikalische Hindernisse.
         */
        const synchronisiereHindernisse = () => {
            const hindernisElemente = document.querySelectorAll('.btn, .glass, button, .spotlight-karte, .hindernis');
            const aktuelleKörper = new Map<Element, Matter.Body>();

            hindernisElemente.forEach((el) => {
                const rect = el.getBoundingClientRect();

                // Nur Hindernisse im Viewport (plus Puffer) hinzufügen
                if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

                let körper = hindernisKörperReferenz.current.get(el);

                if (!körper) {
                    körper = Bodies.rectangle(
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2,
                        rect.width,
                        rect.height,
                        {
                            isStatic: true,
                            friction: 0.5,
                            render: { visible: false } // Hindernisse unsichtbar machen
                        }
                    );
                    Composite.add(engine.world, körper);
                } else {
                    // Position und Größe anpassen falls sich das Element bewegt hat (z.B. Scrollen)
                    Matter.Body.setPosition(körper, {
                        x: rect.left + rect.width / 2,
                        y: rect.top + rect.height / 2
                    });
                }
                aktuelleKörper.set(el, körper);
            });

            // Alte Körper entfernen die nicht mehr existieren oder sichtbar sind
            for (const [el, körper] of hindernisKörperReferenz.current.entries()) {
                if (!aktuelleKörper.has(el)) {
                    Composite.remove(engine.world, körper);
                }
            }
            hindernisKörperReferenz.current = aktuelleKörper;
        };

        const eventOptionen: AddEventListenerOptions = { passive: true };
        window.addEventListener('scroll', synchronisiereHindernisse, eventOptionen);
        window.addEventListener('resize', () => {
            breite = window.innerWidth;
            hoehe = window.innerHeight;
            renderer.canvas.width = breite;
            renderer.canvas.height = hoehe;
            Matter.Body.setPosition(boden, { x: breite / 2, y: hoehe + 50 });
            Matter.Body.setPosition(rechts, { x: breite + 50, y: hoehe / 2 });
            synchronisiereHindernisse();
        }, eventOptionen);

        Render.run(renderer);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Initiale Synchronisierung
        setTimeout(synchronisiereHindernisse, 500);

        return () => {
            window.removeEventListener('scroll', synchronisiereHindernisse);
            Render.stop(renderer);
            Runner.stop(runner);
            Engine.clear(engine);
            renderer.canvas.remove();
        };
    }, []);

    return (
        <div
            ref={leinwandReferenz}
            className="fixed inset-0 -z-20 pointer-events-none opacity-40"
            aria-hidden="true"
        />
    );
};

export default PhysikHintergrund;
