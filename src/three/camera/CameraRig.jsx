import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Dolly sutil de cámara ligado al scroll del Hero — un leve acercamiento,
 * nada brusco.
 */
const CameraRig = ({ scrollRef, reducedMotion }) => {
  const { camera } = useThree();
  const baseZ = useRef(5.5);

  useFrame(() => {
    if (reducedMotion) return;
    const progress = scrollRef?.current ?? 0;
    const targetZ = baseZ.current - progress * 0.8;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
  });

  return null;
};

export default CameraRig;