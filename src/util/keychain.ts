import * as Keychain from 'react-native-keychain';

// 저장
export const keychain = {
    setKeychain: async (name: string, value: any) => {
        await Keychain.setGenericPassword(name, value);
    },

    getKeychain: async (name: string) => {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
            const secureData = credentials as Record<string, string>;
            return secureData[name as keyof Keychain.UserCredentials];
        }
    },

    clearKeychain: async () => {
        await Keychain.resetGenericPassword();
    }
}