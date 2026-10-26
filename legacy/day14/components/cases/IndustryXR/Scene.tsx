'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { INDUSTRYXR_HOTSPOTS } from '@/content/industryxr';

/**
 * The ONE Three.js scene in this playground.
 *
 * A generic industrial training space: low-poly, neutral materials, simple
 * lighting, no shadow maps, no post-processing, no physics. The camera is
 * constrained to a small horizontal arc around a fixed target — every learner
 * sees materially the same thing, because this is a graded case and
 * reproducibility outranks spectacle. Rendering is on demand: there is no
 * animation loop running in the background.
 */

const MAX_YAW = THREE.MathUtils.degToRad(9);
const BASE_RADIUS = 7.0;
const CAMERA_HEIGHT = 2.5;
const TARGET = new THREE.Vector3(0, 1.3, -1.2);

type ScreenPoint = { id: string; x: number; y: number; visible: boolean };

/** Lambert keeps the shader cost low; there is no PBR or shadow map in this scene. */
function material(hex: number) {
  return new THREE.MeshLambertMaterial({ color: hex });
}

function addBox(
  group: THREE.Group,
  size: [number, number, number],
  position: [number, number, number],
  colour: number,
) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material(colour));
  mesh.position.set(...position);
  group.add(mesh);
}

function buildScene(scene: THREE.Scene) {
  const shell = new THREE.Group();

  // Room shell
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(14, 9),
    new THREE.MeshBasicMaterial({ color: 0xd8d3e6 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0, -0.5);
  shell.add(floor);

  const backWall = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 6),
    new THREE.MeshBasicMaterial({ color: 0xf5f3fb }),
  );
  backWall.position.set(0, 3, -5);
  shell.add(backWall);

  const leftWall = new THREE.Mesh(
    new THREE.PlaneGeometry(9, 6),
    new THREE.MeshBasicMaterial({ color: 0xeae7f5 }),
  );
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-6.4, 3, -0.5);
  shell.add(leftWall);

  const rightWall = leftWall.clone();
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.position.set(6.4, 3, -0.5);
  shell.add(rightWall);

  // Skirting, so the floor/wall junction reads clearly
  addBox(shell, [15, 0.14, 0.06], [0, 0.07, -4.96], 0xb0a9c6);

  // Floor marking for the VR area
  const marking = new THREE.Mesh(
    new THREE.PlaneGeometry(2.6, 2.6),
    new THREE.MeshBasicMaterial({ color: 0xc6bfdd }),
  );
  marking.rotation.x = -Math.PI / 2;
  marking.position.set(-0.9, 0.01, -0.6);
  shell.add(marking);

  // 1 — AR instruction station (workbench with a mounted screen)
  addBox(shell, [2.4, 0.12, 1.1], [-3.2, 0.92, -1.2], 0x8e88a6);
  addBox(shell, [0.14, 0.9, 0.14], [-4.25, 0.45, -1.2], 0x7c7695);
  addBox(shell, [0.14, 0.9, 0.14], [-2.15, 0.45, -1.2], 0x7c7695);
  addBox(shell, [1.3, 0.7, 0.08], [-3.2, 1.62, -1.6], 0x5b5473);
  addBox(shell, [1.0, 0.5, 0.02], [-3.2, 1.62, -1.54], 0x231a45);
  addBox(shell, [0.7, 0.16, 0.5], [-3.2, 1.06, -0.9], 0x9e97b6);

  // 2 — VR training station (headset stand inside the marked area)
  addBox(shell, [0.8, 0.08, 0.6], [-0.9, 0.72, -0.6], 0x8e88a6);
  addBox(shell, [0.1, 0.72, 0.1], [-0.9, 0.36, -0.6], 0x7c7695);
  addBox(shell, [0.52, 0.26, 0.3], [-0.9, 0.92, -0.6], 0x5b5473);
  addBox(shell, [0.42, 0.12, 0.06], [-0.9, 0.94, -0.44], 0x231a45);
  addBox(shell, [0.18, 0.18, 0.18], [-1.6, 0.81, -0.6], 0x9e97b6);
  addBox(shell, [0.18, 0.18, 0.18], [-0.2, 0.81, -0.6], 0x9e97b6);

  // 3 — Remote support corner (desk, large display, camera)
  addBox(shell, [1.65, 0.12, 0.9], [1.65, 0.78, -1.0], 0x8e88a6);
  addBox(shell, [0.12, 0.78, 0.12], [0.85, 0.39, -1.0], 0x7c7695);
  addBox(shell, [0.12, 0.78, 0.12], [2.45, 0.39, -1.0], 0x7c7695);
  addBox(shell, [1.5, 0.86, 0.08], [1.65, 1.42, -1.38], 0x5b5473);
  addBox(shell, [1.24, 0.66, 0.02], [1.65, 1.42, -1.32], 0x231a45);
  addBox(shell, [0.2, 0.14, 0.14], [1.65, 1.94, -1.34], 0x7c7695);
  addBox(shell, [0.5, 0.5, 0.5], [1.65, 0.25, -0.2], 0x9e97b6);

  // 4 — Not-yet-integrated area (shelving with paper documentation)
  addBox(shell, [1.7, 0.08, 0.6], [3.95, 1.7, -1.6], 0xa49dbc);
  addBox(shell, [1.7, 0.08, 0.6], [3.95, 1.15, -1.6], 0xa49dbc);
  addBox(shell, [1.7, 0.08, 0.6], [3.95, 0.6, -1.6], 0xa49dbc);
  addBox(shell, [0.08, 1.8, 0.6], [3.13, 0.9, -1.6], 0x8e88a6);
  addBox(shell, [0.08, 1.8, 0.6], [4.77, 0.9, -1.6], 0x8e88a6);
  addBox(shell, [1.3, 0.34, 0.4], [3.95, 1.91, -1.6], 0xcfcadd);
  addBox(shell, [1.3, 0.34, 0.4], [3.95, 1.36, -1.6], 0xcfcadd);
  addBox(shell, [0.9, 0.75, 0.5], [3.55, 0.37, -0.5], 0xb7b1cc);

  scene.add(shell);
  return shell;
}

