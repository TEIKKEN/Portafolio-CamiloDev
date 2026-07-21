import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import '@fontsource-variable/geist';
import '@fontsource/instrument-serif';
import '@/styles/index.css';

import ErrorBoundary from '@/components/common/ErrorBoundary/ErrorBoundary';
import { LanguageProvider } from '@/app/context/LanguageContext';
import { AccessibilityProvider } from '@/app/context/AccessibilityContext';
import { EcosystemActivityProvider } from '@/app/context/EcosystemActivityContext';
import { SelectedPlanProvider } from '@/app/context/SelectedPlanContext';
import { PageReadyProvider } from '@/app/context/PageReadyContext';
import { reportWebVitals } from '@/utils/reportWebVitals';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <LanguageProvider>
          <AccessibilityProvider>
            <EcosystemActivityProvider>
              <SelectedPlanProvider>
                <PageReadyProvider>
                  <App />
                </PageReadyProvider>
              </SelectedPlanProvider>
            </EcosystemActivityProvider>
          </AccessibilityProvider>
        </LanguageProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);

reportWebVitals();