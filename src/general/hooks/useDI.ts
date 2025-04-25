import { useContext } from 'react';
import { DiContainerContext } from '@/general/providers/di.provider';
import type { ServiceIdentifier } from 'inversify';

export function useDI<T>(identifier: ServiceIdentifier<T>): T {
    const container = useContext(DiContainerContext);
    if (!container) {
        throw new Error('DI-container не найден');
    }
    return container.get<T>(identifier);
}