/* eslint-disable max-lines */
import { useCallback, useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Form } from "react-router-dom";
import clsx from "clsx";
import { cryptoActions } from "@shared/store";

import type { FC, ChangeEvent, FormEventHandler } from "react";
import type { IAppState } from "@shared/store";

interface ISignUpProps {
    className?: string;
}

interface ISignUpState {
    password: string;
    confirmPassword: string;
    error?: string;
}

type SignUpAction =
    | { type: "setPassword"; payload: string }
    | { type: "setConfirmPassword"; payload: string }
    | { type: "setError"; payload: string };

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

const SignUp: FC<ISignUpProps> = ({ className }) => {
    const [inputState, inputDispatch] = useReducer(signUpReducer, initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isSaved = useSelector<IAppState, boolean | undefined>(
        state => state.crypto.isSecretSaved
    );

    const handlePassword = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement>) => {
        inputDispatch({ type: "setPassword", payload: value });
    };

    const handleConfirmPassword = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement>) => {
        inputDispatch({ type: "setConfirmPassword", payload: value });
    };

    const validatePassword = useCallback((password: string) => {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
        return pattern.test(password);
    }, []);

    const onSubmit: FormEventHandler<HTMLFormElement> = () => {
        if (!validatePassword(inputState.password)) {
            inputDispatch({
                type: "setError",
                payload:
                    "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
            });
            return;
        }
        if (inputState.password !== inputState.confirmPassword) {
            inputDispatch({
                type: "setError",
                payload: "The confirm password must be equal to the password",
            });
            return;
        }

        dispatch(cryptoActions.saveSecret({ password: inputState.password }));
    };

    useEffect(() => {
        if (isSaved) {
            navigate("/signin");
        }
    }, [isSaved, navigate]);

    return (
        <div className={clsx(className)}>
            <h1>Set password</h1>
            <Form onSubmit={onSubmit}>
                <div>
                    <input
                        type="password"
                        name="password"
                        value={inputState.password}
                        onChange={handlePassword}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={inputState.confirmPassword}
                        onChange={handleConfirmPassword}
                        required
                    />
                </div>
                {inputState.error && <p>{inputState.error}</p>}
                <div>
                    <button type="submit">Submitt</button>
                </div>
            </Form>
        </div>
    );
};

export default SignUp;
