import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./App.css";

function ModelViewer() {
  const containerRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [controls, setControls] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setFileUrl(`http://127.0.0.1:5000/models/${data.filename}`);
        alert("File uploaded successfully!");
      } else {
        alert(`Upload failed: ${data.error}`);
      }
    } catch (error) {
      alert("Error uploading file!");
      console.error(error);
    }
  };

  useEffect(() => {
    if (!fileUrl) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const loader = new STLLoader();
    loader.load(fileUrl, (geometry) => {
      const material = new THREE.MeshStandardMaterial({ color: 0xcccccc });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const box = new THREE.Box3().setFromObject(mesh);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      const maxDim = Math.max(size.x, size.y, size.z);
      const cameraDistance = maxDim / (2 * Math.tan(Math.PI * camera.fov / 360));
      camera.position.set(center.x, center.y, cameraDistance + 2);
      camera.lookAt(center);

      mesh.rotation.x = -Math.PI / 2;
    });

    const orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.25;
    orbitControls.screenSpacePanning = false;
    setControls(orbitControls);

    const animate = () => {
      requestAnimationFrame(animate);
      orbitControls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      orbitControls.dispose();
    };
  }, [fileUrl]);

  const rotateModel = () => {
    if (controls) {
      controls.autoRotate = !controls.autoRotate;
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Web-Based CAD Viewer</h1>
      <div className="upload-section">
        <input type="file" accept=".stl, .obj" onChange={handleFileChange} className="file-input" />
        <button onClick={handleUpload} className="custom-button">Upload & View</button>
        <button onClick={rotateModel} className="custom-button">Toggle Auto-Rotation</button>
      </div>
      <div ref={containerRef} className="viewer-container" />
    </div>
  );
}

export default ModelViewer;
