import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const shapeTypes = ['cube', 'pyramid', 'sphere'];

function RotatingShape({ type }) {
  const shapeRef = useRef(null);
  const dragState = useRef({ active: false, pointerId: null, x: 0, y: 0 });
  const targetRotation = useRef({ x: -0.25, y: -0.45 });

  useFrame((_, delta) => {
    if (!shapeRef.current) return;
    if (!dragState.current.active) targetRotation.current.y += delta * 0.55;

    shapeRef.current.rotation.x +=
      (targetRotation.current.x - shapeRef.current.rotation.x) * 0.12;
    shapeRef.current.rotation.y +=
      (targetRotation.current.y - shapeRef.current.rotation.y) * 0.12;
  });

  const handlePointerDown = (event) => {
    event.stopPropagation();
    dragState.current = {
      active: true,
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    event.target.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (
      !dragState.current.active ||
      dragState.current.pointerId !== event.pointerId
    ) {
      return;
    }

    targetRotation.current.y +=
      (event.clientX - dragState.current.x) * 0.012;
    targetRotation.current.x = THREE.MathUtils.clamp(
      targetRotation.current.x +
        (event.clientY - dragState.current.y) * 0.012,
      -Math.PI * 0.85,
      Math.PI * 0.85,
    );
    dragState.current.x = event.clientX;
    dragState.current.y = event.clientY;
  };

  const handlePointerUp = (event) => {
    if (dragState.current.pointerId !== event.pointerId) return;
    dragState.current.active = false;
    dragState.current.pointerId = null;
    if (event.target.hasPointerCapture(event.pointerId)) {
      event.target.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <group
      ref={shapeRef}
      rotation={[-0.25, -0.45, 0]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <mesh castShadow receiveShadow>
        {type === 'cube' && <boxGeometry args={[1.7, 1.7, 1.7]} />}
        {type === 'pyramid' && <coneGeometry args={[1, 1.8, 4]} />}
        {type === 'sphere' && <sphereGeometry args={[0.98, 48, 48]} />}
        {type === 'cube' ? (
          <>
            <meshStandardMaterial attach="material-0" color="#1d4ed8" emissive="#0b1d55" emissiveIntensity={0.45} metalness={0.45} roughness={0.27} />
            <meshStandardMaterial attach="material-1" color="#1e40af" emissive="#081843" emissiveIntensity={0.5} metalness={0.32} roughness={0.3} />
            <meshStandardMaterial attach="material-2" color="#1e3a8a" emissive="#071535" emissiveIntensity={0.55} metalness={0.5} roughness={0.25} />
            <meshStandardMaterial attach="material-3" color="#2563eb" emissive="#0b1d55" emissiveIntensity={0.45} metalness={0.4} roughness={0.3} />
            <meshStandardMaterial attach="material-4" color="#1d4ed8" emissive="#081843" emissiveIntensity={0.5} metalness={0.48} roughness={0.28} />
            <meshStandardMaterial attach="material-5" color="#3b82f6" emissive="#102a66" emissiveIntensity={0.4} metalness={0.35} roughness={0.3} />
          </>
        ) : (
          <meshStandardMaterial
            color={type === 'pyramid' ? '#2563eb' : '#1d4ed8'}
            emissive="#0b1d55"
            emissiveIntensity={0.5}
            metalness={0.42}
            roughness={0.28}
            flatShading={type === 'pyramid'}
          />
        )}
      </mesh>
    </group>
  );
}

function ThreeDShapes({ translations }) {
  return (
    <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {shapeTypes.map((type, index) => {
        const { description, name } = translations.shapes[index];
        return (
          <article
            className="overflow-hidden rounded-2xl border border-blue-200/20 bg-gray-700 shadow-[0_0_28px_rgba(37,99,235,0.12)]"
            key={type}
          >
            <div className="relative h-64">
              <Canvas
                camera={{ position: [0, 0, 4.5], fov: 40 }}
                dpr={[1, 1.75]}
                gl={{ antialias: true, alpha: true }}
                onCreated={({ gl }) => gl.setClearColor('#374151', 0)}
                style={{ touchAction: 'none', cursor: 'grab' }}
              >
                <ambientLight intensity={0.8} />
                <directionalLight color="#ffffff" intensity={2.2} position={[3, 4, 5]} />
                <pointLight color="#1d4ed8" intensity={12} distance={7} position={[-3, 1, 2]} />
                <pointLight color="#60a5fa" intensity={7} distance={6} position={[2, -2, -2]} />
                <RotatingShape type={type} />
              </Canvas>
              <span className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-white/10 bg-gray-900/75 px-3 py-1 text-xs text-blue-50 backdrop-blur">
                {translations.dragHint}
              </span>
            </div>
            <div className="border-t border-white/10 p-5">
              <h4 className="text-lg font-semibold text-white">{name}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ThreeDShapes;
