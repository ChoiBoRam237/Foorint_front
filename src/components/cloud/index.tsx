import { StyleSheet, View } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import Cloud1 from "@/assets/images/cloud1.svg";
import Cloud2 from "@/assets/images/cloud2.svg";
import Cloud3 from "@/assets/images/cloud3.svg";

/**
 * @brief 구름 컴포넌트
 */

interface Props {
    target: string,
    width: number;
    height: number;
    position: {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    }
}


export const CloudComponent = (props: Props) => {
    const insets = useSafeAreaInsets();
    const styles = cloudStyles(props.position, insets);

    return (
        <>
            {props.target === "one" ? (
                <View style={styles.cloud}>
                    <Cloud1 width={props.width} height={props.height} />
                </View>
            ) : props.target === "two" ? (
                <View style={styles.cloud}>
                    <Cloud2 width={props.width} height={props.height} />
                </View>
            ) : (
                <View style={styles.cloud}>
                    <Cloud3 width={props.width} height={props.height} />
                </View>
            )}
        </>
    )
}

const cloudStyles = (
    position: {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    },
    insets: EdgeInsets
) => {
    return StyleSheet.create({
        cloud: {
            position: "absolute",
            
            ...(position.top !== undefined && {
                top: insets.top + position.top,
            }),
    
            ...(position.bottom !== undefined && {
                bottom: position.bottom,
            }),
    
            ...(position.left !== undefined && {
                left: position.left,
            }),
    
            ...(position.right !== undefined && {
                right: position.right,
            }),
        }
    });
}