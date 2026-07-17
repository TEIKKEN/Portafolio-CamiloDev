import styles from './EcosystemFallback.module.css';

/**
 * Se muestra mientras el chunk de Three.js se descarga en paralelo.
 * No es un spinner — es un blob difuminado que ocupa el mismo espacio,
 * para que no haya salto de layout ni un vacío incómodo.
 */
const EcosystemFallback = () => <div className={styles.blob} aria-hidden="true" />;

export default EcosystemFallback;