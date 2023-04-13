import { combineReducers } from "redux";
import crypto, { cryptoInitialState } from "../modules/crypto";
import account, { accountInitialState } from "../modules/account";

import type { ICryptoState } from "../modules/crypto";
import type { IAccountState } from "../modules/account";

export interface IAppState {
    account: IAccountState;
    crypto: ICryptoState;
}

export const combineInitialState: Partial<IAppState> = {
    account: accountInitialState,
    crypto: cryptoInitialState,
};

export default combineReducers<IAppState>({
    account,
    crypto,
});
