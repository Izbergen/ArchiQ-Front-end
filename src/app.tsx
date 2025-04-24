import AppRouter from "./routes.tsx";

import {StoreProvider} from "@/general/providers/StoreProvider.tsx";

import {createStore} from "@/general/store";

export default function App() {
  const store = createStore();
  return (
      <StoreProvider store={store}>
        <AppRouter />
      </StoreProvider>

  )
}


