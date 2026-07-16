import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Particle system component
function ParticleSystem({ count = 5000 }) {
    const ref = useRef();
    
    // Generate random positions for particles
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            pos[i3] = (Math.random() - 0.5) * 50;
            pos[i3 + 1] = (Math.random() - 0.5) * 50;
            pos[i3 + 2] = (Math.random() - 0.5) * 50;
        }
        return pos;
    }, [count]);

    // Generate colors for particles
    const colors = useMemo(() => {
        const cols = new Float32Array(count * 3);
        const colorPalette = [
            new THREE.Color('#b0b8c4'), // Cyber blue
            new THREE.Color('#ffd700'), // Gold
            new THREE.Color('#00ff88'), // Green
        ];
        
        for (let i = 0; i < count; i++) {
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            const i3 = i * 3;
            cols[i3] = color.r;
            cols[i3 + 1] = color.g;
            cols[i3 + 2] = color.b;
        }
        return cols;
    }, [count]);

    // Animate rotation
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.getElapsedTime() * 0.02;
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                vertexColors
                size={0.08}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
            <bufferAttribute
                attach="attributes-color"
                count={count}
                array={colors}
                itemSize={3}
            />
        </Points>
    );
}

// Floating geometric shapes
function FloatingGeometry() {
    const meshRef = useRef();
    
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
            meshRef.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.5;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -5]}>
            <icosahedronGeometry args={[2, 1]} />
            <meshBasicMaterial
                color="#b0b8c4"
                wireframe
                transparent
                opacity={0.3}
            />
        </mesh>
    );
}

// Main 3D background component
const ParticleField = ({ className = '' }) => {
    return (
        <div className={`fixed inset-0 z-0 ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 15], fov: 75 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <ParticleSystem count={3000} />
                <FloatingGeometry />
            </Canvas>
        </div>
    );
};

export default ParticleField;


