/**
 * Fuente única de verdad para breakpoints en JS.
 * Los valores DEBEN coincidir con los comentarios en
 * styles/utilities/layout.css, ya que CSS no permite var() dentro de
 * @media — esos media queries están hardcodeados a propósito.
 */

export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1536,
};

export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.mobile}px)`,
  tablet: `(max-width: ${BREAKPOINTS.tablet}px)`,
  laptop: `(max-width: ${BREAKPOINTS.laptop}px)`,
  desktop: `(max-width: ${BREAKPOINTS.desktop}px)`,
};
