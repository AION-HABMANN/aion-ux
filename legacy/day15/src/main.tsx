import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { App } from '@/App'
import { ModuleStoreProvider } from '@/state/ModuleStore'
import '@/index.css'

// HashRouter, not BrowserRouter: this ships as a static build and has to survive
// being dropped on any host without a rewrite rule.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <ModuleStoreProvider>
        <App />
      </ModuleStoreProvider>
    </HashRouter>
  </StrictMode>,
)
