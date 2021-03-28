import { Contact } from "src/models/contact";

export interface User extends Contact {
    email: string;
}