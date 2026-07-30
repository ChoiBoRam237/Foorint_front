import { Image, Text, View } from "react-native";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { IUser } from "@/types/response/user";
import { yourChatStyles } from "./indexStyles";

/**
 * @brief 상대방이 쓴 채팅
 */

interface Props {
    user: IUser;
    message: string;
    createdAt: Date;
    showTime: boolean;
    showProfile: boolean;
}

export const YourChat = (props: Props) => {
    return (
        <View style={yourChatStyles.container}>
            <View
                style={[
                    yourChatStyles.wrapper,
                    props.showProfile && { marginBottom: -20 },
                    (!props.showProfile && props.showTime) && { marginLeft: 52 }
                ]}
            >
                {props.showProfile && (
                    <Image
                        style={yourChatStyles.profile}
                        src={props.user.profileImgUrl}
                    />
                )}

                <View style={yourChatStyles.messageWrapper}>
                    {props.showProfile ? (
                        <View
                            style={[
                                yourChatStyles.message,
                                {
                                    maxWidth: props.showTime ? "84%" : "91.5%",
                                    borderTopRightRadius: 11,
                                    borderBottomLeftRadius: 11,
                                    borderBottomRightRadius: 11
                                }
                            ]}
                        >
                            <Text style={yourChatStyles.messageText}>{props.message}</Text>
                        </View>
                    ) : (
                        <View
                            style={[
                                yourChatStyles.message,
                                {
                                    maxWidth: "84%",
                                    borderRadius: 11
                                }
                            ]}
                        >
                            <Text style={yourChatStyles.messageText}>{props.message}</Text>
                        </View>
                    )}

                    {props.showTime && (
                        <Text style={yourChatStyles.time}>{format(props.createdAt, "aa K:mm", { locale: ko })}</Text>
                    )}
                </View>
            </View>
        </View>
    )
}