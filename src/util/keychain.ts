import * as Keychain from 'react-native-keychain';

// 저장
export const keychain = {
    setKeychain: async (userInfo: any, tokenInfo: any) => {
        await Keychain.setGenericPassword(userInfo, tokenInfo);
    },

    getKeychain: async () => {
        const credentials = await Keychain.getGenericPassword();
        return credentials;
    },

    clearKeychain: async () => {
        await Keychain.resetGenericPassword();
    }
}