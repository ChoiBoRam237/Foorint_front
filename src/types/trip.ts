import { ISelection } from "./selection";

/**
 * @brief 여행 정보 타입
 */

export interface ITrip {
    code: number;
    title: string;
    category: ISelection;
    description: string;
    imgUrl: string;
}

export interface ITripPlace {
    code: number;
    placeName: string;
    visitCount: number;
}

export interface ITripDetail {
    code: number;
    title: string;
    category: ISelection;
    location: string;
    startDate: Date;
    endDate: Date;
    description: string;
    imgUrl: string;
}