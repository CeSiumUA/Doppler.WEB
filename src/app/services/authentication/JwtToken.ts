export interface JwtToken {
    token: string;
    issueDate: Date;
    expireDate: Date;
}