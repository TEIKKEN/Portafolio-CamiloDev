import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import EcosystemLights from '@/three/lights/EcosystemLights';
import EcosystemObject from '@/three/objects/EcosystemObject';
import EcosystemEffects from '@/three/postprocessing/EcosystemEffects';
import CameraRig from '@/three/camera/CameraRig';
import { useMouseParallax } from '@/three/animations/useMouseParallax';
import { useAccessibility } from '@/app/context/AccessibilityContext';
import { useViewportTier } from '@/hooks/useViewportTier';
import { TIER_CONFIG, CAMERA_BY_TIER } from '@/three/config/tierConfig';

const EcosystemCanvas = ({ scrollRef, paused = false }) => {
  const mouseRef = useMouseParallax();
  const { reducedMotion } = useAccessibility();
  const tier = useViewportTier();
  const config = TIER_CONFIG[tier];
  const camera = CAMERA_BY_TIER[tier];

  return (
    <Canvas
      dpr={config.dpr}
      frameloop={paused ? 'never' : 'always'}
      gl={{
        // Cuando hay postprocesado (bloom en tablet/desktop), el
        // EffectComposer ya hace su propio multisampling — dejar el
        // antialias nativo del contexto prendido duplica el costo de
        // AA en cada frame, compitiendo con el scroll justo en los
        // tiers más pesados (26 módulos, dpr hasta 1.75).
        antialias: !config.bloom,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      camera={camera}
    >
      <Suspense fallback={null}>
        <EcosystemLights />
        <Environment preset="city" resolution={256} background={false} />
        <EcosystemObject
          mouseRef={mouseRef}
          scrollRef={scrollRef}
          reducedMotion={reducedMotion}
          moduleCount={config.moduleCount}
        />
        <CameraRig scrollRef={scrollRef} reducedMotion={reducedMotion} />
        {!reducedMotion && config.bloom && <EcosystemEffects />}
      </Suspense>
    </Canvas>
  );
};

export default EcosystemCanvas;