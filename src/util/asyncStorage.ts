import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * @brief async storage 관련 util
 */

export const asyncStorage = {
    setAsyncStorage: async (key: string, value: any) => {
        await AsyncStorage.setItem(key, value);
    },

    getAsyncStorage: async (key: string) => {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },

    removeAsyncStorage: async (key: string) => {
        await AsyncStorage.removeItem(key);
    }
}