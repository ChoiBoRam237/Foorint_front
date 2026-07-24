import { ISelection } from "../selection";
import { CommonImgResponse } from "./common";

/**
 * @brief trip response 타입
 */

export interface ITripResponse {
    code: number;
    title: string;
    category: ISelection;
    description: string;
    imgUrl: CommonImgResponse;
}

export interface ITripPlaceResponse {
    code: number;
    placeName: string;
    visitCount: number;
}

export interface ITripDetailResponse {
    code: number;
    title: string;
    category: ISelection;
    location: string;
    startDate: Date;
    endDate: Date;
    description: string;
    imgList: CommonImgResponse[];
}