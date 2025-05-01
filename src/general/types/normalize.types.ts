type SnakeCase<S extends string> =
    S extends `${infer First}${infer Rest}`
        ? Rest extends Uncapitalize<Rest>
            ? `${Lowercase<First>}${SnakeCase<Rest>}`
            : `${Lowercase<First>}_${SnakeCase<Rest>}`
        : S;

export type KeysToSnakeCase<T extends Record<string, any>> = {
    [K in keyof T as SnakeCase<K & string>]: T[K]
};
