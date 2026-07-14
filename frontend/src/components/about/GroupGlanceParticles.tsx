import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type ParticleNode = {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
};

const BRAND_BLUE = '#073673';
const BRIGHT_BLUE = '#2f8dff';
const LIGHT_BLUE = '#9fdcff';

function createSoftCircleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;

  const ctx = canvas.getContext('2d');

  if (ctx) {
    const gradient = ctx.createRadialGradient(128, 128, 8, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(47, 141, 255, 0.42)');
    gradient.addColorStop(0.3, 'rgba(159, 220, 255, 0.18)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
  }

  return new THREE.CanvasTexture(canvas);
}

export default function GroupGlanceParticles() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let frameId = 0;
    let isVisible = true;

    const isMobile = window.innerWidth <= 576;
    const isTablet = window.innerWidth <= 1024;

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(-10, 10, 6, -6, 0.1, 30);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });

    renderer.setPixelRatio(
      isMobile ? 1 : Math.min(window.devicePixelRatio, 1.45)
    );
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const rootGroup = new THREE.Group();
    const particleGroup = new THREE.Group();
    const blobGroup = new THREE.Group();
    const ringGroup = new THREE.Group();

    scene.add(rootGroup);
    rootGroup.add(blobGroup);
    rootGroup.add(ringGroup);
    rootGroup.add(particleGroup);

    const particleCount = isMobile ? 26 : isTablet ? 42 : 62;

    const bounds = {
      x: isMobile ? 8.5 : 10.5,
      y: 5.4,
    };

    const nodes: ParticleNode[] = [];

    for (let i = 0; i < particleCount; i += 1) {
      nodes.push({
        position: new THREE.Vector3(
          THREE.MathUtils.randFloatSpread(bounds.x * 2),
          THREE.MathUtils.randFloatSpread(bounds.y * 2),
          THREE.MathUtils.randFloat(-0.35, 0.35)
        ),
        velocity: new THREE.Vector3(
          THREE.MathUtils.randFloat(-0.004, 0.004),
          THREE.MathUtils.randFloat(-0.0026, 0.0026),
          0
        ),
      });
    }

    /* ================================
       PARTICLE POINTS
    ================================ */

    const pointPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      pointPositions[i * 3] = nodes[i].position.x;
      pointPositions[i * 3 + 1] = nodes[i].position.y;
      pointPositions[i * 3 + 2] = nodes[i].position.z;
    }

    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(pointPositions, 3)
    );

    const pointMaterial = new THREE.PointsMaterial({
      color: LIGHT_BLUE,
      size: isMobile ? 0.11 : 0.09,
      transparent: true,
      opacity: 0.92,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const points = new THREE.Points(pointGeometry, pointMaterial);
    particleGroup.add(points);

    const glowMaterial = new THREE.PointsMaterial({
      color: BRIGHT_BLUE,
      size: isMobile ? 0.25 : 0.22,
      transparent: true,
      opacity: 0.22,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const glowPoints = new THREE.Points(pointGeometry, glowMaterial);
    particleGroup.add(glowPoints);

    /* ================================
       CONNECTING LINES
    ================================ */

    const maxConnections = particleCount * particleCount;
    const linePositions = new Float32Array(maxConnections * 3 * 2);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3)
    );
    lineGeometry.setDrawRange(0, 0);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x87cfff,
      transparent: true,
      opacity: isMobile ? 0.2 : 0.28,
      depthWrite: false,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    particleGroup.add(lines);

    /* ================================
       SOFT FLOATING BLOBS
    ================================ */

    const softCircleTexture = createSoftCircleTexture();

    const blobMaterial = new THREE.SpriteMaterial({
      map: softCircleTexture,
      color: 0xffffff,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });

    const blobCount = isMobile ? 3 : 5;

    for (let i = 0; i < blobCount; i += 1) {
      const blob = new THREE.Sprite(blobMaterial.clone());

      const scale = THREE.MathUtils.randFloat(2.6, 4.8);
      blob.scale.set(scale, scale, 1);

      blob.position.set(
        THREE.MathUtils.randFloatSpread(15),
        THREE.MathUtils.randFloatSpread(6),
        -1
      );

      blob.userData.speed = THREE.MathUtils.randFloat(0.12, 0.22);
      blob.userData.offset = Math.random() * Math.PI * 2;

      blobGroup.add(blob);
    }

    /* ================================
       ABSTRACT RINGS / CIRCLES
    ================================ */

    const ringMaterial = new THREE.LineBasicMaterial({
      color: 0x77c7ff,
      transparent: true,
      opacity: isMobile ? 0.16 : 0.22,
      depthWrite: false,
    });

    const ringCount = isMobile ? 2 : 4;

    for (let i = 0; i < ringCount; i += 1) {
      const curve = new THREE.EllipseCurve(
        0,
        0,
        THREE.MathUtils.randFloat(0.6, 1.2),
        THREE.MathUtils.randFloat(0.6, 1.2),
        0,
        Math.PI * 2,
        false,
        0
      );

      const points2D = curve.getPoints(80);
      const ringPoints = points2D.map(
        (point) => new THREE.Vector3(point.x, point.y, 0)
      );

      const ringGeometry = new THREE.BufferGeometry().setFromPoints(ringPoints);
      const ring = new THREE.LineLoop(ringGeometry, ringMaterial.clone());

      ring.position.set(
        THREE.MathUtils.randFloatSpread(16),
        THREE.MathUtils.randFloatSpread(6.6),
        -0.2
      );

      const scale = THREE.MathUtils.randFloat(0.8, 1.6);
      ring.scale.set(scale, scale, scale);

      ring.userData.speed = THREE.MathUtils.randFloat(0.05, 0.12);
      ring.userData.offset = Math.random() * Math.PI * 2;

      ringGroup.add(ring);
    }

    /* ================================
       MOUSE PARALLAX
    ================================ */

    const targetMouse = new THREE.Vector2(0, 0);
    const currentMouse = new THREE.Vector2(0, 0);

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();

      targetMouse.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouse.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    container.addEventListener('pointermove', handlePointerMove);

    /* ================================
       UPDATE
    ================================ */

    const updateParticles = () => {
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];

        node.position.add(node.velocity);

        if (node.position.x > bounds.x || node.position.x < -bounds.x) {
          node.velocity.x *= -1;
        }

        if (node.position.y > bounds.y || node.position.y < -bounds.y) {
          node.velocity.y *= -1;
        }

        pointPositions[i * 3] = node.position.x;
        pointPositions[i * 3 + 1] = node.position.y;
        pointPositions[i * 3 + 2] = node.position.z;
      }

      const pointAttribute = pointGeometry.getAttribute(
        'position'
      ) as THREE.BufferAttribute;

      pointAttribute.needsUpdate = true;

      let lineIndex = 0;
      const connectionDistance = isMobile ? 2.1 : 2.45;

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i].position;
          const b = nodes[j].position;
          const distance = a.distanceTo(b);

          if (distance < connectionDistance) {
            linePositions[lineIndex] = a.x;
            linePositions[lineIndex + 1] = a.y;
            linePositions[lineIndex + 2] = a.z;

            linePositions[lineIndex + 3] = b.x;
            linePositions[lineIndex + 4] = b.y;
            linePositions[lineIndex + 5] = b.z;

            lineIndex += 6;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex / 3);

      const lineAttribute = lineGeometry.getAttribute(
        'position'
      ) as THREE.BufferAttribute;

      lineAttribute.needsUpdate = true;
    };

    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      currentMouse.lerp(targetMouse, 0.045);

      rootGroup.position.x = currentMouse.x * 0.22;
      rootGroup.position.y = currentMouse.y * 0.16;

      particleGroup.rotation.z = Math.sin(elapsed * 0.16) * 0.035;
      particleGroup.rotation.y = Math.sin(elapsed * 0.12) * 0.08;

      blobGroup.children.forEach((blob, index) => {
        const object = blob as THREE.Sprite;

        object.position.y +=
          Math.sin(elapsed * object.userData.speed + object.userData.offset) *
          0.0009;

        object.position.x +=
          Math.cos(elapsed * object.userData.speed + index) * 0.0007;
      });

      ringGroup.children.forEach((ring, index) => {
        ring.rotation.z += 0.0008 + index * 0.00008;
        ring.position.y +=
          Math.sin(elapsed * ring.userData.speed + ring.userData.offset) *
          0.0008;
      });

      updateParticles();

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const aspect = width / height || 1;

      camera.left = -10 * aspect;
      camera.right = 10 * aspect;
      camera.top = 6;
      camera.bottom = -6;
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(
        window.innerWidth <= 576
          ? 1
          : Math.min(window.devicePixelRatio, 1.45)
      );

      renderer.setSize(width, height);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        if (isVisible && !frameId) {
          animate();
        }

        if (!isVisible && frameId) {
          window.cancelAnimationFrame(frameId);
          frameId = 0;
        }
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(container);
    handleResize();
    animate();

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      observer.disconnect();
      isVisible = false;

      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);

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

      pointGeometry.dispose();
      pointMaterial.dispose();
      glowMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      softCircleTexture.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="group-glance-particles" />;
}