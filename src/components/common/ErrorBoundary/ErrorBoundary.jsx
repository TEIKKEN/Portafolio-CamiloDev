import { Component } from 'react';
import styles from './ErrorBoundary.module.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <DefaultFallback />;
    }

    return this.props.children;
  }
}

const DefaultFallback = () => (
  <div className={styles.fallback} role="alert">
    <p>Algo salió mal cargando esta sección.</p>
    <button onClick={() => window.location.reload()} className={styles.reload}>
      Recargar página
    </button>
  </div>
);

export default ErrorBoundary;
