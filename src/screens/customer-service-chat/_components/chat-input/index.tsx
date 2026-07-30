import React from "react";
import { Pressable, TextInput, View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from "@/styles/colors";
import { chatInputStyles } from "./indexStyles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * @brief 채팅 인풋
 */

interface Props {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    onSubmit: () => void;
}

export const ChatInput = (props: Props) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                chatInputStyles.container,
                { bottom: insets.bottom }
            ]}
        >
            <View style={chatInputStyles.input}>
                <TextInput
                    style={chatInputStyles.inputText}
                    placeholder="문의사항을 입력해 주세요"
                    placeholderTextColor={colors.placeholder}
                    value={props.value}
                    onChangeText={props.setValue}
                />

                <Pressable
                    style={chatInputStyles.inputSubmit}
                    onPress={props.onSubmit}
                >
                    <AntDesign name="arrowup" color="white" size={20} />
                </Pressable>
            </View>
        </View>
    )
}