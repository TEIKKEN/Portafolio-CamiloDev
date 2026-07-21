import { createContext, useContext, useState, useMemo } from 'react';

const SelectedPlanContext = createContext(null);

/**
 * Puente entre las plan cards de Investment y el form de Contact —
 * viven en secciones distintas, así que necesitan un estado compartido
 * fuera de ambas. `selectedPlanId` es el `id` del plan elegido
 * ('landing' | 'business' | 'web3d' | 'frontend'), o null si no hay
 * selección. Sin persistencia en localStorage: se resetea al recargar,
 * igual que EcosystemActivityContext.
 */
export const SelectedPlanProvider = ({ children }) => {
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const api = useMemo(() => ({ selectedPlanId, setSelectedPlanId }), [selectedPlanId]);

  return <SelectedPlanContext.Provider value={api}>{children}</SelectedPlanContext.Provider>;
};

export function useSelectedPlan() {
  const ctx = useContext(SelectedPlanContext);
  if (!ctx) {
    throw new Error('useSelectedPlan debe usarse dentro de <SelectedPlanProvider>');
  }
  return ctx;
}
