export type ServiceMethod = (...args: any[]) => Promise<any>;

export type Middleware = {
    onCall?: (methodName: string, args: any[]) => void;
    onResult?: (methodName: string, args: any[], result: any) => void;
    onError?: (methodName: string, args: any[], error: any) => void;
};


export function applyServiceMiddleware<T extends object>(
    service: T,
    middlewares: Middleware[]
): T {
    return new Proxy(service, {
        get(target, prop, receiver) {
            const orig = Reflect.get(target, prop, receiver);
            if (typeof orig !== 'function') return orig;

            return async (...args: any[]) => {
                middlewares.forEach(mw => mw.onCall?.(prop.toString(), args));
                try {
                    const result = await orig.apply(target, args);
                    middlewares.forEach(mw => mw.onResult?.(prop.toString(), args, result));
                    return result;
                } catch (error) {
                    middlewares.forEach(mw => mw.onError?.(prop.toString(), args, error));
                    throw error;
                }
            };
        }
    });
}
