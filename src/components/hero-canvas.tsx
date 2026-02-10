"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/* ── Morphing Dodecahedron ── */
function MorphingCore() {
    const ref = useRef<THREE.Mesh>(null);
    const matRef = useRef<any>(null);

    useFrame(({ clock, pointer }) => {
        if (ref.current) {
            ref.current.rotation.x = clock.getElapsedTime() * 0.05;
            ref.current.rotation.y = clock.getElapsedTime() * 0.07;
            ref.current.position.x += (pointer.x * 0.4 - ref.current.position.x) * 0.015;
            ref.current.position.y += (pointer.y * 0.3 - ref.current.position.y) * 0.015;
        }
        if (matRef.current) {
            matRef.current.distort = 0.25 + Math.sin(clock.getElapsedTime() * 0.6) * 0.12;
        }
    });

    return (
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
            <mesh ref={ref} scale={1.4}>
                <dodecahedronGeometry args={[1, 4]} />
                <MeshDistortMaterial
                    ref={matRef}
                    color="#0E0E18"
                    emissive="#818CF8"
                    emissiveIntensity={0.05}
                    roughness={0.12}
                    metalness={0.95}
                    distort={0.25}
                    speed={1.2}
                    transparent
                    opacity={0.7}
                />
            </mesh>
        </Float>
    );
}

/* ── Wireframe rings ── */
function Ring({ radius = 2, speed = 0.04, axis = "y" }: { radius?: number; speed?: number; axis?: string }) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        if (ref.current) {
            if (axis === "y") ref.current.rotation.y = clock.getElapsedTime() * speed;
            else ref.current.rotation.x = clock.getElapsedTime() * speed;
            ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
        }
    });
    return (
        <mesh ref={ref}>
            <torusGeometry args={[radius, 0.004, 64, 128]} />
            <meshBasicMaterial color="#818CF8" transparent opacity={0.12} />
        </mesh>
    );
}

/* ── Star dust ── */
function DustField() {
    const ref = useRef<THREE.Points>(null);
    const positions = useMemo(() => {
        const pos = new Float32Array(400 * 3);
        for (let i = 0; i < 400; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 18;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
        }
        return pos;
    }, []);
    useFrame(({ clock }) => {
        if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.002;
    });
    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial color="#F4F4F5" size={0.008} transparent opacity={0.2} sizeAttenuation />
        </points>
    );
}

/* ── Mouse light ── */
function MouseLight() {
    const ref = useRef<THREE.PointLight>(null);
    useFrame(({ pointer }) => {
        if (ref.current) {
            ref.current.position.x = pointer.x * 4;
            ref.current.position.y = pointer.y * 3;
        }
    });
    return <pointLight ref={ref} color="#818CF8" intensity={0.3} distance={10} position={[0, 0, 4]} />;
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.06} />
            <directionalLight position={[5, 5, 5]} intensity={0.12} color="#E0E0FF" />
            <MouseLight />
            <MorphingCore />
            <Ring radius={2.2} speed={0.03} axis="y" />
            <Ring radius={2.6} speed={-0.02} axis="x" />
            <DustField />
            <Sparkles count={25} scale={7} size={1.0} speed={0.15} color="#818CF8" opacity={0.12} />
        </>
    );
}

export function HeroCanvas() {
    return (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
            <Canvas
                camera={{ position: [0, 0, 5], fov: 40 }}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                style={{ pointerEvents: "auto" }}
                dpr={[1, 1.5]}
            >
                <Scene />
            </Canvas>
        </div>
    );
}
