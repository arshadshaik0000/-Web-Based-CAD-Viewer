import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function ModelViewer() {
  const containerRef = useRef(null);
  const [controls, setControls] = useState(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting for better visibility
    const light = new THREE.AmbientLight(0x404040, 2); // Ambient light
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Directional light
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load the STL model
    const loader = new STLLoader();
    loader.load("/models/model.stl", (geometry) => {
      const material = new THREE.MeshStandardMaterial({ color: 0xcccccc });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Calculate the bounding box of the model
      const box = new THREE.Box3().setFromObject(mesh);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      // Adjust the camera position to fit the model within the viewport
      const maxDim = Math.max(size.x, size.y, size.z);
      const cameraDistance = maxDim / (2 * Math.tan(Math.PI * camera.fov / 360));
      camera.position.set(center.x, center.y, cameraDistance);
      camera.lookAt(center); // Ensure the camera is pointing to the center of the model

      // Optional: You can set the initial rotation if needed
      mesh.rotation.x = -Math.PI / 2; // Rotate to fit the view (if needed)
    });

    // Set up OrbitControls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true; // Smooth controls
    orbitControls.dampingFactor = 0.25; // Damping effect
    orbitControls.screenSpacePanning = false; // Disables panning in screen space

    setControls(orbitControls); // Store the controls in state

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update controls (for damping and smoothness)
      if (orbitControls) {
        orbitControls.update();
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle window resizing
    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    return () => {
      window.removeEventListener("resize", () => {});
      orbitControls.dispose(); // Dispose of controls on cleanup
    };
  }, []);

  const rotateModel = () => {
    if (controls) {
      // Enable or disable auto-rotation
      controls.autoRotate = !controls.autoRotate; // Toggle auto-rotation
    }
  };

  return (
    <div>
      <div ref={containerRef} />
      <div style={{ position: "absolute", top: 10, left: 10, zIndex: 1 }}>
        <button onClick={rotateModel}>Toggle Auto-Rotation</button>
      </div>
    </div>
  );
}

export default ModelViewer;
