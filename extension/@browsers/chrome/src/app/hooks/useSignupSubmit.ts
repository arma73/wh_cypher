import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { cryptoActions } from "@shared/store";

import type { Dispatch } from "react";
import type { ISignUpState, SignUpAction } from "./useSignupState";

export const useSignupSubmit = (
    inputState: ISignUpState,
    inputDispatch: Dispatch<SignUpAction>
) => {
    const dispatch = useDispatch();

    const validatePassword = useCallback((password: string) => {
        const pattern = /^.{6,}$/;
        return pattern.test(password);
    }, []);

    const handleSubmit = () => {
        if (!validatePassword(inputState.password)) {
            inputDispatch({
                type: "setError",
                payload: {
                    type: "origin",
                    message: "Password must be at least 6 chars.",
                },
            });
            return;
        }

        if (inputState.password !== inputState.confirmPassword) {
            inputDispatch({
                type: "setError",
                payload: {
                    type: "confirm",
                    message: "The confirm password must be equal.",
                },
            });
            return;
        }

        dispatch(cryptoActions.saveSecret({ password: inputState.password }));
    };

    return { handleSubmit };
};
