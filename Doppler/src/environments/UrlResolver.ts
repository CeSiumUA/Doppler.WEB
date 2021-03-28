import { environment } from './environment';
import { DefaultImageType } from './enums.helper';
import { stat } from 'fs';
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
        return `assets/icons/defaults/${imageType.toString()}`;
    }
    /* public static GetUser(guid: string): Observable<Contact>{
        const httpUserRequest = `${environment.apiUrl}/api/`
    } */
}