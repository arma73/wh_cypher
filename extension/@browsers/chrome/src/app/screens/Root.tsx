import { useEffect } from "react";
import { useLoaderData, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { accountActions, cryptoActions } from "@shared/store";
import { MessageSender } from "@shared/models";

import type { FC } from "react";
import type { LoaderFunction } from "react-router-dom";
import type { IAppState } from "@shared/store";

const loader = async () => {
    const isAuthorized = await MessageSender.getAuthorized();
    const password = await MessageSender.getPassword();
    let secret: string | undefined;
    if (password) {
        secret = await MessageSender.getSecret(password);
    }

    if (secret && !password) {
        throw redirect("/signin");
    } else if (!isAuthorized || !secret) {
        throw redirect("/setup");
    }

    return {
        secret,
        password,
    };
};

interface IRootProps {}

const Root: FC<IRootProps> & { loader: LoaderFunction } = () => {
    const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;
    const navigation = useNavigate();
    const secret = useSelector<IAppState, string | null>(
        state => state.crypto.secret
    );
    const dispatch = useDispatch();
    const handleRegenerateSecret = () => {
        dispatch(
            cryptoActions.saveSecret({
                password: data.password!,
                withNewSecret: true,
            })
        );
    };
    const handleLogOut = () => {
        dispatch(accountActions.logOut());
        navigation("/signin");
    };

    useEffect(() => {
        dispatch(cryptoActions.initSecret(data.secret));
    }, [data.secret, dispatch]);

    return (
        <div id="main" className="view">
            <h2>Secret</h2>
            <p id="secret">{secret || data.secret}</p>
            <div>
                <button onClick={handleRegenerateSecret}>
                    Regenerate Secret
                </button>
            </div>
            <div>
                <button onClick={handleLogOut}>Logout</button>
            </div>
        </div>
    );
};

Root.loader = loader;
export default Root;
