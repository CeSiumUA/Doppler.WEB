import { environment } from './environment';
export class UrlResolver{
    public static GetLoginUrl(): string{
        return `${environment.apiUrl}/api/authentication/authenticate`;
    }
}