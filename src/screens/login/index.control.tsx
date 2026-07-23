import { useState } from "react";
import { AxiosError } from "axios"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { login } from "@react-native-seoul/kakao-login";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useMutation } from "@tanstack/react-query"
import { RootStackParamList } from "@/navigation/types";
import { BASE_URL, GOOGLE_WEB_CLIENT_ID } from "@env";
import { keychain } from "@/util/keychain";
import { postLoginApi } from "./_api/POST"

/**
 * @brief 로그인 컨트롤
 */

GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    offlineAccess: true,
});

export const useControlLogin = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [loginLoading, setLoginLoading] = useState<boolean>(false);

    // 카카오 로그인 api
    const postKakaoLogin = useMutation({
        mutationFn: async (accessToken: string) => await postLoginApi.postKakaoLogin(accessToken),
        onSuccess: async (data) => {
            await keychain.setKeychain(
                JSON.stringify({
                    userCode: data.userCode,
                    name: data.name,
                    email: data.email,
                    profileImgUrl: data.profileImgUrl,
                    loginType: data.loginType,
                }),
                JSON.stringify({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                })
            );

            setLoginLoading(false);

            navigation.replace("List");
        },
        onError: (error: AxiosError) => {
            console.error("카카오 로그인 에러 : ", error);
        }
    });

    // 구글 로그인 api
    const postGoogleLogin = useMutation({
        mutationFn: async (idToken: string) => await postLoginApi.postGoogleLogin(idToken),
        onSuccess: async (data) => {
            await keychain.setKeychain(
                JSON.stringify({
                    userCode: data.userCode,
                    name: data.name,
                    email: data.email,
                    profileImgUrl: data.profileImgUrl,
                    loginType: data.loginType,
                }),
                JSON.stringify({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                })
            );

            setLoginLoading(false);

            navigation.replace("List");
        },
        onError: (error: AxiosError) => {
            console.error("구글 로그인 에러 : ", error);
        }
    });

    // 카카오 로그인 (라이브러리)
    const onKakaoLogin = async () => {
        setLoginLoading(true);
        try {
            const token = await login();
            postKakaoLogin.mutate(token.accessToken);
        } catch (e) {
            console.error("카카오 로그인(라이브러리) 에러 : ", e);
        }
    };

    // 구글 로그인 (라이브러리)
    const onGoogleLogin = async () => {
        setLoginLoading(true);
        try {
            await GoogleSignin.hasPlayServices();
            const user = await GoogleSignin.signIn();
            
            if (user.data?.idToken) {
                postGoogleLogin.mutate(user.data?.idToken);
            }
        } catch (e) {
            console.error("구글 로그인(라이브러리) 에러 : ", e);
        }
    }

    return {
        loginLoading,
        onKakaoLogin,
        onGoogleLogin,
    }
}