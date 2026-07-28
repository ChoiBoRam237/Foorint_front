import { create } from "zustand";

/**
 * @brief code store
 */

interface ICodeInfo {
    code?: number | null;
    prevCode?: number | null;
    nextCode?: number | null;
}

interface IUserStore extends ICodeInfo {
    setCode: (code: ICodeInfo) => void;
    clearCode: () => void;
}

export const useCodeStore = create<IUserStore>((set) => ({
    code: null,
    prevCode: null,
    nextCode: null,

    setCode: (code) => set(code),

    clearCode: () =>
        set({
            code: null,
            prevCode: null,
            nextCode: null
        }),
}));