import { takeLatest, select, call, put } from "redux-saga/effects";
import { CryptoTypes } from "./types";
import { MessageSender, EncryptionUtils } from "@shared/models";
import { accountActions } from "../account";
import { initSecret } from "./actions";

import type { Action } from "redux";
import type { IAppState } from "../../store/reducers";

type SaveAction = Action<CryptoTypes> & {
    payload: { password: string; withNewSecret?: boolean };
};

export function* saveSecret(action: SaveAction) {
    try {
        let secret: string | null;
        if (action.payload.withNewSecret) {
            secret = EncryptionUtils.generateSecret();
        } else {
            const state: IAppState = yield select();
            secret = state.crypto.secret;
        }

        if (secret) {
            yield call(
                MessageSender.setSecret,
                secret,
                action.payload.password
            );
            yield put(accountActions.setPassowrd(action.payload.password));
            yield put({ type: CryptoTypes.SAVE_SECRET_SUCCESS });

            if (action.payload.withNewSecret) {
                yield put(initSecret(secret));
            }
        }
    } catch (err) {
        yield put({ type: CryptoTypes.SAVE_SECRET_FAILURE });
    }
}

export function* initCrypto() {}

export default function* () {
    yield takeLatest(CryptoTypes.SAVE_SECRET, saveSecret);
    yield takeLatest(CryptoTypes.INIT_CRYPTO, initCrypto);
}
