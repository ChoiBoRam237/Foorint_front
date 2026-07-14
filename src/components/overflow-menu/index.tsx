import React from "react";
import { Dimensions, Pressable, Text, View } from "react-native";
import { overflowMenuStyles } from "./indexStyles";

/**
 * @brief overflow menu
 */

interface Props {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    options: {
        text: string;
        textColor: string;
        onClick: () => void;
    }[];
}

export const OverflowMenuComponent = (props: Props) => {
    if (!props.open) return null;

    return (
        <View style={overflowMenuStyles.container}>
            <View style={overflowMenuStyles.wrapper}>
                <Pressable
                    style={[
                        { 
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height,
                        }
                    ]}
                    onPress={() => props.setOpen(false)}
                />

                <View style={overflowMenuStyles.menuContainer}>
                    {props.options.map((menu, index) => (
                        <Pressable
                            key={index}
                            style={({ pressed }) => [
                                overflowMenuStyles.menuItem,
                                pressed && overflowMenuStyles.activeMenuItem
                            ]}
                            onPress={menu.onClick}
                        >
                            <Text
                                style={[
                                    overflowMenuStyles.menuText,
                                    { color: menu.textColor }
                                ]}
                            >
                                {menu.text}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>
        </View>
    )
}