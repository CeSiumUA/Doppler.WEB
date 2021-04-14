import { environment } from './environment';
import { DefaultImageType } from './enums.helper';
import { Contact } from '../models/contact';
import { Observable } from 'rxjs';
export class UrlResolver{
    public static GetLoginUrl(): string{
        return `${environment.apiUrl}/api/authentication/authenticate`;
    }
    public static GeImageUrl(imageValue: string | undefined, imageType: DefaultImageType): string{
        if(imageValue){
            return `${environment.apiUrl}/cdn/files/${imageValue}`
        }
        return `assets/icons/default/${imageType.toString()}`;
    }
    public static GetRefreshTokenUrl(): string{
        return `${environment.apiUrl}/api/authentication/recoveraccess`;
    }
    public static GetFileUploadUrl(): string{
        return `${environment.apiUrl}/cdn/files/uploadfile`
    }
    /* public static GetUser(guid: string): Observable<Contact>{
        const httpUserRequest = `${environment.apiUrl}/api/`
    } */
}