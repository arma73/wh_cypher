import produce from "immer";
import { AccountTypes } from "./types";

export interface IAccountState {
    password: null | string;
    isReseted: boolean;
    isLoggedIn: boolean;
    failedLogin: boolean;
}

export const initialState: IAccountState = {
    password: null,
    isReseted: false,
    isLoggedIn: false,
    failedLogin: false,
};

export default function accountReducers(
    state: IAccountState = initialState,
    action: { type: AccountTypes; payload?: any }
) {
    return produce(state, draft => {
        switch (action.type) {
            case AccountTypes.SET_ACCOUNT_PASSWORD:
                draft.password = action.payload;
                draft.isReseted = false;
                return;
            case AccountTypes.SET_LOGGED_IN:
                draft.isLoggedIn = action.payload;
                draft.failedLogin = false;
                return;
            case AccountTypes.LOG_IN_FAILURE:
                draft.isLoggedIn = false;
                draft.failedLogin = true;
                return;
            case AccountTypes.RESET_ACCOUNT:
                draft.isLoggedIn = false;
                draft.password = null;
                draft.failedLogin = false;
                return;
            case AccountTypes.IS_RESETED_ACCOUNT:
                draft.isReseted = action.payload;
                return;
            case AccountTypes.LOG_OUT:
                draft.isLoggedIn = false;
                draft.failedLogin = false;
                draft.isReseted = false;
                return;
            default:
                return state;
        }
    });
}
