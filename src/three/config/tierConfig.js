export const TIER_CONFIG = {
  mobile: { moduleCount: 14, dpr: [1, 1.5], bloom: false },
  tablet: { moduleCount: 20, dpr: [1, 1.75], bloom: true },
  desktop: { moduleCount: 26, dpr: [1, 1.75], bloom: true },
};

export const CAMERA_BY_TIER = {
  mobile: { position: [0, 0, 7.5], fov: 42 },
  tablet: { position: [0, 0, 6.5], fov: 40 },
  desktop: { position: [0, 0, 6], fov: 38 },
};