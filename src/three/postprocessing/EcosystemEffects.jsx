import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

const EcosystemEffects = () => {
  return (
    <EffectComposer multisampling={4}>
      <Bloom intensity={0.42} luminanceThreshold={0.4} luminanceSmoothing={0.85} mipmapBlur />
      <Vignette eskil={false} offset={0.25} darkness={0.55} />
    </EffectComposer>
  );
};

export default EcosystemEffects;