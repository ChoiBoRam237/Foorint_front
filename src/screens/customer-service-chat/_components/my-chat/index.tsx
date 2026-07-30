import { Text, View } from "react-native";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { myChatStyles } from "./indexStyles";

/**
 * @brief 내가 쓴 채팅
 */

interface Props {
    message: string;
    createdAt: Date;
    showTime: boolean;
}

export const MyChat = (props: Props) => {
    return (
        <View style={myChatStyles.container}>
            {props.showTime ? (
                <View style={myChatStyles.showTimeContainer}>
                    <Text style={myChatStyles.time}>{format(props.createdAt, "aa K:mm", { locale: ko })}</Text>

                    <View style={myChatStyles.showTimeMessage}>
                        <Text style={myChatStyles.messageText}>{props.message}</Text>
                    </View>
                </View>
            ) : (
                <View style={myChatStyles.unShowTimeMessage}>
                    <Text style={myChatStyles.messageText}>{props.message}</Text>
                </View>
            )}
        </View>
    )
}