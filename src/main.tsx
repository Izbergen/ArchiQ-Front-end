import {StrictMode, Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import "./index.css";

import App from './app.tsx'
import {Spinner, Text, VStack} from "@chakra-ui/react";
import {UIProvider} from "@/general/providers/ui.provider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <UIProvider>
              <Suspense fallback={
                  <VStack colorPalette="teal">
                      <Spinner color="colorPalette.600" />
                      <Text color="colorPalette.600">Application Loading...</Text>
                  </VStack>
              } >
                  <App />
              </Suspense>
          </UIProvider>
      </BrowserRouter>
  </StrictMode>,
)
