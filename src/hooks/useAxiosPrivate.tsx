import { useEffect, useRef } from "react";
import { AxiosError } from "axios";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RootStackParamList } from "@/navigation/types";
import { keychain } from "@/util/keychain";
import { commonApi } from "@/util/_api";
import { privateBase } from "@/util/api";

/**
 * @brief 토큰 처리 hook
 */

export const AxiosComponent = () => {
    const queryClient = useQueryClient();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const tokenInfoRef = useRef<any>(null);

    const tokenMutation = useMutation({
        mutationFn: async () => {
            const token = await keychain.getKeychain("token");
            const tokenInfo = JSON.parse(token ?? "{}");

            return await commonApi.getRefreshToken({
                headers: {
                    Authorization: `Bearer ${tokenInfo?.refreshToken}`,
                }
            })
        },
        retry: 3,
        retryDelay: 1000,
        onError: (error: AxiosError) => {
            if (error.response) {
                if (error.response.status === 401 || error.response.status === 400) {
                    keychain.clearKeychain();
                    queryClient.clear();
                    navigation.replace("Login");
                }
            } else {
                console.error("Network or other error:", error);
            }
        },
    });

    useEffect(() => {
        const setupInterceptor = async () => {
            const token = await keychain.getKeychain("token");
            tokenInfoRef.current = JSON.parse(token ?? "{}");
            
            const requestIntercept = privateBase.interceptors.request.use(
                async (config) => {
                    const token = await keychain.getKeychain("token");
                    const tokenInfo = JSON.parse(token ?? "");

                    if (tokenInfo?.accessToken) {
                        config.headers.Authorization = `Bearer ${tokenInfo.accessToken}`;
                    }

                    return config;
                },
                (error) => Promise.reject(error),
            );

            const responseIntercept = privateBase.interceptors.response.use(
                (response) => response,
                    async (error) => {
                        const prevRequest = error?.response?.config;

                        // error.response가 정의되어 있는지 확인
                        if (error.response) {
                            // 토큰이 만료된 경우
                            if (error.response.status === 401 && !prevRequest?._retry) {
                                prevRequest._retry = true;

                                try {
                                    const result = await tokenMutation.mutateAsync();
                                    prevRequest.headers["Authorization"] = `Bearer ${result}`;

                                    keychain.setKeychain("token", JSON.stringify({
                                        ...tokenInfoRef.current,
                                        accessToken: result,
                                    }));

                                    return privateBase(prevRequest);

                                } catch (tokenError) {
                                    console.error("Token refresh error:", tokenError);
                                    keychain.clearKeychain();
                                    queryClient.clear();
                                    navigation.replace("Login");
                                }
                            }
                        } else {
                            // error.response가 정의되지 않은 경우 처리
                            console.error("Network or other error:", error);
                        }

                        return Promise.reject(error);
                    },
            );

            return () => {
                privateBase.interceptors.request.eject(requestIntercept);
                privateBase.interceptors.response.eject(responseIntercept);
            };
        }

        setupInterceptor();
    }, [tokenMutation, queryClient]);

    return null;
}