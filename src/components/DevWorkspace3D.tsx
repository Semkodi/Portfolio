import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { audio } from '../utils/audio';

export interface StageCameraConfig {
  label: string;
  tag: string;
}

export const STAGES: StageCameraConfig[] = [
  {
    label: '01 / FULLSTACK WORKSPACE',
    tag: 'OVERVIEW_CORE',
  },
  {
    label: '02 / REACT 19 & TYPESCRIPT',
    tag: 'FRONTEND_ENGINE',
  },
  {
    label: '03 / JAVA 21 & SPRING BOOT 3',
    tag: 'BACKEND_CLUSTER',
  },
  {
    label: '04 / SIMPLY-SWITCH PROJEKT',
    tag: 'PRODUCTION_RELEASE',
  },
  {
    label: '05 / RUNTIME TERMINAL',
    tag: 'DEV_WORKSPACE',
  },
];

interface DevWorkspace3DProps {
  aktiveStufe: number;
  onHoverNode?: (info: string | null) => void;
}

/** Hilfsfunktion: Erstellt ein Canvas-Code-Fenster als Textur */
function erstelleCodeTextur(
  dateiname: string,
  spracheTag: string,
  codeZeilen: { text: string; farbe?: string }[]
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 680;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Hintergrund
  ctx.fillStyle = '#161311';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Äußerer Rahmen
  ctx.strokeStyle = 'rgba(212, 163, 115, 0.4)';
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

  // Titelleiste
  ctx.fillStyle = '#221d1a';
  ctx.fillRect(0, 0, canvas.width, 68);

  ctx.strokeStyle = 'rgba(212, 163, 115, 0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 68);
  ctx.lineTo(canvas.width, 68);
  ctx.stroke();

  // Mac-Style Dots
  const dotFarben = ['#ff5f56', '#ffbd2e', '#27c93f'];
  dotFarben.forEach((farbe, i) => {
    ctx.beginPath();
    ctx.arc(36 + i * 26, 34, 7, 0, Math.PI * 2);
    ctx.fillStyle = farbe;
    ctx.fill();
  });

  // Dateiname
  ctx.fillStyle = '#f5ebe0';
  ctx.font = 'bold 22px monospace';
  ctx.fillText(dateiname, 130, 42);

  // Tag
  ctx.fillStyle = '#ff9a3c';
  ctx.font = 'bold 18px monospace';
  ctx.textAlign = 'right';
  ctx.fillText(`[${spracheTag}]`, canvas.width - 32, 42);
  ctx.textAlign = 'left';

  // Code Zeilen
  const startY = 120;
  const zeilenHoehe = 34;

  codeZeilen.forEach((zeile, idx) => {
    const y = startY + idx * zeilenHoehe;

    ctx.fillStyle = 'rgba(212, 163, 115, 0.45)';
    ctx.font = '20px monospace';
    ctx.fillText(String(idx + 1).padStart(2, '0'), 32, y);

    ctx.fillStyle = zeile.farbe || '#e3d5ca';
    ctx.font = '22px monospace';
    ctx.fillText(zeile.text, 88, y);
  });

  // Cursor
  ctx.fillStyle = '#ff9a3c';
  ctx.fillRect(88, startY + codeZeilen.length * zeilenHoehe - 4, 14, 26);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

export const DevWorkspace3D: React.FC<DevWorkspace3DProps> = ({ aktiveStufe, onHoverNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Drehung des Karussells
  const currentRotationY = useRef<number>(0);
  const targetRotationY = useRef<number>(0);

  const mousePos = useRef({ x: 0, y: 0 });
  const mouseParallax = useRef({ x: 0, y: 0 });

  // Drag-Drehung mit der Maus
  const isDragging = useRef<boolean>(false);
  const previousPointerX = useRef<number>(0);

  const carouselGroupRef = useRef<THREE.Group | null>(null);
  const cardMeshes = useRef<THREE.Mesh[]>([]);

  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  // Stufen-Wechsel rotiert das Karussell um exakt 1/5 Kreis (72 Grad = (2 * PI) / 5)
  useEffect(() => {
    const winkelSchritt = (Math.PI * 2) / 5;
    targetRotationY.current = -aktiveStufe * winkelSchritt;
    audio.spieleWhoosh();
  }, [aktiveStufe]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    previousPointerX.current = e.clientX;
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const onPointerMove = useCallback((e: PointerEvent) => {
    const { innerWidth, innerHeight } = window;
    mousePos.current.x = (e.clientX / innerWidth) * 2 - 1;
    mousePos.current.y = -(e.clientY / innerHeight) * 2 + 1;

    if (isDragging.current) {
      const deltaX = e.clientX - previousPointerX.current;
      targetRotationY.current += deltaX * 0.005;
      previousPointerX.current = e.clientX;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x161311, 0.045);

    // 2. Camera: Positioniert so, dass die rechte Seite fokussiert ist und die linke Textspalte frei bleibt
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      80
    );
    // Kamera leicht nach rechts versetzt, damit der 3D-Mittelpunkt im rechten Viewport-Bereich liegt
    camera.position.set(0, 1.2, 9.2);
    camera.lookAt(0, 0, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xd4a373, 0.95);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff3e6, 2.2);
    keyLight.position.set(8, 14, 12);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff9a3c, 2.0);
    rimLight.position.set(-10, 6, -8);
    scene.add(rimLight);

    // 5. Zentraler 3D-Karussell-Hub (leicht rechts im Desktop-View verankert)
    const carouselGroup = new THREE.Group();
    // Verschiebung des Karussells nach rechts (im Screen-Space)
    const isMobile = window.innerWidth < 1024;
    carouselGroup.position.set(isMobile ? 0 : 2.4, 0, 0);
    scene.add(carouselGroup);
    carouselGroupRef.current = carouselGroup;

    // Zentraler leuchtender Hologramm-Kern
    const coreColumnGeo = new THREE.CylinderGeometry(0.35, 0.45, 3.8, 16);
    const coreColumnMat = new THREE.MeshStandardMaterial({
      color: 0x221d1a,
      roughness: 0.2,
      metalness: 0.9,
    });
    const coreColumn = new THREE.Mesh(coreColumnGeo, coreColumnMat);
    coreColumn.position.y = 0;
    carouselGroup.add(coreColumn);

    const coreLight = new THREE.PointLight(0xff9a3c, 4.0, 10, 1.6);
    coreLight.position.set(0, 0.2, 0);
    carouselGroup.add(coreLight);

    // Orbit-Ringe um das Karussell
    const ringGeo = new THREE.TorusGeometry(3.6, 0.02, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xd4a373 });
    const orbitRing = new THREE.Mesh(ringGeo, ringMat);
    orbitRing.rotation.x = Math.PI / 2;
    carouselGroup.add(orbitRing);

    // 6. Die 5 echten Code-Fenster auf dem Orbit (Radius = 3.4)
    const radius = 3.5;
    const kartenDaten = [
      // 0: Fullstack Monolith
      {
        titel: 'ArchitectureEngine.ts',
        tag: 'FULLSTACK_CORE',
        code: [
          { text: "import { createSystem } from '@core';", farbe: '#ff9a3c' },
          { text: 'export const FullstackEngine = {', farbe: '#f5ebe0' },
          { text: '  frontend: "React 19 + TypeScript",', farbe: '#8abeb7' },
          { text: '  backend:  "Java 21 + Spring Boot",', farbe: '#ffb066' },
          { text: '  database: "PostgreSQL (SQL / ACID)",', farbe: '#d4a373' },
          { text: '  styling:  "Tailwind CSS + UI",', farbe: '#8abeb7' },
          { text: '  status:   "READY // JUNIOR ENGR",', farbe: '#27c93f' },
          { text: '};', farbe: '#f5ebe0' },
        ],
      },
      // 1: React 19 / TS
      {
        titel: 'TarifRechner.tsx',
        tag: 'REACT_19 / TS',
        code: [
          { text: "import { useState, useMemo } from 'react';", farbe: '#ff9a3c' },
          { text: "import { motion } from 'framer-motion';", farbe: '#ff9a3c' },
          { text: 'export const TarifRechner = () => {', farbe: '#f5ebe0' },
          { text: '  const [lead, setLead] = useState(init);', farbe: '#d4a373' },
          { text: '  // 60 FPS Interactive State Engine', farbe: '#757f86' },
          { text: '  const calc = useMemo(() => {', farbe: '#f5ebe0' },
          { text: '    return runFunnel(lead);', farbe: '#ffb066' },
          { text: '  }, [lead]);', farbe: '#f5ebe0' },
          { text: '  return <WizardView state={calc} />;', farbe: '#8abeb7' },
          { text: '};', farbe: '#f5ebe0' },
        ],
      },
      // 2: Java 21 / Spring Boot
      {
        titel: 'VersicherungsService.java',
        tag: 'JAVA_21 / SPRING_3',
        code: [
          { text: '@Service', farbe: '#ff9a3c' },
          { text: '@Transactional(readOnly = true)', farbe: '#ff9a3c' },
          { text: 'public class VersicherungsService {', farbe: '#f5ebe0' },
          { text: '  private final TarifRepo repository;', farbe: '#d4a373' },
          { text: '  public TarifDto berechne(KundeDto k) {', farbe: '#f5ebe0' },
          { text: '    var entity = repository.findById(k.id())', farbe: '#ffb066' },
          { text: '      .orElseThrow(NotFoundException::new);', farbe: '#ffb066' },
          { text: '    return mapper.toDto(entity);', farbe: '#8abeb7' },
          { text: '  }', farbe: '#f5ebe0' },
          { text: '}', farbe: '#f5ebe0' },
        ],
      },
      // 3: simply-switch Case Study
      {
        titel: 'SimplySwitchProduction.ts',
        tag: 'COMMERCIAL_APP',
        code: [
          { text: '// Lead-Funnel & Makler-Plattform', farbe: '#757f86' },
          { text: 'export const SimplySwitch = {', farbe: '#f5ebe0' },
          { text: '  url: "https://simply-switch.de",', farbe: '#ff9a3c' },
          { text: '  funnel: "Multi-Step Wizard",', farbe: '#8abeb7' },
          { text: '  conversionRate: "+34.8% Opt.",', farbe: '#27c93f' },
          { text: '  architecture: "Component-Driven",', farbe: '#d4a373' },
          { text: '  delivery: "Shipped & Live",', farbe: '#27c93f' },
          { text: '};', farbe: '#f5ebe0' },
        ],
      },
      // 4: Terminal Runtime
      {
        titel: 'Terminal ~ dev-env',
        tag: 'GIT / CLI / RUNTIME',
        code: [
          { text: '$ git status --short', farbe: '#ff9a3c' },
          { text: '✔ Working tree clean (branch: main)', farbe: '#27c93f' },
          { text: '$ npm run build', farbe: '#ff9a3c' },
          { text: '✔ Vite bundle ready [0 errors]', farbe: '#27c93f' },
          { text: '$ psql -U semir -d isyplus', farbe: '#ff9a3c' },
          { text: 'isyplus=# SELECT version(); -- PostgreSQL', farbe: '#8abeb7' },
          { text: 'Ready for Junior Fullstack role // 2026', farbe: '#ffb066' },
        ],
      },
    ];

    // 3D-Körper-Geometrie für echte Tiefe (Box mit Dicke!)
    const panelBoxGeo = new THREE.BoxGeometry(3.3, 2.2, 0.1);
    const boxEdgesGeo = new THREE.EdgesGeometry(panelBoxGeo);
    const boxEdgeMat = new THREE.LineBasicMaterial({ color: 0xd4a373 });

    kartenDaten.forEach((daten, idx) => {
      const winkel = (idx * Math.PI * 2) / 5;
      const x = Math.sin(winkel) * radius;
      const z = Math.cos(winkel) * radius;

      const textur = erstelleCodeTextur(daten.titel, daten.tag, daten.code);

      // Vorderseite mit Code-Textur, Rückseite dunkel metallic
      const materialien = [
        new THREE.MeshStandardMaterial({ color: 0x1a1513, roughness: 0.3 }), // rechts
        new THREE.MeshStandardMaterial({ color: 0x1a1513, roughness: 0.3 }), // links
        new THREE.MeshStandardMaterial({ color: 0x1a1513, roughness: 0.3 }), // oben
        new THREE.MeshStandardMaterial({ color: 0x1a1513, roughness: 0.3 }), // unten
        new THREE.MeshStandardMaterial({ map: textur, roughness: 0.25 }), // vorne (Code!)
        new THREE.MeshStandardMaterial({ color: 0x130f0d, roughness: 0.4 }), // hinten
      ];

      const panelMesh = new THREE.Mesh(panelBoxGeo, materialien);
      panelMesh.position.set(x, 0, z);

      // Jedes Fenster schaut exakt nach außen vom Mittelpunkt weg
      panelMesh.rotation.y = winkel;

      // Leuchtende Kanten für echten 3D-Look
      const edgeLines = new THREE.LineSegments(boxEdgesGeo, boxEdgeMat);
      panelMesh.add(edgeLines);

      panelMesh.name = daten.titel;
      panelMesh.userData = {
        index: idx,
        info: `${daten.titel} • [${daten.tag}]`,
      };

      carouselGroup.add(panelMesh);
      cardMeshes.current.push(panelMesh);
    });

    // 7. Boden-Gitter
    const groundGrid = new THREE.GridHelper(26, 30, 0xd4a373, 0x221a16);
    groundGrid.position.set(isMobile ? 0 : 2.4, -2.4, 0);
    scene.add(groundGrid);

    // 8. Schwebende Code-Partikel
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      posArray[p] = (Math.random() - 0.2) * 12 + (isMobile ? 0 : 2.4);
      posArray[p + 1] = (Math.random() - 0.5) * 8;
      posArray[p + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffb066,
      size: 0.05,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 9. Raycasting für Hover-Erkennung
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    // 10. Animation Loop
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = (performance.now() - startTime) * 0.001;

      // Flüssige 3D-Karussell-Drehung zur Ziel-Rotation (Smooth Interpolation)
      currentRotationY.current += (targetRotationY.current - currentRotationY.current) * 0.05;
      carouselGroup.rotation.y = currentRotationY.current;

      // Sanftes 3D-Atmen / Neigung des Karussells
      carouselGroup.position.y = Math.sin(time * 0.9) * 0.08;
      carouselGroup.rotation.x = Math.sin(time * 0.6) * 0.03 + mouseParallax.current.y * 0.15;
      carouselGroup.rotation.z = Math.cos(time * 0.7) * 0.02 - mouseParallax.current.x * 0.15;

      // Parallax-Interpolation
      mouseParallax.current.x += (mousePos.current.x * 0.45 - mouseParallax.current.x) * 0.05;
      mouseParallax.current.y += (mousePos.current.y * 0.35 - mouseParallax.current.y) * 0.05;

      // Hervorhebung der vorderen Karte (Scale Boost für echtes 3D-Gefühl)
      cardMeshes.current.forEach((mesh, i) => {
        // Welt-Z-Position berechnen
        const worldPos = new THREE.Vector3();
        mesh.getWorldPosition(worldPos);

        // Je weiter vorne (näher an der Kamera), desto größer und heller
        const distZ = worldPos.z;
        if (distZ > 2.0) {
          mesh.scale.set(1.06, 1.06, 1.06);
        } else {
          mesh.scale.set(0.95, 0.95, 0.95);
        }
      });

      // Raycasting
      mouseVector.set(mousePos.current.x, mousePos.current.y);
      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(cardMeshes.current, false);

      if (intersects.length > 0) {
        const topMesh = intersects[0].object as THREE.Mesh;
        const info = topMesh.userData?.info || topMesh.name;
        setHoverLabel(info);
        onHoverNode?.(info);
      } else {
        setHoverLabel(null);
        onHoverNode?.(null);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);

      const mobileNow = window.innerWidth < 1024;
      carouselGroup.position.set(mobileNow ? 0 : 2.4, 0, 0);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', onPointerMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onPointerMove);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onPointerMove, onHoverNode]);

  return (
    <div
      className="relative h-full w-full max-w-full overflow-hidden select-none"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div
        ref={containerRef}
        className="h-full w-full cursor-grab active:cursor-grabbing"
      />

      {/* Floating 3D Interaction Hint */}
      <div className="pointer-events-none absolute bottom-8 right-4 sm:right-12 z-20 hidden sm:flex items-center gap-3">
        {hoverLabel ? (
          <div className="rounded border border-signal/70 bg-raum/90 px-4 py-2 font-mono-code text-[12px] tracking-wide text-signal shadow-[0_0_24px_rgba(255,154,60,0.35)] backdrop-blur-md">
            <span className="mr-2 inline-block h-2 w-2 animate-ping rounded-full bg-signal" />
            <span className="font-semibold text-text">{hoverLabel}</span>
          </div>
        ) : (
          <div className="rounded border border-linie bg-raum-2/80 px-3.5 py-1.5 font-mono-code text-[11px] text-text-3">
            [3D ORBIT // DREHEN PER SCROLL ODER MAUS-DRAG]
          </div>
        )}
      </div>
    </div>
  );
};
