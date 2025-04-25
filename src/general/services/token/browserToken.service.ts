import { ITokenService } from './token.interface';
import { injectable } from 'inversify';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

@injectable()
export class BrowserTokenService implements ITokenService {
    getAccessToken() {
        return localStorage.getItem(ACCESS_TOKEN_KEY);
    }
    getRefreshToken() {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    }
    setAccessToken(token: string) {
        localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }
    setRefreshToken(token: string) {
        localStorage.setItem(REFRESH_TOKEN_KEY, token);
    }
}
