import { CryptoTypes } from "./types";

export function initSecret(payload: string) {
    return {
        type: CryptoTypes.SET_SECRET,
        payload,
    };
}

export function generateSecret() {
    return {
        type: CryptoTypes.GENERATE_SECRET,
    };
}

export function resetCrypto() {
    return {
        type: CryptoTypes.RESET_CRYPTO,
    };
}

export function removeSecret() {
    return {
        type: CryptoTypes.REMOVE_SECRET,
    };
}

export function saveSecret(payload: {
    password: string;
    withNewSecret?: boolean;
}) {
    return {
        type: CryptoTypes.SAVE_SECRET,
        payload,
    };
}
