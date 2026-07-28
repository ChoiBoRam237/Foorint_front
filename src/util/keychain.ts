import * as Keychain from 'react-native-keychain';

/**
 * @brief keychain 관련 util
 */

export const keychain = {
    setKeychain: async (tokenInfo: any) => {
        await Keychain.setGenericPassword("user", tokenInfo);
    },

    getKeychain: async () => {
        const credentials = await Keychain.getGenericPassword();
        return credentials;
    },

    clearKeychain: async () => {
        await Keychain.resetGenericPassword();
    }
}