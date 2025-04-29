import {StrictMode, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import "./index.css";

import App from './app.tsx'

import {UIProvider} from "@/general/providers/ui.provider.tsx";
import {AppFallback} from "@/general/components/AppFallback";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <UIProvider>
              <Suspense fallback={<AppFallback />} >
                  <App />
              </Suspense>
          </UIProvider>
      </BrowserRouter>
  </StrictMode>,
)
