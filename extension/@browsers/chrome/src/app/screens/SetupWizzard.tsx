import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate, redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MessageSender, EncryptionUtils } from "@shared/models";
import { cryptoActions } from "@shared/store";

import type { FC } from "react";
import type { LoaderFunction } from "react-router-dom";
import type { IAppState } from "@shared/store";

const loader: LoaderFunction = async () => {
    const secret = EncryptionUtils.generateSecret();
    const encSecret = await MessageSender.isSecretInitialized();

    if (encSecret) {
        throw redirect("/signin");
    }

    return {
        secret,
    };
};

const SetupWizzard: FC & { loader: LoaderFunction } = () => {
    const secret = useSelector<IAppState, string | null>(
        state => state.crypto.secret
    );
    const data: ReturnType<typeof loader> = useLoaderData();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        dispatch(cryptoActions.initSecret(data.secret));
    };

    useEffect(() => {
        if (secret) {
            navigate("/signup");
        }
    }, [navigate, secret]);

    return (
        <div className="w-40">
            <h1>New Secret</h1>
            <div>
                <span>{secret || data.secret}</span>
            </div>
            <button onClick={handleClick}>Proceed</button>
        </div>
    );
};

SetupWizzard.loader = loader;
export default SetupWizzard;
