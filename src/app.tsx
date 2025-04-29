import { use, Suspense } from "react"
import AppRouter from "./routes.tsx";

import {StoreProvider} from "@/general/providers/store.provider.tsx";

import {createStore} from "@/general/store";
import {DiProvider} from "@/general/providers/di.provider.tsx";
import {createRootDIContainer} from "@/general/di/root.container.ts";

import FullPageSpinner from "@/general/components/FullPageSpinner";

const containerPromise = createRootDIContainer();



export default function App() {
  const store = createStore();
  const rootContainer = use(containerPromise);
  return (
          <DiProvider container={rootContainer} >
              <StoreProvider store={store}>
                  <Suspense fallback={<FullPageSpinner />}>
                      <AppRouter />
                  </Suspense>
              </StoreProvider>
          </DiProvider>
  )
}


