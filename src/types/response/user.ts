import { CommonImgResponse } from "./common";

/**
 * @brief 유저 response 타입
 */

export interface IUser {
    code: number;
    customerServiceCode?: number;
    name: string;
    email: string;
    profileImgUrl: string;
    loginType: string;
    userType: string;
}

export interface IUserDetail {
    code: number;
    name: string;
    email: string;
    profileImgUrl: string;
    footPrintCount: number;
    locationCount: number;
    imgCount: number;
}

export interface IUserLocation {
    code: number;
    prevCode: number;
    nextCode: number;
    location: string;
    visitCount: number;
}

export interface IUserImg {
    code: number;
    prevCode: number;
    nextCode: number;
    imgUrl: CommonImgResponse;
}