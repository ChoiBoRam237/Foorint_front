import { ISelection } from "./selection";

/**
 * @brief 여행 정보 타입
 */

export interface ITrip {
    code: number;
    title: string;
    category: ISelection;
    description: string;
}

export interface ITripPlace {
    code: number;
    placeName: string;
    visitCount: number;
}