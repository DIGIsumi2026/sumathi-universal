import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FloatingShapesCanvas() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.TetrahedronGeometry(0.35, 0);
    const material = new THREE.MeshBasicMaterial({ color: 0x7c4dff, wireframe: false, transparent: true, opacity: 0.85 });
    const shapes: THREE.Mesh[] = [];

    const positions = [
      [-2.6, 1.5, 0],
      [2.3, 1.2, -0.3],
      [-2.2, -1.5, -0.2],
      [2.4, -1.6, 0.1]
    ];

    positions.forEach((position, index) => {
      const mesh = new THREE.Mesh(geometry, material.clone());
      mesh.position.set(position[0], position[1], position[2]);
      (mesh.material as THREE.MeshBasicMaterial).color.set(index % 2 ? '#ff2dae' : '#36f1cd');
      scene.add(mesh);
      shapes.push(mesh);
    });

    const resize = () => {
      if (!mountRef.current) return;
      const { clientWidth, clientHeight } = mountRef.current;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    let frameId = 0;
    const tick = () => {
      shapes.forEach((mesh, index) => {
        mesh.rotation.x += 0.005 + index * 0.001;
        mesh.rotation.y += 0.007 + index * 0.001;
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.0018;
      });
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      geometry.dispose();
      shapes.forEach((mesh) => (mesh.material as THREE.Material).dispose());
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="floating-shapes-canvas" ref={mountRef} aria-hidden="true" />;
}
