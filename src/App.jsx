import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as ZapparThree from '@zappar/zappar-threejs';
import './App.css';

function ARZappar() {
  const mountRef = useRef();

  useEffect(() => {
    let renderer, scene, camera, zapparCamera, model;
    let frameId;
    let imageTracker, imageAnchorGroup;

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight * 0.7);
    mountRef.current.appendChild(renderer.domElement);

    // Scene
    scene = new THREE.Scene();

    // Zappar camera
    zapparCamera = new ZapparThree.Camera();
    camera = zapparCamera;
    scene.add(camera);

    // Свет
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Трекинг по изображению (можно убрать, если не нужен)
    // imageTracker = new ZapparThree.ImageTrackerLoader().load('PATH_TO_YOUR_IMAGE_TRACKER');
    // imageAnchorGroup = new ZapparThree.ImageAnchorGroup(zapparCamera, imageTracker);
    // scene.add(imageAnchorGroup);

    // Загрузка модели
    const loader = new GLTFLoader();
    loader.load('./Cate2.glb', (gltf) => {
      model = gltf.scene;
      model.scale.set(1.5, 1.5, 1.5);
      model.position.set(0, 0, -5); // Перед камерой
      scene.add(model);
    });

    // Запуск камеры
    ZapparThree.permissionRequestUI().then((granted) => {
      if (granted) {
        ZapparThree.permissionGrantedUI();
        zapparCamera.start();
      } else {
        ZapparThree.permissionDeniedUI();
      }
    });

    // Анимация
    const animate = () => {
      zapparCamera.updateFrame();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Очистка
    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (renderer.domElement && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '70vh' }} />;
}

export default function App() {
  return (
    <>
      <ARZappar />
    </>
  );
}
