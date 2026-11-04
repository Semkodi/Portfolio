import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { audio } from '../utils/audio';

export interface StageCameraConfig {
  pos: [number, number, number];
  target: [number, number, number];
  label: string;
  tag: string;
}

export const STAGES: StageCameraConfig[] = [
  {
    pos: [7.8, 6.5, 8.8],
    target: [0, 1.6, 0],
    label: '01 / SYSTEM-KERN',
    tag: 'FULLSTACK_CORE',
  },
  {
    pos: [3.2, 5.2, 3.8],
    target: [0, 3.2, 0.2],
    label: '02 / FRONTEND & INTERAKTION',
    tag: 'UI_PHYSICS_ENGINE',
  },
  {
    pos: [-6.4, 3.6, 5.2],
    target: [0, 1.8, 0],
    label: '03 / ENTERPRISE BACKEND & APIS',
    tag: 'SPRING_BOOT_CLUSTER',
  },
  {
    pos: [4.6, 2.4, -4.2],
    target: [0, 1.1, 0],
    label: '04 / CASE STUDY: SIMPLY SWITCH',
    tag: 'WIZARD_FUNNEL_ENGINE',
  },
  {
    pos: [7.2, 5.8, 6.4],
    target: [-1.4, 1.6, 0],
    label: '05 / TERMINAL & INSPEKTION',
    tag: 'DEV_RUNTIME_READY',
  },
];

interface SystemCore3DProps {
  aktiveStufe: number;
  onHoverNode?: (nodeInfo: string | null) => void;
}

