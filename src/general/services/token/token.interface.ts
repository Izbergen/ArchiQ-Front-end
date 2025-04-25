
export interface ITokenService {
    getAccessToken(): string | null;
    getRefreshToken(): string | null;
    setAccessToken(token: string): void;
    setRefreshToken(token: string): void;
}
