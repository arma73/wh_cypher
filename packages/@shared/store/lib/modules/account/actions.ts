import { AccountTypes } from "./types";

export const setPassowrd = (payload: string) => {
    return {
        type: AccountTypes.SET_ACCOUNT_PASSWORD,
        payload,
    };
};

export const logIn = (payload: string) => {
    return {
        type: AccountTypes.LOG_IN,
        payload,
    };
};

export const logOut = () => {
    return {
        type: AccountTypes.LOG_OUT,
    };
};

export const setLoggedIn = (payload: boolean) => {
    return {
        type: AccountTypes.SET_LOGGED_IN,
        payload,
    };
};

export const resetAccount = () => {
    return {
        type: AccountTypes.RESET_ACCOUNT,
    };
};
