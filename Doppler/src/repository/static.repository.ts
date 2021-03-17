import { User } from '../app/services/authentication/User';
import { AuthModel } from '../app/services/authentication/AuthModel';
export interface IStaticRepository{
    saveLoginData(authModel: AuthModel): void;
}

export class StaticRepository implements IStaticRepository{
    constructor(){}
    public saveLoginData(authModel: AuthModel): void{
        const jsonString = JSON.stringify(authModel);
        localStorage.setItem('authData', jsonString);
    }
}