import { asyncStorage } from "@/util/asyncStorage";

/**
 * @brief 유저 정보 hook
 * @returns
 * userCode: 사용자 코드
 * userName: 사용자 이름
 * userEmail: 사용자 이메일
 * userProfileUrl: 사용자 프로필 이미지
 * userLoginType: 카카오 or 구글 로그인 구분값
 */

export const useUserInfo = async () => {
    const userInfo = await asyncStorage.getAsyncStorage("userInfo");
    
    return {
        userCode: userInfo?.userCode || 0,
        userName: userInfo?.name || "",
        userEmail: userInfo?.email || "",
        userProfileUrl: userInfo?.profileImgUrl || "",
        userLoginType: userInfo?.loginType || "",
    }
}