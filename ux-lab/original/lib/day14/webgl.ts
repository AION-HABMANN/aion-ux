'use client';

import { useEffect, useState } from 'react';

/**
 * Capability probe used to decide between a live 3D widget and the bundled
 * static fallback image. Runs once, on the client, and never blocks render.
 */
export function detectWebgl(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return false;
    // Very small texture budgets indicate a device that will struggle with a scene.
    const maxTexture = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
    return typeof maxTexture !== 'number' || maxTexture >= 1024;
  } catch {
    return false;
  }
}

export type Capability = 'probing' | 'supported' | 'unsupported';

export function useWebglCapability(): Capability {
  const [capability, setCapability] = useState<Capability>('probing');

  useEffect(() => {
    const reducedHardware =
      typeof navigator !== 'undefined' &&
      typeof navigator.hardwareConcurrency === 'number' &&
      navigator.hardwareConcurrency > 0 &&
      navigator.hardwareConcurrency < 2;
    setCapability(detectWebgl() && !reducedHardware ? 'supported' : 'unsupported');
  }, []);

  return capability;
}
