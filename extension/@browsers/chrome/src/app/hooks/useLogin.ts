import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { accountActions } from "@shared/store";

import type { IAppState } from "@shared/store";

export const useLogin = () => {
    const [isLoggedIn, hasFailure] = useSelector<IAppState, [boolean, boolean]>(
        state => [state.account.isLoggedIn, state.account.failedLogin]
    );
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const handleSubmit = useCallback(
        (password: string) => {
            dispatch(accountActions.logIn(password));
        },
        [dispatch]
    );

    useEffect(() => {
        if (isLoggedIn) {
            navigation("/");
        }
    }, [isLoggedIn, navigation]);

    return { handleSubmit, hasFailure };
};
