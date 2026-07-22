import React from "react";

/**
 * @brief 모달 타입
 */

export interface IModal {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}