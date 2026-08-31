import React, { useEffect, useRef } from 'react';

/**
 * Selbst gebautes "3D"-Partikel-Monogramm ("SB").
 * Reine Canvas-2D-Projektion, keine 3D-Bibliothek. Tinte auf Papier.
 */
export const PartikelMonogramm: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    interface P { x: number; y: number; z: number; s: number; c: string }
    let punkte: P[] = [];
    let staub: { x: number; y: number; z: number; vx: number; vy: number }[] = [];

    const tinten = ['#221a12', '#3a2c1c', '#bf5227', '#8b7c64', '#b0842d'];

    const punkteAufbauen = () => {
      const off = document.createElement('canvas');
      const S = 300;
      off.width = S;
      off.height = S;
      const octx = off.getContext('2d');
      if (!octx) return;
      octx.fillStyle = '#000';
      octx.textAlign = 'center';
      octx.textBaseline = 'middle';
      octx.font = '700 190px "Fraunces", Georgia, serif';
      octx.fillText('SB', S / 2, S / 2 + 6);

      const img = octx.getImageData(0, 0, S, S).data;
      const step = 4;
      const neu: P[] = [];
      for (let y = 0; y < S; y += step) {
        for (let x = 0; x < S; x += step) {
          if (img[(y * S + x) * 4 + 3] > 128) {
            neu.push({
              x: (x - S / 2) / 2.05,
              y: (y - S / 2) / 2.05,
              z: (Math.random() - 0.5) * 24,
              s: 0.7 + Math.random() * 1.1,
              c: tinten[(Math.random() * tinten.length) | 0],
            });
          }
        }
      }
      punkte = neu;

      staub = Array.from({ length: 40 }, () => ({
        x: (Math.random() - 0.5) * 260,
        y: (Math.random() - 0.5) * 200,
        z: (Math.random() - 0.5) * 200,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    punkteAufbauen();
    resize();
    if (document.fonts?.ready) document.fonts.ready.then(() => punkteAufbauen());

    let raf = 0;
    let t = 0;
    const maus = { x: 0, y: 0, zx: 0, zy: 0 };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      maus.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      maus.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', resize);

    const tick = () => {
      t += reduce ? 0 : 0.004;
      maus.zx += (maus.x - maus.zx) * 0.05;
      maus.zy += (maus.y - maus.zy) * 0.05;

      const cx = width / 2;
      const cy = height / 2;
      const rotY = t + maus.zx * 0.6;
      const rotX = -0.1 + maus.zy * 0.32;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const fov = 430;

      ctx.clearRect(0, 0, width, height);

      for (const d of staub) {
        d.x += d.vx;
        d.y += d.vy;
        if (Math.abs(d.x) > 150) d.vx *= -1;
        if (Math.abs(d.y) > 120) d.vy *= -1;
        let x = d.x * cosY - d.z * sinY;
        let z = d.x * sinY + d.z * cosY;
        const y = d.y * cosX - z * sinX;
        z = d.y * sinX + z * cosX;
        const scale = fov / (fov + z);
        ctx.globalAlpha = 0.14 * scale;
        ctx.fillStyle = '#5b4d3c';
        ctx.beginPath();
        ctx.arc(cx + x * scale, cy + y * scale, 1 * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of punkte) {
        let x = p.x * cosY - p.z * sinY;
        let z = p.x * sinY + p.z * cosY;
        const y = p.y * cosX - z * sinX;
        z = p.y * sinX + z * cosX;
        const scale = fov / (fov + z);
        const depth = (z + 60) / 120;
        ctx.globalAlpha = 0.28 + depth * 0.6;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(cx + x * scale, cy + y * scale, p.s * scale, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} style={{ width: '100%', height: '100%', display: 'block' }} />;
};

export default PartikelMonogramm;
