import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const BILLBOARD_SPECS = [
  { title: "Shader Breakdown", tag: "Placeholder A", position: [-6.2, 2.3, 10], yaw: 0.42, hue: 205 },
  { title: "Realtime Demo", tag: "Placeholder B", position: [6.4, 2.1, 2], yaw: -0.4, hue: 188 },
  { title: "Engine Systems", tag: "Placeholder C", position: [-6.0, 2.4, -8], yaw: 0.45, hue: 224 },
  { title: "Tools Pipeline", tag: "Placeholder D", position: [6.1, 2.15, -16], yaw: -0.45, hue: 196 },
];

function makeBillboardTexture(title, tag, hue) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 576;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, `hsla(${hue}, 55%, 22%, 0.95)`);
  gradient.addColorStop(1, "rgba(6, 10, 18, 0.95)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Accent glow
  ctx.fillStyle = `hsla(${hue}, 90%, 70%, 0.18)`;
  ctx.beginPath();
  ctx.arc(canvas.width * 0.2, canvas.height * 0.2, 190, 0, Math.PI * 2);
  ctx.fill();

  // Grid lines
  ctx.strokeStyle = "rgba(170, 220, 255, 0.12)";
  ctx.lineWidth = 2;
  for (let x = 0; x < canvas.width; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  // Frame lines
  ctx.strokeStyle = "rgba(180, 230, 255, 0.45)";
  ctx.lineWidth = 4;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  ctx.fillStyle = "rgba(210, 242, 255, 0.95)";
  ctx.font = "700 58px sans-serif";
  ctx.textBaseline = "top";
  ctx.fillText(title.toUpperCase(), 50, 62);

  ctx.fillStyle = "rgba(193, 224, 247, 0.78)";
  ctx.font = "600 28px monospace";
  ctx.fillText(tag.toUpperCase(), 52, 140);

  // Placeholder bars
  const bars = [290, 340, 390, 440];
  bars.forEach((y, i) => {
    ctx.fillStyle = i === 0 ? `hsla(${hue}, 85%, 70%, 0.55)` : "rgba(195, 228, 255, 0.16)";
    ctx.fillRect(52, y, i === 0 ? 620 : 760 - i * 80, 18);
  });

  // Corner markers
  ctx.strokeStyle = `hsla(${hue}, 100%, 75%, 0.85)`;
  ctx.lineWidth = 5;
  const corners = [
    [36, 36, 74, 36, 36, 74],
    [canvas.width - 36, 36, canvas.width - 74, 36, canvas.width - 36, 74],
    [36, canvas.height - 36, 74, canvas.height - 36, 36, canvas.height - 74],
    [canvas.width - 36, canvas.height - 36, canvas.width - 74, canvas.height - 36, canvas.width - 36, canvas.height - 74],
  ];
  corners.forEach(([x1, y1, x2, y2, x3, y3]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.moveTo(x1, y1);
    ctx.lineTo(x3, y3);
    ctx.stroke();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function HeroFlythrough3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    let rafId = 0;
    let disposed = false;
    const disposables = [];

    try {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x05070e);
      scene.fog = new THREE.Fog(0x05070e, 10, 140);

      const camera = new THREE.PerspectiveCamera(
        58,
        mount.clientWidth / mount.clientHeight || 16 / 9,
        0.1,
        320
      );
      camera.position.set(0, 2, 8);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
      renderer.setSize(mount.clientWidth || 1, mount.clientHeight || 1);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      mount.appendChild(renderer.domElement);

      const sceneRoot = new THREE.Group();
      scene.add(sceneRoot);

      const hemiLight = new THREE.HemisphereLight(0x8dc3ff, 0x090b12, 0.8);
      scene.add(hemiLight);

      const keyLight = new THREE.DirectionalLight(0xa8daff, 0.9);
      keyLight.position.set(10, 18, 12);
      scene.add(keyLight);

      const rimLight = new THREE.PointLight(0x46a8ff, 1.15, 40, 2);
      rimLight.position.set(0, 4, 4);
      scene.add(rimLight);

      const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x070b14,
        roughness: 0.9,
        metalness: 0.05,
        emissive: 0x02050a,
      });
      disposables.push(groundMaterial);

      const ground = new THREE.Mesh(new THREE.PlaneGeometry(160, 220), groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -1.3;
      sceneRoot.add(ground);
      disposables.push(ground.geometry);

      const grid = new THREE.GridHelper(180, 72, 0x2f6fb5, 0x15304d);
      grid.position.y = -1.28;
      const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
      gridMaterials.forEach((mat) => {
        mat.transparent = true;
        mat.opacity = 0.35;
      });
      sceneRoot.add(grid);

      const path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 1.6, 20),
        new THREE.Vector3(4.5, 2.0, 9),
        new THREE.Vector3(-5.5, 1.9, -3),
        new THREE.Vector3(6.8, 2.2, -16),
        new THREE.Vector3(-4.2, 2.0, -30),
        new THREE.Vector3(4.8, 2.25, -44),
        new THREE.Vector3(0, 1.9, -62),
      ]);

      const blockGeometry = new THREE.BoxGeometry(1, 1, 1);
      const blockMaterial = new THREE.MeshStandardMaterial({
        color: 0x111827,
        roughness: 0.85,
        metalness: 0.18,
        emissive: 0x0a111d,
        emissiveIntensity: 0.35,
      });
      disposables.push(blockGeometry, blockMaterial);

      const accentMaterial = new THREE.MeshBasicMaterial({
        color: 0x69c6ff,
        transparent: true,
        opacity: 0.18,
      });
      disposables.push(accentMaterial);

      const envGroup = new THREE.Group();
      sceneRoot.add(envGroup);

      for (let i = 0; i < 70; i += 1) {
        const z = 22 - i * 1.35;
        const leftX = -8.2 - (i % 5) * 0.7;
        const rightX = 8.2 + (i % 4) * 0.7;
        const leftHeight = 2.5 + (i % 7) * 0.75;
        const rightHeight = 2 + ((i + 3) % 6) * 0.9;
        const leftDepth = 1.8 + (i % 3) * 0.5;
        const rightDepth = 1.5 + ((i + 1) % 4) * 0.45;

        const leftBlock = new THREE.Mesh(blockGeometry, blockMaterial);
        leftBlock.position.set(leftX, leftHeight / 2 - 1.2, z);
        leftBlock.scale.set(2.4, leftHeight, leftDepth);
        envGroup.add(leftBlock);

        const rightBlock = new THREE.Mesh(blockGeometry, blockMaterial);
        rightBlock.position.set(rightX, rightHeight / 2 - 1.2, z - 0.35);
        rightBlock.scale.set(2.2, rightHeight, rightDepth);
        envGroup.add(rightBlock);

        if (i % 2 === 0) {
          const leftAccent = new THREE.Mesh(blockGeometry, accentMaterial);
          leftAccent.position.set(leftX + 0.95, leftHeight - 1.3, z + 0.15);
          leftAccent.scale.set(0.06, Math.max(0.6, leftHeight * 0.6), leftDepth + 0.04);
          envGroup.add(leftAccent);

          const rightAccent = new THREE.Mesh(blockGeometry, accentMaterial);
          rightAccent.position.set(rightX - 0.95, rightHeight - 1.3, z - 0.2);
          rightAccent.scale.set(0.06, Math.max(0.6, rightHeight * 0.6), rightDepth + 0.04);
          envGroup.add(rightAccent);
        }
      }

      const tunnelLines = new THREE.Group();
      sceneRoot.add(tunnelLines);
      const lineGeo = new THREE.BoxGeometry(0.05, 0.05, 160);
      const lineMat = new THREE.MeshBasicMaterial({
        color: 0x2d7ec9,
        transparent: true,
        opacity: 0.22,
      });
      disposables.push(lineGeo, lineMat);

      [-3.2, 0, 3.2].forEach((x, idx) => {
        const line = new THREE.Mesh(lineGeo, lineMat);
        line.position.set(x, idx === 1 ? -0.95 : -1.05, -60);
        tunnelLines.add(line);
      });

      const billboardGroup = new THREE.Group();
      sceneRoot.add(billboardGroup);

      const panelGeometry = new THREE.PlaneGeometry(4.8, 2.7);
      disposables.push(panelGeometry);

      const billboardMaterials = [];
      BILLBOARD_SPECS.forEach((spec) => {
        const texture = makeBillboardTexture(spec.title, spec.tag, spec.hue);
        if (texture) disposables.push(texture);
        const material = new THREE.MeshBasicMaterial({
          map: texture || null,
          color: texture ? 0xffffff : 0x3e78c4,
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide,
        });
        disposables.push(material);
        billboardMaterials.push(material);

        const panel = new THREE.Mesh(panelGeometry, material);
        panel.position.set(...spec.position);
        panel.rotation.y = spec.yaw;
        panel.userData.baseY = panel.position.y;
        billboardGroup.add(panel);

        const frame = new THREE.Mesh(
          new THREE.PlaneGeometry(5.1, 3.0),
          new THREE.MeshBasicMaterial({
            color: 0x78ccff,
            transparent: true,
            opacity: 0.08,
            side: THREE.DoubleSide,
          })
        );
        frame.position.copy(panel.position);
        frame.rotation.copy(panel.rotation);
        frame.userData.baseY = frame.position.y;
        billboardGroup.add(frame);
        disposables.push(frame.geometry, frame.material);
      });

      // Add floating "marker" dots around the path for depth cues.
      const markerGeometry = new THREE.SphereGeometry(0.06, 10, 10);
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: 0x8cd6ff,
        transparent: true,
        opacity: 0.35,
      });
      disposables.push(markerGeometry, markerMaterial);
      const markerGroup = new THREE.Group();
      sceneRoot.add(markerGroup);
      for (let i = 0; i < 90; i += 1) {
        const m = new THREE.Mesh(markerGeometry, markerMaterial);
        m.position.set(
          (Math.random() - 0.5) * 20,
          Math.random() * 8 - 1,
          -Math.random() * 120 + 15
        );
        markerGroup.add(m);
      }

      const clock = new THREE.Clock();
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const speed = reducedMotion ? 0.012 : 0.032;

      const onResize = () => {
        if (!mount || !renderer) return;
        const width = Math.max(1, mount.clientWidth);
        const height = Math.max(1, mount.clientHeight);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener("resize", onResize);

      const animate = () => {
        if (disposed) return;
        const elapsed = clock.getElapsedTime();
        const t = (elapsed * speed) % 1;

        const position = path.getPointAt(t);
        const lookAtPoint = path.getPointAt((t + 0.014) % 1);
        camera.position.copy(position);
        camera.lookAt(lookAtPoint);
        camera.rotation.z = Math.sin(elapsed * 1.35) * 0.01;

        rimLight.position.z = camera.position.z + 8;
        rimLight.position.x = camera.position.x * 0.5;

        billboardGroup.children.forEach((obj, index) => {
          if (!(obj instanceof THREE.Mesh)) return;
          const wobble = Math.sin(elapsed * 1.8 + index * 0.45) * 0.02;
          obj.position.y = (obj.userData.baseY || obj.position.y) + wobble;
        });

        billboardMaterials.forEach((mat, index) => {
          mat.opacity = 0.78 + Math.sin(elapsed * 2 + index * 0.6) * 0.12;
        });

        markerGroup.rotation.y = elapsed * 0.03;
        grid.position.z = ((elapsed * 8) % 40) * -0.02;

        renderer.render(scene, camera);
        rafId = window.requestAnimationFrame(animate);
      };

      onResize();
      rafId = window.requestAnimationFrame(animate);

      return () => {
        disposed = true;
        window.cancelAnimationFrame(rafId);
        window.removeEventListener("resize", onResize);
        if (renderer) {
          renderer.dispose();
          if (renderer.domElement.parentNode === mount) {
            mount.removeChild(renderer.domElement);
          }
        }
        disposables.forEach((item) => item?.dispose?.());
        scene.clear();
      };
    } catch (error) {
      // Leave the container empty so CSS fallback/background remains visible.
      if (renderer && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      return undefined;
    }
  }, []);

  return <div className="hero-flythrough-canvas" ref={mountRef} aria-hidden="true" />;
}

export default HeroFlythrough3D;
