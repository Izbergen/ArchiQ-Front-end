import AppRouter from "./routes.tsx";

import {StoreProvider} from "@/general/providers/store.provider.tsx";

import {createStore} from "@/general/store";
import {DiProvider} from "@/general/providers/di.provider.tsx";
import {createRootDIContainer} from "@/general/di/root.container.ts";

export default function App() {
  const store = createStore();
  const rootContainer = createRootDIContainer();
  return (
      <DiProvider container={rootContainer} >
          <StoreProvider store={store}>
              <AppRouter />
          </StoreProvider>
      </DiProvider>

  )
}


