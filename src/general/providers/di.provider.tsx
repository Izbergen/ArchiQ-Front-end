import { createContext, ReactNode } from "react";
import { Container } from "inversify";

export const DiContainerContext = createContext<Container | null>(null);

export function DiProvider({container , children} : { container: Container; children: ReactNode }) {
    return (
        <DiContainerContext.Provider value={container}>
            {children}
        </DiContainerContext.Provider>
    );
};
