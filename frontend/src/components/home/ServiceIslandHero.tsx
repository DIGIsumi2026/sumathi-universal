import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const MODEL_PATH = '/models/service-island.glb';
const LOOP_DURATION = 10;

export default function ServiceIslandHero() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;

    const scene = new THREE.Scene();

    const sceneFog = new THREE.FogExp2(0x8fb7e9, 0.014);
    scene.fog = sceneFog;

    const camera = new THREE.PerspectiveCamera(
      32,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    camera.position.set(6.8, 3.6, 8.6);
    camera.lookAt(0, 0.15, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    const hemiLight = new THREE.HemisphereLight(0xbfdcff, 0x182033, 1.4);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xffd49a, 4.8);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(2048, 2048);
    sunLight.shadow.camera.left = -18;
    sunLight.shadow.camera.right = 18;
    sunLight.shadow.camera.top = 18;
    sunLight.shadow.camera.bottom = -18;
    scene.add(sunLight);

    const moonLight = new THREE.DirectionalLight(0x9bb5ff, 0);
    scene.add(moonLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
    fillLight.position.set(-5, 5, 7);
    scene.add(fillLight);

    const skyUniforms = {
      uTop: { value: new THREE.Color('#87c3ff') },
      uBottom: { value: new THREE.Color('#fff0cf') },
    };

    const skyMaterial = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: skyUniforms,
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uTop;
        uniform vec3 uBottom;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          float gradient = smoothstep(-0.2, 0.95, h);
          vec3 color = mix(uBottom, uTop, gradient);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(180, 48, 32),
      skyMaterial
    );
    scene.add(sky);

    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xffd36c })
    );
    scene.add(sun);

    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xdce8ff })
    );
    scene.add(moon);

    const sunGlow = new THREE.PointLight(0xffb45a, 3.5, 70);
    scene.add(sunGlow);

    const moonGlow = new THREE.PointLight(0x9bb5ff, 0, 50);
    scene.add(moonGlow);

    const starGeometry = new THREE.BufferGeometry();
    const starCount = 700;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const radius = THREE.MathUtils.randFloat(65, 125);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const y = THREE.MathUtils.randFloat(20, 85);

      starPositions[i * 3] = Math.cos(theta) * radius;
      starPositions[i * 3 + 1] = y;
      starPositions[i * 3 + 2] = Math.sin(theta) * radius;
    }

    starGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(starPositions, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
      color: 0xdce8ff,
      size: 0.1,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const createCloudTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 256;

      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(250, 130, 20, 250, 130, 230);
      gradient.addColorStop(0, 'rgba(255,255,255,0.95)');
      gradient.addColorStop(0.35, 'rgba(235,244,255,0.72)');
      gradient.addColorStop(0.7, 'rgba(190,205,220,0.26)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.fillStyle = gradient;

      for (let i = 0; i < 26; i++) {
        const x = 90 + Math.random() * 340;
        const y = 70 + Math.random() * 105;
        const rx = 55 + Math.random() * 75;
        const ry = 24 + Math.random() * 34;

        ctx.beginPath();
        ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    };

    const cloudTexture = createCloudTexture();
    const cloudGroup = new THREE.Group();
    scene.add(cloudGroup);

    const cloudSprites: THREE.Sprite[] = [];

    const addCloud = (
      x: number,
      y: number,
      z: number,
      scaleX: number,
      scaleY: number,
      opacity: number
    ) => {
      const material = new THREE.SpriteMaterial({
        map: cloudTexture,
        transparent: true,
        opacity,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(material);
      sprite.position.set(x, y, z);
      sprite.scale.set(scaleX, scaleY, 1);

      cloudGroup.add(sprite);
      cloudSprites.push(sprite);
    };

    for (let i = 0; i < 14; i++) {
      addCloud(
        THREE.MathUtils.randFloatSpread(24),
        THREE.MathUtils.randFloat(-3.8, -1.8),
        THREE.MathUtils.randFloatSpread(16),
        THREE.MathUtils.randFloat(3.5, 7.2),
        THREE.MathUtils.randFloat(1.0, 2.0),
        THREE.MathUtils.randFloat(0.22, 0.38)
      );
    }

    for (let i = 0; i < 8; i++) {
      addCloud(
        THREE.MathUtils.randFloatSpread(28),
        THREE.MathUtils.randFloat(4.2, 7.5),
        THREE.MathUtils.randFloat(-18, -11),
        THREE.MathUtils.randFloat(4.5, 8.5),
        THREE.MathUtils.randFloat(1.2, 2.3),
        THREE.MathUtils.randFloat(0.16, 0.3)
      );
    }

    const rayGroup = new THREE.Group();
    scene.add(rayGroup);

    const rayMaterial = new THREE.MeshBasicMaterial({
      color: 0xffc777,
      transparent: true,
      opacity: 0.12,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < 7; i++) {
      const ray = new THREE.Mesh(
        new THREE.PlaneGeometry(0.42, 14),
        rayMaterial.clone()
      );

      ray.position.set(-6 + i * 1.35, 5.8 - i * 0.08, -9.5);
      ray.rotation.set(
        THREE.MathUtils.degToRad(68),
        0,
        THREE.MathUtils.degToRad(-16 + i * 4)
      );

      rayGroup.add(ray);
    }

    const waterfallUniforms = {
      uTime: { value: 0 },
      uNight: { value: 0 },
    };

    const waterfallMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: waterfallUniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uNight;
        varying vec2 vUv;

        void main() {
          float flow = sin((vUv.y - uTime * 1.6) * 42.0) * 0.5 + 0.5;
          float stripe = smoothstep(0.35, 0.85, flow);
          float edge = smoothstep(0.0, 0.18, vUv.x) * smoothstep(1.0, 0.82, vUv.x);

          vec3 dayColor = vec3(0.45, 0.82, 1.0);
          vec3 nightColor = vec3(0.16, 0.35, 0.95);
          vec3 color = mix(dayColor, nightColor, uNight);
          color += stripe * vec3(0.35, 0.55, 0.75);

          float alpha = mix(0.23, 0.48, stripe) * edge;
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    const streamMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2f96ff,
      transparent: true,
      opacity: 0.6,
      roughness: 0.1,
      metalness: 0,
      emissive: new THREE.Color(0x0a4f9c),
      emissiveIntensity: 0.18,
    });

    const modelPivot = new THREE.Group();
    scene.add(modelPivot);

    let mixer: THREE.AnimationMixer | null = null;
    let modelReady = false;

    const loader = new GLTFLoader();

    loader.load(
      MODEL_PATH,
      (gltf) => {
        const model = gltf.scene;
        const removeObjects: THREE.Object3D[] = [];

        model.traverse((child) => {
          const name = child.name.toLowerCase();

          const shouldRemove =
            name.includes('cloud') ||
            name.includes('sun ray') ||
            name.includes('god beam') ||
            name.includes('star') ||
            name.includes('visible sun') ||
            name.includes('visible moon') ||
            name.includes('moon light') ||
            name.includes('sun light') ||
            name.includes('hero camera') ||
            name.includes('camera target');

          const maybeLight = child as THREE.Object3D & { isLight?: boolean };
          const maybeCamera = child as THREE.Object3D & { isCamera?: boolean };

          if (shouldRemove || maybeLight.isLight || maybeCamera.isCamera) {
            removeObjects.push(child);
            return;
          }

          const mesh = child as THREE.Mesh;

          if (mesh.isMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const materialNames = Array.isArray(mesh.material)
              ? mesh.material.map((m) => m.name.toLowerCase()).join(' ')
              : mesh.material?.name?.toLowerCase() || '';

            if (
              name.includes('waterfall') &&
              !name.includes('droplet') &&
              !name.includes('foam')
            ) {
              mesh.material = waterfallMaterial;
            }

            if (name.includes('stream') || materialNames.includes('stream water')) {
              mesh.material = streamMaterial;
            }

            if (materialNames.includes('glass')) {
              const glassMat = mesh.material as THREE.MeshStandardMaterial;
              glassMat.transparent = true;
              glassMat.opacity = 0.62;
              glassMat.roughness = 0.08;
              glassMat.metalness = 0.04;
            }
          }
        });

        removeObjects.forEach((object) => {
          object.parent?.remove(object);
        });

        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();

        box.getSize(size);
        box.getCenter(center);

        model.position.sub(center);

        const horizontalSize = Math.max(size.x, size.z);
        const scale = 14.8 / horizontalSize;

        model.scale.setScalar(scale);
        model.position.y -= 0.75;

        modelPivot.add(model);

        mixer = new THREE.AnimationMixer(model);

        gltf.animations.forEach((clip) => {
          const clipName = clip.name.toLowerCase();

          if (clipName.includes('island rotation')) return;

          if (
            clipName.includes('turbine') ||
            clipName.includes('droplet') ||
            clipName.includes('water') ||
            clipName.includes('stage') ||
            clipName.includes('hospitality')
          ) {
            const action = mixer?.clipAction(clip);
            action?.setLoop(THREE.LoopRepeat, Infinity);
            action?.play();
          }
        });

        modelReady = true;
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error('Model loading error:', error);
        setLoading(false);
      }
    );

    const clock = new THREE.Clock();
    let animationFrameId = 0;

    const dayTop = new THREE.Color('#7fc2ff');
    const dayBottom = new THREE.Color('#fff0cf');

    const eveningTop = new THREE.Color('#ef8a4a');
    const eveningBottom = new THREE.Color('#3b4c82');

    const nightTop = new THREE.Color('#02081f');
    const nightBottom = new THREE.Color('#071a3d');

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();
      const cycle = (elapsed % LOOP_DURATION) / LOOP_DURATION;

      mixer?.update(delta);

      if (modelReady) {
        modelPivot.rotation.y = elapsed * ((Math.PI * 2) / LOOP_DURATION);
      }

      let eveningStrength = 0;
      let nightStrength = 0;

      if (cycle < 0.5) {
        eveningStrength = THREE.MathUtils.smoothstep(cycle, 0.12, 0.5);
      } else {
        nightStrength = THREE.MathUtils.smoothstep(cycle, 0.64, 0.86);
        eveningStrength = 1 - nightStrength;
      }

      const topColor = dayTop
        .clone()
        .lerp(eveningTop, eveningStrength)
        .lerp(nightTop, nightStrength);

      const bottomColor = dayBottom
        .clone()
        .lerp(eveningBottom, eveningStrength)
        .lerp(nightBottom, nightStrength);

      skyUniforms.uTop.value.copy(topColor);
      skyUniforms.uBottom.value.copy(bottomColor);

      sceneFog.color.copy(bottomColor);
      sceneFog.density = THREE.MathUtils.lerp(0.01, 0.022, nightStrength);

      const sunVisible = cycle < 0.72;
      sun.visible = sunVisible;

      if (sunVisible) {
        const t = cycle / 0.72;
        const angle = THREE.MathUtils.lerp(-2.55, 0.35, t);
        const radius = 17.5;

        const sunY =
          THREE.MathUtils.lerp(7.6, -1.1, t) + Math.sin(t * Math.PI) * 3.2;

        sun.position.set(
          Math.cos(angle) * radius,
          sunY,
          Math.sin(angle) * radius
        );

        sunGlow.position.copy(sun.position);
        sunLight.position.copy(sun.position);

        const fade = THREE.MathUtils.smoothstep(t, 0.68, 1);
        sunLight.intensity = THREE.MathUtils.lerp(4.8, 0, fade);
        sunGlow.intensity = THREE.MathUtils.lerp(3.5, 0, fade);
      } else {
        sunLight.intensity = 0;
        sunGlow.intensity = 0;
      }

      const moonVisible = cycle >= 0.72;
      moon.visible = moonVisible;

      if (moonVisible) {
        const t = (cycle - 0.72) / 0.28;

        moon.position.set(
          THREE.MathUtils.lerp(12, 6.5, t),
          THREE.MathUtils.lerp(3.6, 7.2, t),
          THREE.MathUtils.lerp(-9, -13, t)
        );

        moonGlow.position.copy(moon.position);
        moonLight.position.copy(moon.position);

        moonLight.intensity = THREE.MathUtils.lerp(0.5, 2.2, t);
        moonGlow.intensity = THREE.MathUtils.lerp(0.8, 2.8, t);
      } else {
        moonLight.intensity = 0;
        moonGlow.intensity = 0;
      }

      starMaterial.opacity = THREE.MathUtils.lerp(0, 0.9, nightStrength);

      cloudSprites.forEach((cloud, index) => {
        cloud.position.x += Math.sin(elapsed * 0.12 + index) * 0.001;
        cloud.position.z += Math.cos(elapsed * 0.1 + index) * 0.001;
      });

      rayGroup.children.forEach((ray) => {
        const material = (ray as THREE.Mesh).material as THREE.MeshBasicMaterial;
        material.opacity = THREE.MathUtils.lerp(0.15, 0, nightStrength);
      });

      waterfallUniforms.uTime.value = elapsed;
      waterfallUniforms.uNight.value = nightStrength;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;

        mesh.geometry?.dispose();

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

  return (
    <section className="service-island-hero">
      <div ref={mountRef} className="service-island-canvas" />

      {loading && (
        <div className="service-island-loader">
          <span />
          <p>Loading model...</p>
        </div>
      )}
    </section>
  );
}