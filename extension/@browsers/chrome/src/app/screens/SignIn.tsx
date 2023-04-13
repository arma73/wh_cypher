import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, Form, redirect, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { accountActions } from "@shared/store";
import { MessageSender } from "@shared/models";

import type { FC, ChangeEvent } from "react";
import type { LoaderFunction } from "react-router-dom";
import type { IAppState } from "@shared/store";

interface ISignInProps {
    className?: string;
}

const loader: LoaderFunction = async () => {
    const isSecretInitialized = await MessageSender.isSecretInitialized();
    const isAuthorized = await MessageSender.getAuthorized();

    if (isAuthorized) {
        throw redirect("/");
    } else if (!isSecretInitialized) {
        throw redirect("/signup");
    }

    return null;
};

const SignIn: FC<ISignInProps> & { loader: LoaderFunction } = ({
    className,
}) => {
    const isReseted = useSelector<IAppState, boolean>(
        state => state.account.isReseted
    );
    const [isLoggedIn, hasFailure] = useSelector<IAppState, [boolean, boolean]>(
        state => [state.account.isLoggedIn, state.account.failedLogin]
    );
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const navigation = useNavigate();
    useLoaderData();

    const handleSetPassword = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement>) => {
        setPassword(value);
    };

    const onSubmit = () => {
        dispatch(accountActions.logIn(password));
    };

    const handleReset = () => {
        dispatch(accountActions.resetAccount());
    };

    useEffect(() => {
        if (isReseted) {
            navigation("/setup");
        }
    }, [isReseted, navigation]);

    useEffect(() => {
        if (isLoggedIn) {
            navigation("/");
        }
    }, [isLoggedIn, navigation]);

    return (
        <div className={clsx(className)}>
            <Form onSubmit={onSubmit}>
                <p>Password</p>
                <input
                    type="password"
                    value={password}
                    onChange={handleSetPassword}
                    required
                />
                <div>
                    <button type="submit">Login</button>
                </div>
            </Form>
            <div>
                <button onClick={handleReset}>Reset</button>
            </div>
            {hasFailure && <p className="text-red-600">Wrong Password</p>}
        </div>
    );
};

SignIn.loader = loader;
export default SignIn;
