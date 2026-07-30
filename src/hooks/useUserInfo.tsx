import { useEffect, useState } from "react";
import { asyncStorage } from "@/util/asyncStorage";
import { IUser } from "@/types/response/user";

/**
 * @brief 유저 정보 hook
 * @returns
 * userCode: 사용자 코드
 * userName: 사용자 이름
 * userEmail: 사용자 이메일
 * userProfileUrl: 사용자 프로필 이미지
 * userLoginType: 카카오 or 구글 로그인 구분값
 * userType: USER or ADMIN 구분값
 */

export const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState<IUser>();

    useEffect(() => {
        const getUserInfo = async () => {
            const user = await asyncStorage.getAsyncStorage("userInfo");

            if (user) {
                setUserInfo({
                    code: user.code,
                    customerServiceCode: user.customerServiceCode,
                    name: user.name,
                    email: user.email,
                    profileImgUrl: user.profileImgUrl,
                    loginType: user.loginType,
                    userType: user.userType,
                });
            }
        };

        getUserInfo();
    }, []);
    
    return {
        userCode: userInfo?.code || 0,
        customerServiceCode: userInfo?.customerServiceCode,
        userName: userInfo?.name || "",
        userEmail: userInfo?.email || "",
        userProfileUrl: userInfo?.profileImgUrl || "",
        userLoginType: userInfo?.loginType || "",
        userType: userInfo?.userType || "",
    }
}