export function Scene({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    yaw: number;
    frame: number | null;
  }>({ yaw: 0, frame: null });

  const [points, setPoints] = useState<ScreenPoint[]>([]);
  const [failed, setFailed] = useState(false);

  const project = useCallback(() => {
    const { camera, renderer } = stateRef.current;
    if (!camera || !renderer) return;
    const size = renderer.getSize(new THREE.Vector2());
    const next = INDUSTRYXR_HOTSPOTS.map((hotspot) => {
      const vector = new THREE.Vector3(...hotspot.world).project(camera);
      return {
        id: hotspot.id,
        x: ((vector.x + 1) / 2) * size.x,
        y: ((1 - vector.y) / 2) * size.y,
        visible: vector.z < 1,
      };
    });
    setPoints(next);
  }, []);

  const draw = useCallback(() => {
    const state = stateRef.current;
    if (!state.renderer || !state.scene || !state.camera) return;
    const { camera } = state;
    camera.position.set(
      TARGET.x + Math.sin(state.yaw) * BASE_RADIUS,
      CAMERA_HEIGHT,
      TARGET.z + Math.cos(state.yaw) * BASE_RADIUS,
    );
    camera.lookAt(TARGET);
    state.renderer.render(state.scene, camera);
    project();
  }, [project]);

  const schedule = useCallback(() => {
    const state = stateRef.current;
    if (state.frame !== null) return;
    state.frame = requestAnimationFrame(() => {
      state.frame = null;
      draw();
    });
  }, [draw]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power' });
    } catch {
      setFailed(true);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(host.clientWidth, Math.round(host.clientWidth * 0.5625), false);
    renderer.setClearColor(0xf7f6fb, 1);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    buildScene(scene);
    scene.add(new THREE.HemisphereLight(0xffffff, 0xd0cbe0, 1.15));
    const key = new THREE.DirectionalLight(0xffffff, 0.75);
    key.position.set(4, 8, 6);
    scene.add(key);

    const camera = new THREE.PerspectiveCamera(42, 16 / 9, 0.1, 60);

    stateRef.current.renderer = renderer;
    stateRef.current.scene = scene;
    stateRef.current.camera = camera;

    const resize = () => {
      const width = host.clientWidth;
      const height = Math.round(width * 0.5625);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      schedule();
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(host);

    return () => {
      observer.disconnect();
      if (stateRef.current.frame !== null) cancelAnimationFrame(stateRef.current.frame);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const mat = object.material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
      stateRef.current.renderer = undefined;
      stateRef.current.scene = undefined;
      stateRef.current.camera = undefined;
    };
  }, [schedule]);

  // Clamped horizontal drag only. No free orbit, no vertical, no zoom.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let dragging = false;
    let startX = 0;
    let startYaw = 0;

    const down = (event: PointerEvent) => {
      if ((event.target as HTMLElement).closest('[data-hotspot]')) return;
      dragging = true;
      startX = event.clientX;
      startYaw = stateRef.current.yaw;
      host.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
      if (!dragging) return;
      const delta = (event.clientX - startX) / Math.max(host.clientWidth, 1);
      stateRef.current.yaw = THREE.MathUtils.clamp(startYaw - delta * MAX_YAW * 2.2, -MAX_YAW, MAX_YAW);
      schedule();
    };
    const up = (event: PointerEvent) => {
      dragging = false;
      if (host.hasPointerCapture(event.pointerId)) host.releasePointerCapture(event.pointerId);
    };

    host.addEventListener('pointerdown', down);
    host.addEventListener('pointermove', move);
    host.addEventListener('pointerup', up);
    host.addEventListener('pointercancel', up);
    return () => {
      host.removeEventListener('pointerdown', down);
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerup', up);
      host.removeEventListener('pointercancel', up);
    };
  }, [schedule]);

  if (failed) {
    return null;
  }

  return (
    <div
      ref={hostRef}
      className="relative w-full touch-pan-y select-none overflow-hidden rounded-card border border-lilac"
      style={{ aspectRatio: '16 / 9' }}
    >
      {points.map((point) => {
        const index = INDUSTRYXR_HOTSPOTS.findIndex((h) => h.id === point.id);
        const hotspot = INDUSTRYXR_HOTSPOTS[index];
        if (!hotspot || !point.visible) return null;
        const isActive = hotspot.id === activeId;
        return (
          <button
            key={hotspot.id}
            type="button"
            data-hotspot
            onClick={() => onSelect(hotspot.id)}
            aria-pressed={isActive}
            aria-label={hotspot.name}
            title={hotspot.name}
            className={[
              'absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-xs font-bold shadow-card transition-colors',
              isActive
                ? 'border-white bg-purple text-white'
                : 'border-purple bg-white text-purple hover:bg-lilac',
            ].join(' ')}
            style={{ left: `${point.x}px`, top: `${point.y}px` }}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
}

export default Scene;
