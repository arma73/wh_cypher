import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate, redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MessageSender, EncryptionUtils } from "@shared/models";
import { cryptoActions } from "@shared/store";
import { BorderedText, Heading, Panel, ThemedButton } from "@shared/ui";
import ExtensionLayout from "../layouts/ExtensionLayout";

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
        <ExtensionLayout>
            <Panel
                header={<Heading text="Secret Saver" />}
                body={
                    <BorderedText
                        text={secret || data.secret}
                        variant="secondary"
                    />
                }
                footer={
                    <ThemedButton
                        text="Next"
                        size="lg"
                        className="mx-2"
                        onClick={handleClick}
                    />
                }
            />
        </ExtensionLayout>
    );
};

SetupWizzard.loader = loader;
export default SetupWizzard;
