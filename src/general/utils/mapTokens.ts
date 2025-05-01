export function mapTokens<T extends { access: any; refresh: any }>(
    pair: T
): Omit<T, 'access' | 'refresh'> & {
    accessToken: T['access'];
    refreshToken: T['refresh'];
} {
    const { access, refresh, ...rest } = pair;
    return {
        ...rest,
        accessToken: access,
        refreshToken: refresh,
    };
}
