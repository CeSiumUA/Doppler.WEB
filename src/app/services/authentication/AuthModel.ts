import { User } from './User';
import { JwtToken } from './JwtToken';
export interface AuthModel{
    user: User;
    accessToken: JwtToken;
    refreshToken: JwtToken;
}