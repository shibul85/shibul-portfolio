import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Points, PointMaterial, MeshDistortMaterial } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

function TransitionWrapper({ children, isVisible }: { children: React.ReactNode, isVisible: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const opacityRef = useRef(isVisible ? 1 : 0);

  useFrame((_state, _delta) => {
    const targetOpacity = isVisible ? 1 : 0;
    opacityRef.current = THREE.MathUtils.lerp(opacityRef.current, targetOpacity, 0.05);
    
    if (groupRef.current) {
      groupRef.current.visible = opacityRef.current > 0.001;
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, isVisible ? 1 : 0.8, 0.05));
      
      groupRef.current.traverse((child) => {
        if ((child as any).material) {
          const materials = Array.isArray((child as any).material) ? (child as any).material : [(child as any).material];
          materials.forEach((m: any) => {
            if (m.userData.originalOpacity === undefined) {
              m.userData.originalOpacity = m.opacity ?? 1;
            }
            m.transparent = true;
            m.opacity = opacityRef.current * m.userData.originalOpacity;
          });
        }
      });
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

function DistortedSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (sphereRef.current) {
      sphereRef.current.rotation.y = time * 0.2;
      sphereRef.current.rotation.x = THREE.MathUtils.lerp(sphereRef.current.rotation.x, mouse.y * 0.5, 0.05);
      sphereRef.current.rotation.z = THREE.MathUtils.lerp(sphereRef.current.rotation.z, mouse.x * 0.5, 0.05);
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.1 + Math.sin(time * 2) * 0.05);
    }
  });

  return (
    <group>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[2.5, 128, 128]} />
        <MeshDistortMaterial
          color="#7F5AF0"
          speed={3}
          distort={0.4}
          radius={1}
          emissive="#7F5AF0"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          transparent
        />
      </mesh>
      <mesh ref={glowRef} scale={1.1}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial 
          color="#7F5AF0" 
          transparent 
          opacity={0.1} 
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={10} color="#00E5FF" distance={10} />
      <pointLight position={[5, 5, 5]} intensity={5} color="#7F5AF0" />
    </group>
  );
}

function Globe() {
  const globeRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = time * 0.1;
      globeRef.current.rotation.x = THREE.MathUtils.lerp(globeRef.current.rotation.x, mouse.y * 0.1, 0.05);
      globeRef.current.rotation.z = THREE.MathUtils.lerp(globeRef.current.rotation.z, mouse.x * 0.05, 0.05);
    }
  });

  const axisGeometry = useMemo(() => {
    const points = [new THREE.Vector3(0, -4, 0), new THREE.Vector3(0, 4, 0)];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  const axisMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.1 }), []);

  return (
    <group ref={globeRef}>
      <mesh>
        <sphereGeometry args={[3.5, 40, 40]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.08} />
      </mesh>
      <mesh>
        <sphereGeometry args={[3.45, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.02} side={THREE.BackSide} />
      </mesh>
      <primitive object={new THREE.Line(axisGeometry, axisMaterial)} />
      <Points limit={500}>
        <sphereGeometry args={[3.52, 32, 32]} />
        <PointMaterial transparent color="#ffffff" size={0.02} sizeAttenuation depthWrite={false} opacity={0.2} />
      </Points>
    </group>
  );
}

function Hand() {
  const handRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (handRef.current) {
      handRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      handRef.current.rotation.x = THREE.MathUtils.lerp(handRef.current.rotation.x, mouse.y * 0.4, 0.05);
      handRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.3;
    }
  });

  return (
    <group ref={handRef}>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[2, 2.5, 0.8]} />
        <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} emissive="#7F5AF0" emissiveIntensity={0.1} transparent />
      </mesh>
      {[ -0.75, -0.25, 0.25, 0.75 ].map((x, i) => (
        <mesh key={i} position={[x, 1.5, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 2, 16]} />
          <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} emissive="#00E5FF" emissiveIntensity={0.1} transparent />
        </mesh>
      ))}
      <mesh position={[-1.2, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.2, 0.2, 1.5, 16]} />
        <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.2} emissive="#00E5FF" emissiveIntensity={0.1} transparent />
      </mesh>
      <Points limit={1000}>
        <boxGeometry args={[2.2, 2.7, 1]} />
        <PointMaterial transparent color="#7F5AF0" size={0.02} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </Points>
    </group>
  );
}

