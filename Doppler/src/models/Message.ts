export interface ConversationMessage{
    id?: string;
    clientGeneratedId?: string;
    deleted?: boolean;
    content?: ConversationMessageContent
}

export interface ConversationMessageContent{
    id?: string;
    text?: string;
    mediaContents?: ConversationMessageMediaContent[];
}

export interface ConversationMessageMediaContent{
    id?: number;
    dataUrl: string;
}
export enum MediaContentType{
    Photo = 0,
    Video = 1,
    Audio = 2,
    File = 3,
    Other = 4
}

export interface ConversationMessageViewer{
    id?: number;
    message?: ConversationMessage;
    viewedOn?: string;
    viewed?: boolean;
}

export interface WriteMessageResult{
    messageId?: string;
    clientGeneratedId?: string;
    delivered?: boolean;
}