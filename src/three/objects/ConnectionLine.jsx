import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEcosystemActivity } from '@/app/context/EcosystemActivityContext';

/**
 * Una línea individual entre dos módulos. Invisible por defecto
 * (opacity 0) — solo se desvanece hacia visible cuando activeMode
 * es '3d-motion' (hover en la card "3D & Motion").
 */
const ConnectionLine = ({ start, end }) => {
  const materialRef = useRef();
  const opacityRef = useRef(0);
  const { activeMode } = useEcosystemActivity();

  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...start), new THREE.Vector3(...end)]),
    [start, end]
  );

  useFrame(() => {
    const target = activeMode === '3d-motion' ? 0.3 : 0;
    opacityRef.current = THREE.MathUtils.lerp(opacityRef.current, target, 0.06);
    if (materialRef.current) materialRef.current.opacity = opacityRef.current;
  });

  return (
    <line geometry={geometry}>
      <lineBasicMaterial ref={materialRef} color="#A9F7FF" transparent opacity={0} />
    </line>
  );
};

export default ConnectionLine;