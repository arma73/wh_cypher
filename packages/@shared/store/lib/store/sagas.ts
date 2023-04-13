import { fork } from "redux-saga/effects";
import { cryptoSagas } from "../modules/crypto";
import { accountSagas } from "../modules/account";

export function* rootSaga() {
    yield fork(cryptoSagas);
    yield fork(accountSagas);
}
