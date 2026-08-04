/**
 * @brief 로그인 request 타입
 */

export interface ILoginRequest {
    accessToken?: string;
    idToken?: string;
    fcmToken: string;
    notificationEnabled: boolean;
}