import { UserContact } from '../app/services/authentication/User';
import { Contact } from './contact';
import { ConversationMember } from './Message';

export interface Conversation{
    id?: string;
    name?: string;
    description?: string;
    iconUrl: string;
}

export interface Dialogue extends Conversation{
    firstUser?: ConversationMember;
    secondUser?: ConversationMember;
}