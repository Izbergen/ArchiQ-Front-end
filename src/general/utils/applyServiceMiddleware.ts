// utils/applyServiceMiddleware.ts

export type ServiceMethod = (...args: any[]) => Promise<any>;

export type Middleware = {
    onCall?: (methodName: string, args: any[]) => void;
    onResult?: (methodName: string, args: any[], result: any) => void;
    onError?: (methodName: string, args: any[], error: any) => void;
};


export function applyServiceMiddleware<
    T extends { [K in keyof T]: ServiceMethod }
>(
    service: T,
    middlewares: Middleware[]
): T {
    const wrapped = {} as T;

    for (const key of Object.keys(service) as Array<keyof T>) {
        const orig = service[key]!;
        wrapped[key] = (async (...args: any[]) => {
            middlewares.forEach(mw => mw.onCall?.(key as string, args));

            try {
                const result = await orig.apply(service, args);
                middlewares.forEach(mw => mw.onResult?.(key as string, args, result));
                return result;
            } catch (error) {
                middlewares.forEach(mw => mw.onError?.(key as string, args, error));
                throw error;
            }
        }) as T[typeof key];
    }

    return wrapped;
}
