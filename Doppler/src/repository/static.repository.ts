import { User } from '../app/services/authentication/User';
import { AuthModel } from '../app/services/authentication/AuthModel';
export interface IStaticRepository{
    saveLoginData(authModel: AuthModel): void;
    getLoginData(): AuthModel | null;
}

export class StaticRepository implements IStaticRepository{
    constructor(){}
    public saveLoginData(authModel: AuthModel): void{
        const jsonString = JSON.stringify(authModel);
        localStorage.setItem('authData', jsonString);
    }
    public getLoginData(): AuthModel | null{
        const json = localStorage.getItem('authData');
        if(!json){
            return null;
        }
        let authModel: AuthModel = JSON.parse(json as string);
        return authModel;
    }
}