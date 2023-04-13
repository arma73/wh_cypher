import { takeLatest, call, put } from "redux-saga/effects";
import { AccountTypes } from "./types";
import { cryptoActions } from "../crypto";
import { setLoggedIn } from "./actions";
import { MessageSender } from "@shared/models";
import type { Action } from "redux";

export function* logOutSaga() {
    yield call(MessageSender.resetAccount);
}

export function* logInSaga(action: Action<AccountTypes> & { payload: string }) {
    try {
        yield call(MessageSender.getSecret, action.payload);
        // TODO: encrypt password add multiple acounts
        yield call(MessageSender.setPassword, action.payload);
        yield call(MessageSender.setAuthorized, true);
        yield put(setLoggedIn(true));
    } catch (err) {
        yield put({ type: AccountTypes.LOG_IN_FAILURE });
        yield call(MessageSender.resetAccount);
    }
}

// FIXME: create a separate store for this type of action, e.g. session
export function* resetAccountSaga() {
    try {
        yield call(MessageSender.resetCrypto);
        yield call(MessageSender.resetAccount);
        yield put(cryptoActions.resetCrypto());
        yield put({ type: AccountTypes.IS_RESETED_ACCOUNT, payload: true });
    } catch {
        yield put({ type: AccountTypes.IS_RESETED_ACCOUNT, payload: false });
    }
}

export default function* () {
    yield takeLatest(AccountTypes.RESET_ACCOUNT, resetAccountSaga);
    yield takeLatest(AccountTypes.LOG_IN, logInSaga);
    yield takeLatest(AccountTypes.LOG_OUT, logOutSaga);
}
