import produce from "immer";
import { CryptoTypes } from "./types";

export interface ICryptoState {
    secret: null | string;
    isSecretSaved?: boolean;
}

export const initialState: ICryptoState = {
    secret: null,
    isSecretSaved: undefined,
};

export default function cryptoReducers(
    state: ICryptoState = initialState,
    action: { type: CryptoTypes; payload?: any }
) {
    return produce(state, draft => {
        switch (action.type) {
            case CryptoTypes.SET_SECRET:
                draft.secret = action.payload;
                return;
            case CryptoTypes.REMOVE_SECRET:
                draft.secret = null;
                return;
            case CryptoTypes.RESET_CRYPTO:
                draft.secret = null;
                draft.isSecretSaved = undefined;
                return;
            case CryptoTypes.SAVE_SECRET:
                draft.isSecretSaved = false;
                return;
            case CryptoTypes.SAVE_SECRET_SUCCESS:
                draft.isSecretSaved = true;
                return;
            case CryptoTypes.SAVE_SECRET_FAILURE:
                draft.isSecretSaved = false;
                return;
            default:
                return state;
        }
    });
}
