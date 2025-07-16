import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// Добавляем импорты для AR
import { Canvas } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { ZapparCamera, ZapparCanvas, ImageTracker, ImageAnchor } from 'zappar-react-three-fiber'

function Model() {
  const gltf = useLoader(GLTFLoader, '/src/Cate2.glb');
  return <primitive object={gltf.scene} scale={1.5} />
}

function ARScene() {
  return (
    <ZapparCanvas style={{ width: '100vw', height: '60vh' }}>
      <ZapparCamera />
      {/* Можно использовать ImageTracker или InstantWorldTracker */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[2, 2, 2]} intensity={1} />
      <Model />
      <OrbitControls />
    </ZapparCanvas>
  )
}

function App() {


  return (
    <>
      {/* AR-сцена Zappar */}
      <ARScene />
      {/* Старый контент */}

    </>
  )
}

export default App
