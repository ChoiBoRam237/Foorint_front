import { IUser } from "./user";

/**
 * @brief 고객센터 response 타입
 */

export interface ICustomer {
    code: number;
    user: IUser;
    lastMessage: string;
    lastMessageCreatedAt: Date;
    unreadMessageCount: number;
}

export interface ICustomerMessage {
    code: number;
    user: IUser;
    message: string;
    createdAt: Date;
}