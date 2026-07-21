// Radio (min, max) del "shell" esférico donde se generan los módulos.
// Con menos módulos (mobile) el shell por defecto (0.85–1.2, pensado
// para 20-26 módulos) queda demasiado disperso y se ve un hueco en el
// centro del cluster — un shell más chico y compacto mantiene la
// densidad percibida sin tocar tablet/desktop.
const DEFAULT_RADIUS_RANGE = [0.85, 1.2];
const MOBILE_RADIUS_RANGE = [0.6, 0.88];

export const TIER_CONFIG = {
  mobile: { moduleCount: 14, dpr: [1, 1.5], bloom: false, radiusRange: MOBILE_RADIUS_RANGE },
  tablet: { moduleCount: 20, dpr: [1, 1.75], bloom: true, radiusRange: DEFAULT_RADIUS_RANGE },
  desktop: { moduleCount: 26, dpr: [1, 1.75], bloom: true, radiusRange: DEFAULT_RADIUS_RANGE },
};

export const CAMERA_BY_TIER = {
  mobile: { position: [0, 0, 7.5], fov: 42 },
  tablet: { position: [0, 0, 6.5], fov: 40 },
  desktop: { position: [0, 0, 6], fov: 38 },
};