import { useCallback, useReducer } from "react";

export interface ISignUpState {
    password: string;
    confirmPassword: string;
    error?: {
        type: "origin" | "confirm";
        message: string;
    };
}

export type SignUpAction =
    | { type: "setPassword"; payload: string }
    | { type: "setConfirmPassword"; payload: string }
    | {
          type: "setError";
          payload: { type: "origin" | "confirm"; message: string };
      };

const initialState: ISignUpState = {
    password: "",
    confirmPassword: "",
};

const signUpReducer = (
    state: ISignUpState,
    action: SignUpAction
): ISignUpState => {
    switch (action.type) {
        case "setPassword":
            return { ...state, password: action.payload };
        case "setConfirmPassword":
            return { ...state, confirmPassword: action.payload };
        case "setError":
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export const useSignupState = () => {
    const [inputState, inputDispatch] = useReducer(signUpReducer, initialState);

    const handlePassword = useCallback((value: string) => {
        inputDispatch({ type: "setPassword", payload: value });
    }, []);

    const handleConfirmPassword = useCallback((value: string) => {
        inputDispatch({ type: "setConfirmPassword", payload: value });
    }, []);

    const setError = useCallback(
        (type: "origin" | "confirm", message: string) => {
            inputDispatch({
                type: "setError",
                payload: {
                    type,
                    message,
                },
            });
        },
        []
    );

    return {
        inputState,
        inputDispatch,
        handlePassword,
        handleConfirmPassword,
        setError,
    };
};
