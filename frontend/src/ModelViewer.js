// src/ModelViewer.js

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'; // For STL files

const ModelViewer = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add a light to the scene
    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);

    // Load and display the model
    const loader = new STLLoader();
    loader.load('/models/model.stl', (geometry) => {
      const material = new THREE.MeshStandardMaterial({ color: 0x7f7f7f });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ModelViewer;
