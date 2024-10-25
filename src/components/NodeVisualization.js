import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Line } from '@react-three/drei'
import * as THREE from 'three'
import { nodeConnections, nodePositions } from '../data/nodeData'

function Node({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

function Connection({ start, end }) {
  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)]

  return (
    <Line
      points={points}
      color="white"
      lineWidth={1}
    />
  )
}

function NodeStructure() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {nodeConnections.map((connection) => (
        <Connection
          key={connection.member}
          start={nodePositions[connection.startNode]}
          end={nodePositions[connection.endNode]}
        />
      ))}
      {Object.entries(nodePositions).map(([key, position]) => (
        <Node key={key} position={position} />
      ))}
    </group>
  )
}

function Axes() {
  return (
    <group>
      <Line points={[[-100, 0, 0], [100, 0, 0]]} color="red" />
      <Line points={[[0, -100, 0], [0, 100, 0]]} color="green" />
      <Line points={[[0, 0, -100], [0, 0, 100]]} color="blue" />
    </group>
  )
}

export default function NodeVisualization() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#1a1a1a' }}>
      <Canvas camera={{ position: [0, 0, 200], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <NodeStructure />
        <Axes />
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      </Canvas>
    </div>
  )
}