import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { METAL_GREYS, ACCENT_COLORS, ACTIVE_ACCENT, ACTIVE_RATIO } from '@/three/materials/moduleMaterial';
import { useEcosystemActivity } from '@/app/context/EcosystemActivityContext';
import ConnectionLines from './ConnectionLines';

const MIN_DISTANCE = 0.56;

const BREATH_PERIOD = 7;
const BREATH_ANGULAR = (Math.PI * 2) / BREATH_PERIOD;
const BREATH_DEPTH = 0.1;
const BREATH_SCALE_AMOUNT = 0.04;

function distance(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function normalize(v) {
  const len = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
}

function generateModules(count, radiusRange = [0.85, 1.2]) {
  const [radiusMin, radiusMax] = radiusRange;
  const CANDIDATE_POOL = count * 6;
  const candidates = [];
  for (let i = 0; i < CANDIDATE_POOL; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / CANDIDATE_POOL);
    const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
    const radius = radiusMin + Math.random() * (radiusMax - radiusMin);
    candidates.push([
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta) * 0.85,
      radius * Math.cos(phi),
    ]);
  }

  const positions = [];
  for (const candidate of candidates) {
    if (positions.length >= count) break;
    const tooClose = positions.some((p) => distance(p, candidate) < MIN_DISTANCE);
    if (!tooClose) positions.push(candidate);
  }
  let i = 0;
  while (positions.length < count && i < candidates.length) {
    positions.push(candidates[i]);
    i++;
  }

  return positions.map((position, i) => {
    const isActive = Math.random() < ACTIVE_RATIO;
    const isElongated = Math.random() < 0.3;
    const distFromCenter = Math.hypot(...position);

    return {
      id: i,
      position,
      direction: normalize(position),
      scale: 0.22 + Math.random() * 0.18,
      dims: isElongated ? [1, 1.2 + Math.random() * 0.3, 1] : [1, 1, 1],
      color: isActive ? '#3a3d40' : METAL_GREYS[Math.floor(Math.random() * METAL_GREYS.length)],
      isActive,
      accentColor: isActive ? ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)] : null,
      breathOffset: distFromCenter * 1.2,
    };
  });
}

const EcosystemObject = ({ mouseRef, scrollRef, reducedMotion, moduleCount = 26, radiusRange }) => {
  const groupRef = useRef();
  const modules = useMemo(
    () => (radiusRange ? generateModules(moduleCount, radiusRange) : generateModules(moduleCount)),
    [moduleCount, radiusRange]
  );
  const blockRefs = useRef([]);
  const materialStateRef = useRef([]);
  const { activeMode } = useEcosystemActivity();

  const calmRef = useRef(0);
  const frontendBoostRef = useRef(0);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;

    const t = state.clock.elapsedTime;
    const scrollProgress = scrollRef?.current ?? 0;

    if (!reducedMotion) {
      const targetX = (mouseRef?.current.x ?? 0) * 0.15;
      const targetY = (mouseRef?.current.y ?? 0) * -0.1;
      group.position.x = THREE.MathUtils.lerp(group.position.x, targetX, 0.02);
      group.position.y = THREE.MathUtils.lerp(group.position.y, targetY, 0.02);
    }

    const spread = 1 + scrollProgress * 0.2;
    group.scale.setScalar(THREE.MathUtils.lerp(group.scale.x, spread, 0.05));

    calmRef.current = THREE.MathUtils.lerp(calmRef.current, activeMode === 'accessibility' ? 1 : 0, 0.05);
    frontendBoostRef.current = THREE.MathUtils.lerp(
      frontendBoostRef.current,
      activeMode === 'frontend' ? 1 : 0,
      0.05
    );

    modules.forEach((mod, i) => {
      const mesh = blockRefs.current[i];
      if (!mesh) return;

      if (!reducedMotion) {
        const depthMultiplier = 1 - calmRef.current * 0.85;
        const breath = Math.sin(t * BREATH_ANGULAR - mod.breathOffset);
        const push = breath * BREATH_DEPTH * depthMultiplier;

        mesh.position.set(
          mod.position[0] + mod.direction[0] * push,
          mod.position[1] + mod.direction[1] * push,
          mod.position[2] + mod.direction[2] * push
        );
        mesh.scale.setScalar(mod.scale * (1 + breath * BREATH_SCALE_AMOUNT * depthMultiplier));
      }

      const material = mesh.material;
      if (!material) return;

      let targetIntensity = mod.isActive ? 0.4 : 0;
      let targetEmissiveHex = mod.isActive ? mod.accentColor : '#000000';

      if (frontendBoostRef.current > 0.01) {
        targetIntensity = THREE.MathUtils.lerp(targetIntensity, 0.32, frontendBoostRef.current);
        targetEmissiveHex = ACTIVE_ACCENT;
      } else if (calmRef.current > 0.01) {
        targetIntensity = THREE.MathUtils.lerp(targetIntensity, 0.22, calmRef.current);
        if (!mod.isActive) targetEmissiveHex = '#A9F7FF';
      }

      const nextIntensity = THREE.MathUtils.lerp(material.emissiveIntensity ?? 0, targetIntensity, 0.08);
      if (Math.abs((material.emissiveIntensity ?? 0) - nextIntensity) > 1e-6) {
        material.emissiveIntensity = nextIntensity;
      }

      const state = materialStateRef.current[i] ?? (materialStateRef.current[i] = { emissiveHex: '' });
      if (state.emissiveHex !== targetEmissiveHex) {
        material.emissive.set(targetEmissiveHex);
        state.emissiveHex = targetEmissiveHex;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {modules.map((mod, i) => (
        <RoundedBox
          key={mod.id}
          ref={(el) => (blockRefs.current[i] = el)}
          args={mod.dims}
          radius={0.035}
          smoothness={4}
          scale={mod.scale}
          position={mod.position}
        >
          <meshPhysicalMaterial
            color={mod.color}
            metalness={1}
            roughness={0.45}
            envMapIntensity={1.15}
            emissive={mod.isActive ? mod.accentColor : '#000000'}
            emissiveIntensity={mod.isActive ? 0.4 : 0}
          />
        </RoundedBox>
      ))}

      <ConnectionLines modules={modules} />
    </group>
  );
};

export default EcosystemObject;