import { StrictMode } from 'react';
import { HashRouter } from 'react-router-dom';
import { App } from '@/original/components/day15/App';
import { ModuleStoreProvider } from '@/original/components/day15/state/ModuleStore';

export default function Day15App() {
  return (
    <StrictMode>
      <HashRouter>
        <ModuleStoreProvider>
          <App />
        </ModuleStoreProvider>
      </HashRouter>
    </StrictMode>
  );
}
