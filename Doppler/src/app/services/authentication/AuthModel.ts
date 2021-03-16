import { User } from './User';
import { JwtToken } from './JwtToken';
export class AuthModel{
    public user: User;
    public accessToken: JwtToken;
    public refreshToken: JwtToken;
}