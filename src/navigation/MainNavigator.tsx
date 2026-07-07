import { Tabs } from "react-native-screens";
import HomeStack from "./HomeStack";

export default function MainNavigator() {
    return (
        <Tabs.Host>
            <Tabs.Screen name="HomeStack" component={HomeStack} />
        </Tabs.Host>
    )
}