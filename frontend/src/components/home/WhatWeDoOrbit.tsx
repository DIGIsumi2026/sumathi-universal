import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const BRAND_BLUE = '#073673';

function createCircleLine(radius: number, color: string, opacity: number) {
  const points: THREE.Vector3[] = [];
  const segments = 260;

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(
      new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
    );
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
  });

  return new THREE.Line(geometry, material);
}

function createBrokenLineCircle(
  radius: number,
  color: string,
  opacity: number,
  thickness = 0.04
) {
  const group = new THREE.Group();

  const dashCount = 46;
  const step = (Math.PI * 2) / dashCount;
  const dashLength = step * 0.72;

  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
  });

  for (let i = 0; i < dashCount; i++) {
    /*
      Small missing gap.
      This gives the outer ring a premium broken-line look.
    */
    if (i > 35 && i < 39) continue;

    const startAngle = i * step;
    const endAngle = startAngle + dashLength;

    const points: THREE.Vector3[] = [];
    const segmentPoints = 10;

    for (let j = 0; j <= segmentPoints; j++) {
      const t = j / segmentPoints;
      const angle = THREE.MathUtils.lerp(startAngle, endAngle, t);

      points.push(
        new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        )
      );
    }

    const curve = new THREE.CatmullRomCurve3(points);

    const geometry = new THREE.TubeGeometry(
      curve,
      10,
      thickness,
      10,
      false
    );

    const dash = new THREE.Mesh(geometry, material);
    group.add(dash);
  }

  return group;
}

function createArcLine(
  radius: number,
  startAngle: number,
  endAngle: number,
  color: string,
  opacity: number
) {
  const points: THREE.Vector3[] = [];
  const segments = 110;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const angle = THREE.MathUtils.lerp(startAngle, endAngle, t);

    points.push(
      new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0)
    );
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
  });

  return new THREE.Line(geometry, material);
}

export default function WhatWeDoOrbit() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 20);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const orbitGroup = new THREE.Group();
    scene.add(orbitGroup);

    const outerGroup = new THREE.Group();
    const innerGroup = new THREE.Group();

    orbitGroup.add(outerGroup);
    orbitGroup.add(innerGroup);

    /*
      Outer circle:
      thin full line + thicker broken-line ring.
      This spins clockwise.
    */
    const outerLine = createCircleLine(4.15, BRAND_BLUE, 0.78);
    const outerBrokenRing = createBrokenLineCircle(3.68, BRAND_BLUE, 1, 0.045);

    outerGroup.add(outerLine);
    outerGroup.add(outerBrokenRing);

    /*
      Inner circle:
      smaller line circle with broken arc details.
      This spins counter-clockwise.
    */
    const innerBase = createCircleLine(3.05, BRAND_BLUE, 0.42);

    const innerArcOne = createArcLine(
      3.05,
      THREE.MathUtils.degToRad(18),
      THREE.MathUtils.degToRad(142),
      BRAND_BLUE,
      0.95
    );

    const innerArcTwo = createArcLine(
      3.05,
      THREE.MathUtils.degToRad(205),
      THREE.MathUtils.degToRad(320),
      BRAND_BLUE,
      0.95
    );

    innerGroup.add(innerBase);
    innerGroup.add(innerArcOne);
    innerGroup.add(innerArcTwo);

    const markerMaterial = new THREE.MeshBasicMaterial({
      color: BRAND_BLUE,
      transparent: true,
      opacity: 1,
    });

    const markerOne = new THREE.Mesh(
      new THREE.SphereGeometry(0.105, 18, 18),
      markerMaterial
    );
    markerOne.position.set(3.05, 0, 0);

    const markerTwo = markerOne.clone();
    markerTwo.position.set(-3.05, 0, 0);

    innerGroup.add(markerOne);
    innerGroup.add(markerTwo);

    /*
      Scroll reaction:
      scroll up   -> circle increases
      scroll down -> circle decreases
    */
    let lastScrollY = window.scrollY;
    let targetScale = 1;
    let currentScale = 1;
    let resetTimer: number | undefined;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp = currentScrollY < lastScrollY;

      targetScale = scrollingUp ? 1.16 : 0.92;
      lastScrollY = currentScrollY;

      if (resetTimer) {
        window.clearTimeout(resetTimer);
      }

      resetTimer = window.setTimeout(() => {
        targetScale = 1;
      }, 220);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      /*
        Outer broken ring clockwise.
        Inner ring counter-clockwise.
      */
      outerGroup.rotation.z = -elapsed * 0.2;
      innerGroup.rotation.z = elapsed * 0.3;

      currentScale = THREE.MathUtils.lerp(currentScale, targetScale, 0.055);

      /*
        Small premium breathing movement.
      */
      const breathe = 1 + Math.sin(elapsed * 0.7) * 0.008;
      orbitGroup.scale.setScalar(currentScale * breathe);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);

      if (resetTimer) {
        window.clearTimeout(resetTimer);
      }

      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;

        if (mesh.geometry) {
          mesh.geometry.dispose();
        }

        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((material) => material.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });

      renderer.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="what-we-do-orbit-canvas" />;
}