export const SystemCore3D: React.FC<SystemCore3DProps> = ({ aktiveStufe, onHoverNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  const currentCamPos = useRef(new THREE.Vector3(...STAGES[0].pos));
  const currentCamTarget = useRef(new THREE.Vector3(...STAGES[0].target));
  const targetCamPos = useRef(new THREE.Vector3(...STAGES[0].pos));
  const targetCamTarget = useRef(new THREE.Vector3(...STAGES[0].target));

  const mousePos = useRef({ x: 0, y: 0 });
  const mouseParallax = useRef({ x: 0, y: 0 });

  const interactiveMeshes = useRef<THREE.Mesh[]>([]);
  const hoveredMesh = useRef<THREE.Mesh | null>(null);

  const [hoverLabel, setHoverLabel] = useState<string | null>(null);

  // Update target camera based on active stage
  useEffect(() => {
    const stage = STAGES[aktiveStufe] || STAGES[0];
    targetCamPos.current.set(...stage.pos);
    targetCamTarget.current.set(...stage.target);
    audio.spieleWhoosh();
  }, [aktiveStufe]);

  // Pointer move handler for parallax and raycasting
  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      mousePos.current.x = (e.clientX / innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / innerHeight) * 2 + 1;
    },
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x161311, 0.045);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      80
    );
    camera.position.copy(currentCamPos.current);
    camera.lookAt(currentCamTarget.current);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting (Warm Mocha / Espresso & Bronze-Amber Akzente)
    const ambientLight = new THREE.AmbientLight(0xd4a373, 0.65);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff3e6, 2.2);
    dirLight.position.set(12, 18, 14);
    scene.add(dirLight);

    const rimLight = new THREE.DirectionalLight(0xff9a3c, 1.8);
    rimLight.position.set(-14, 8, -12);
    scene.add(rimLight);

    const coreLight = new THREE.PointLight(0xff9a3c, 3.5, 12, 1.8);
    coreLight.position.set(0, 2.2, 0);
    scene.add(coreLight);

    // 5. Materials
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1f1916,
      roughness: 0.35,
      metalness: 0.8,
    });

    const bronzeMat = new THREE.MeshStandardMaterial({
      color: 0xc58f5b,
      roughness: 0.25,
      metalness: 0.85,
    });

    const coreGlowMat = new THREE.MeshStandardMaterial({
      color: 0xff9a3c,
      emissive: 0xff7700,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.9,
    });

    const glassPlaneMat = new THREE.MeshPhysicalMaterial({
      color: 0xe6ccb2,
      metalness: 0.1,
      roughness: 0.15,
      transmission: 0.85,
      thickness: 0.6,
      transparent: true,
      opacity: 0.85,
    });

    // 6. Base Reflector & Grid
    const groundGeo = new THREE.PlaneGeometry(24, 24);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x130f0d,
      roughness: 0.2,
      metalness: 0.9,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.05;
    scene.add(ground);

    const gridHelper = new THREE.GridHelper(24, 32, 0xd4a373, 0x302520);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // 7. Tier 1: Database & Memory Matrix (Bottom Foundation)
    const tier1Group = new THREE.Group();
    const nodeGeo = new THREE.BoxGeometry(0.55, 0.35, 0.55);
    const edgesGeo = new THREE.EdgesGeometry(nodeGeo);
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xd4a373 });

    for (let x = -2; x <= 2; x += 1.2) {
      for (let z = -2; z <= 2; z += 1.2) {
        const node = new THREE.Mesh(nodeGeo, bronzeMat);
        node.position.set(x, 0.25, z);
        node.name = `DB_NODE [${x.toFixed(1)}:${z.toFixed(1)}]`;
        node.userData = { info: 'PostgreSQL Relational Table Node • ACID Concurrency' };

        const wire = new THREE.LineSegments(edgesGeo, edgeMat);
        node.add(wire);

        tier1Group.add(node);
        interactiveMeshes.current.push(node);
      }
    }
    scene.add(tier1Group);

    // 8. Tier 2: Enterprise Services & JVM Cluster (Core)
    const tier2Group = new THREE.Group();
    const coreCylinderGeo = new THREE.CylinderGeometry(1.6, 1.8, 1.6, 8);
    const coreMonolith = new THREE.Mesh(coreCylinderGeo, baseMat);
    coreMonolith.position.set(0, 1.4, 0);
    coreMonolith.name = 'CORE_JVM [ENTERPRISE_ENGINE]';
    coreMonolith.userData = { info: 'Java 21 • Spring Boot 3 Microservices • Business Logic' };

    const coreEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(coreCylinderGeo),
      new THREE.LineBasicMaterial({ color: 0xff9a3c })
    );
    coreMonolith.add(coreEdges);
    tier2Group.add(coreMonolith);
    interactiveMeshes.current.push(coreMonolith);

    // Surrounding Microservice Pillars
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const px = Math.cos(angle) * 2.5;
      const pz = Math.sin(angle) * 2.5;

      const pillarGeo = new THREE.BoxGeometry(0.7, 2.2, 0.7);
      const pillar = new THREE.Mesh(pillarGeo, coreGlowMat);
      pillar.position.set(px, 1.5, pz);
      pillar.name = `SERVICE_POD_0${i + 1}`;
      pillar.userData = { info: `Spring Service Worker #0${i + 1} • Async Queue & Event Bus` };

      const pillarEdges = new THREE.LineSegments(
        new THREE.EdgesGeometry(pillarGeo),
        new THREE.LineBasicMaterial({ color: 0xffffff })
      );
      pillar.add(pillarEdges);
      tier2Group.add(pillar);
      interactiveMeshes.current.push(pillar);
    }
    scene.add(tier2Group);

    // 9. Tier 3: API Gateway & Bus Struts
    const tier3Group = new THREE.Group();
    const torusGeo = new THREE.TorusGeometry(3.0, 0.04, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xd4a373 });
    const apiRing = new THREE.Mesh(torusGeo, ringMat);
    apiRing.rotation.x = Math.PI / 2;
    apiRing.position.y = 2.8;
    tier3Group.add(apiRing);

    const busGeo = new THREE.BoxGeometry(3.8, 0.12, 0.12);
    for (let r = 0; r < 4; r++) {
      const strut = new THREE.Mesh(busGeo, bronzeMat);
      strut.position.y = 2.8;
      strut.rotation.y = (r * Math.PI) / 4;
      tier3Group.add(strut);
    }
    scene.add(tier3Group);

    // 10. Tier 4: Reactive Frontend & Client Viewport Pane (Top Summit)
    const uiPaneGeo = new THREE.BoxGeometry(3.2, 0.08, 2.2);
    const uiPane = new THREE.Mesh(uiPaneGeo, glassPlaneMat);
    uiPane.position.set(0, 3.4, 0);
    uiPane.name = 'UI_REACT_19 [CLIENT_LAYER]';
    uiPane.userData = { info: 'React 18/19 • TypeScript • Matter.js Physics & Framer Motion' };

    const uiEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(uiPaneGeo),
      new THREE.LineBasicMaterial({ color: 0xff9a3c })
    );
    uiPane.add(uiEdges);
    scene.add(uiPane);
    interactiveMeshes.current.push(uiPane);

    // Floating UI Component Badges on Top Pane
    const badgeGeo = new THREE.BoxGeometry(0.5, 0.12, 0.4);
    const badgeMat = new THREE.MeshStandardMaterial({ color: 0xff9a3c, roughness: 0.3 });
    for (let bx = -1; bx <= 1; bx += 0.8) {
      for (let bz = -0.5; bz <= 0.5; bz += 0.6) {
        const badge = new THREE.Mesh(badgeGeo, badgeMat);
        badge.position.set(bx, 3.54, bz);
        badge.name = `COMPONENT_TREE [${bx > 0 ? 'STATE' : 'PROPS'}]`;
        badge.userData = { info: 'Virtual DOM Component • Zustand State & Reactive Hook' };
        scene.add(badge);
        interactiveMeshes.current.push(badge);
      }
    }

    // 11. Ambient Floating Code Particles (Warm Bronze & Amber Snowfall/Dust)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount * 3; p += 3) {
      posArray[p] = (Math.random() - 0.5) * 16;
      posArray[p + 1] = Math.random() * 8;
      posArray[p + 2] = (Math.random() - 0.5) * 16;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffb066,
      size: 0.065,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 12. Raycasting for Hover & Blueprint Inspection
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    // 13. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Continuous subtle ambient movements
      apiRing.rotation.z = time * 0.15;
      tier1Group.rotation.y = Math.sin(time * 0.08) * 0.02;
      tier2Group.rotation.y = time * 0.06;

      // Particle float & wrap
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] -= delta * 0.35;
        if (positions[i] < 0) {
          positions[i] = 8;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Cursor Parallax Easing
      mouseParallax.current.x += (mousePos.current.x * 0.85 - mouseParallax.current.x) * 0.05;
      mouseParallax.current.y += (mousePos.current.y * 0.65 - mouseParallax.current.y) * 0.05;

      // Camera Position & Target Interpolation (Smooth 1.2–1.6s easing)
      currentCamPos.current.lerp(targetCamPos.current, 0.035);
      currentCamTarget.current.lerp(targetCamTarget.current, 0.035);

      camera.position.set(
        currentCamPos.current.x + mouseParallax.current.x,
        currentCamPos.current.y + mouseParallax.current.y,
        currentCamPos.current.z
      );
      camera.lookAt(currentCamTarget.current);

      // Raycasting on interactive meshes
      mouseVector.set(mousePos.current.x, mousePos.current.y);
      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes.current, false);

      if (intersects.length > 0) {
        const topIntersect = intersects[0].object as THREE.Mesh;
        if (hoveredMesh.current !== topIntersect) {
          if (hoveredMesh.current) {
            hoveredMesh.current.scale.set(1, 1, 1);
          }
          hoveredMesh.current = topIntersect;
          topIntersect.scale.set(1.08, 1.08, 1.08);

          const info = `${topIntersect.name} // ${topIntersect.userData?.info || 'Systemkomponente'}`;
          setHoverLabel(info);
          onHoverNode?.(info);
          audio.spieleInspektion();
        }
      } else {
        if (hoveredMesh.current) {
          hoveredMesh.current.scale.set(1, 1, 1);
          hoveredMesh.current = null;
          setHoverLabel(null);
          onHoverNode?.(null);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
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
    <div className="relative h-full w-full select-none">
      <div ref={containerRef} className="h-full w-full cursor-crosshair" />

      {/* Floating Blueprint Inspection Overlay */}
      {hoverLabel && (
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 rounded border border-signal/60 bg-raum/90 px-4 py-2 font-mono-code text-[12px] tracking-wide text-signal shadow-[0_0_24px_rgba(255,154,60,0.35)] backdrop-blur-md">
          <span className="mr-2 inline-block h-2 w-2 animate-ping rounded-full bg-signal" />
          <span className="font-semibold text-text">{hoverLabel}</span>
        </div>
      )}
    </div>
  );
};

