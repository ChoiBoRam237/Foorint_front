/**
 * @brief 유저 response 타입
 */

import { CommonImgResponse } from "./common";

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