function Brain() {
  const brainRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (brainRef.current) {
      brainRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      brainRef.current.rotation.x = THREE.MathUtils.lerp(brainRef.current.rotation.x, mouse.y * 0.3, 0.05);
      brainRef.current.rotation.z = THREE.MathUtils.lerp(brainRef.current.rotation.z, mouse.x * 0.1, 0.05);
    }
  });

  return (
    <group ref={brainRef}>
      <mesh>
        <torusKnotGeometry args={[2, 0.6, 128, 32, 2, 3]} />
        <meshStandardMaterial color="#050505" roughness={0.2} metalness={0.9} emissive="#00E5FF" emissiveIntensity={0.1} transparent />
      </mesh>
      <mesh scale={1.02}>
        <torusKnotGeometry args={[2, 0.6, 64, 16, 2, 3]} />
        <meshBasicMaterial color="#7F5AF0" wireframe transparent opacity={0.2} />
      </mesh>
      <Points limit={2000}>
        <torusKnotGeometry args={[2.05, 0.65, 128, 32, 2, 3]} />
        <PointMaterial transparent color="#FFFFFF" size={0.015} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </Points>
    </group>
  );
}

function Rocket() {
  const rocketRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (rocketRef.current) {
      rocketRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      rocketRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.2;
      rocketRef.current.rotation.z = THREE.MathUtils.lerp(rocketRef.current.rotation.z, -mouse.x * 0.5, 0.05);
      rocketRef.current.rotation.x = THREE.MathUtils.lerp(rocketRef.current.rotation.x, mouse.y * 0.5, 0.05);
    }
  });

  return (
    <group ref={rocketRef} rotation={[0, 0, Math.PI / 4]}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 1, 4, 32]} />
        <meshStandardMaterial color="#050505" metalness={1} roughness={0.1} emissive="#7F5AF0" emissiveIntensity={0.05} transparent />
      </mesh>
      <mesh position={[0, 3, 0]}>
        <coneGeometry args={[0.8, 2, 32]} />
        <meshStandardMaterial color="#050505" metalness={1} roughness={0.1} emissive="#00E5FF" emissiveIntensity={0.1} transparent />
      </mesh>
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.8, -1.5, Math.sin(angle) * 0.8]} rotation={[0, -angle, 0]}>
          <boxGeometry args={[0.1, 1.5, 1]} />
          <meshStandardMaterial color="#7F5AF0" transparent opacity={0.8} />
        </mesh>
      ))}
      <mesh position={[0, -2.2, 0]}>
        <cylinderGeometry args={[0.6, 0.4, 0.5, 32]} />
        <meshBasicMaterial color="#00E5FF" transparent />
      </mesh>
      <pointLight position={[0, -3, 0]} intensity={5} color="#00E5FF" distance={5} />
    </group>
  );
}

interface SceneProps {
  modelType: 'globe' | 'brain' | 'rocket' | 'glove' | 'sphere';
}

export default function Scene({ modelType }: SceneProps) {
  return (
    <div className="fixed inset-0 -z-10 bg-[#010103] pointer-events-none">
      <div className="absolute inset-0 grid-bg mask-radial opacity-5 pointer-events-none" />
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 45 }} 
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={2} color="#00E5FF" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#7F5AF0" />
        <Stars radius={100} depth={50} count={8000} factor={4} saturation={0} fade speed={1} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
          <TransitionWrapper isVisible={modelType === 'globe'}>
            <Globe />
          </TransitionWrapper>
          <TransitionWrapper isVisible={modelType === 'brain'}>
            <Brain />
          </TransitionWrapper>
          <TransitionWrapper isVisible={modelType === 'rocket'}>
            <Rocket />
          </TransitionWrapper>
          <TransitionWrapper isVisible={modelType === 'glove'}>
            <Hand />
          </TransitionWrapper>
          <TransitionWrapper isVisible={modelType === 'sphere'}>
            <DistortedSphere />
          </TransitionWrapper>
        </Float>
      </Canvas>
    </div>
  );
}
