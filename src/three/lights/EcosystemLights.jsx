import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEcosystemActivity } from '@/app/context/EcosystemActivityContext';

/**
 * Hover en "Workflow" (Skills) = "cambia la iluminación": sube
 * levemente la luz clave y la ambiental, como si el sistema se
 * "reconfigurara". Nada agresivo — un flood sutil.
 */
const EcosystemLights = () => {
  const { activeMode } = useEcosystemActivity();
  const keyLightRef = useRef();
  const ambientRef = useRef();

  useFrame(() => {
    const boost = activeMode === 'workflow' ? 1 : 0;
    if (keyLightRef.current) {
      keyLightRef.current.intensity = THREE.MathUtils.lerp(
        keyLightRef.current.intensity,
        1.4 + boost * 0.9,
        0.05
      );
    }
    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(
        ambientRef.current.intensity,
        0.25 + boost * 0.2,
        0.05
      );
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.25} />
      <directionalLight ref={keyLightRef} position={[4, 5, 6]} intensity={1.4} color="#F8F6F1" />
      <pointLight position={[-4, -2, -3]} intensity={0.8} color="#6CF4C5" />
      <pointLight position={[3, -3, 2]} intensity={0.5} color="#A9F7FF" />
    </>
  );
};

export default EcosystemLights;