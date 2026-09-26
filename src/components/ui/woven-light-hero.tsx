"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Interactive particle backdrop for the homepage hero — a torus-knot field
 * of 50k points that reshapes around the cursor and drifts back to rest.
 * Adapted from a pasted "WovenLightHero" reference component; only the
 * three.js canvas is kept here (no bundled nav/copy/button — those already
 * exist as real Arvexa content in `src/app/page.tsx` and the global `Nav`).
 * See docs/decisions.md for why this overrides two earlier "no generic
 * 3D hero" decisions.
 */
export function WovenCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    const particleCount = 50000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);

    for (let i = 0; i < particleCount; i++) {
      const vertexIndex = i % torusKnot.attributes.position.count;
      const x = torusKnot.attributes.position.getX(vertexIndex);
      const y = torusKnot.attributes.position.getY(vertexIndex);
      const z = torusKnot.attributes.position.getZ(vertexIndex);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Grayscale only (zero saturation) — monochrome theme, no hue.
      // Lightness varies for depth/texture against the white panel.
      const color = new THREE.Color();
      color.setHSL(0, 0, 0.08 + Math.random() * 0.42);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // NormalBlending (not Additive) — the hero background is always white,
    // and additive blending washes colored points out to invisible against
    // white (it only reads against black; caught via in-browser check).
    const material = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      blending: THREE.NormalBlending,
      transparent: true,
      opacity: 1,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function handleMouseMove(event: MouseEvent) {
      if (!mount) return;
      const bounds = mount.getBoundingClientRect();
      mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
    }
    if (!prefersReducedMotion) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    let frameId: number;
    function animate() {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const mouseWorld = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 0);

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const currentPos = new THREE.Vector3(positions[ix], positions[iy], positions[iz]);
        const originalPos = new THREE.Vector3(
          originalPositions[ix],
          originalPositions[iy],
          originalPositions[iz]
        );
        const velocity = new THREE.Vector3(velocities[ix], velocities[iy], velocities[iz]);

        const dist = currentPos.distanceTo(mouseWorld);
        if (dist < 1.5) {
          const force = (1.5 - dist) * 0.01;
          const direction = new THREE.Vector3().subVectors(currentPos, mouseWorld).normalize();
          velocity.add(direction.multiplyScalar(force));
        }

        const returnForce = new THREE.Vector3()
          .subVectors(originalPos, currentPos)
          .multiplyScalar(0.001);
        velocity.add(returnForce);
        velocity.multiplyScalar(0.95);

        positions[ix] += velocity.x;
        positions[iy] += velocity.y;
        positions[iz] += velocity.z;

        velocities[ix] = velocity.x;
        velocities[iy] = velocity.y;
        velocities[iz] = velocity.z;
      }
      geometry.attributes.position.needsUpdate = true;

      points.rotation.y = elapsedTime * 0.05;
      renderer.render(scene, camera);
    }
    // `prefers-reduced-motion` is respected everywhere per docs/brand-system.md —
    // render one still frame instead of the continuous rotate/mouse-reactive loop.
    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    function handleResize() {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      geometry.dispose();
      material.dispose();
      torusKnot.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" aria-hidden="true" />;
}
