import { Contact } from "src/models/contact";

export interface User extends Contact {
    email: string;
}

export interface UserContact {
    id: string;
    user: User;
    contact: User;
    displayName: string;
}

export enum ProfileCardType{
    MyProfile = 0,
    UserProfile = 1,
    MyContactProfile
}