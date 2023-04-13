import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { accountActions } from "@shared/store";

import type { IAppState } from "@shared/store";

export const useReset = () => {
    const navigation = useNavigate();
    const isReseted = useSelector<IAppState, boolean>(
        state => state.account.isReseted
    );
    const dispatch = useDispatch();
    const handleReset = () => {
        dispatch(accountActions.resetAccount());
    };

    useEffect(() => {
        if (isReseted) {
            navigation("/setup");
        }
    }, [isReseted, navigation]);

    return { handleReset };
};
