import { useState } from "react";
import { useLoaderData, Form, redirect } from "react-router-dom";
import { MessageSender } from "@shared/models";
import { Heading, Input, Panel, ThemedButton } from "@shared/ui";
import ExtensionLayout from "../layouts/ExtensionLayout";
import ErrorIcon from "svgr/error.svg";
import { useReset, useInputFocus, useLogin } from "../hooks";

import type { FC } from "react";
import type { LoaderFunction } from "react-router-dom";

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

const SignIn: FC & { loader: LoaderFunction } = () => {
    const inputRef = useInputFocus();
    const { handleReset } = useReset();
    const { handleSubmit, hasFailure } = useLogin();
    const [password, setPassword] = useState("");
    useLoaderData();

    const handlePassword = (value: string) => {
        setPassword(value);
    };

    const onSubmit = () => {
        handleSubmit(password);
    };

    return (
        <ExtensionLayout>
            <Panel
                header={<Heading text="Log in" />}
                body={
                    <Form className="w-full px-5">
                        <Input
                            type="password"
                            name="password"
                            label="Password"
                            ref={inputRef}
                            onSubmit={onSubmit}
                            className="mb-3"
                            errIcon={ErrorIcon}
                            value={password}
                            error={
                                hasFailure
                                    ? "Incorrect password. Please try again."
                                    : false
                            }
                            onChange={handlePassword}
                            required
                        />
                    </Form>
                }
                footer={
                    <>
                        <ThemedButton
                            text="Reset"
                            variant="secondary"
                            size="lg"
                            className="mx-2"
                            onClick={handleReset}
                        />
                        <ThemedButton
                            text="Login"
                            disabled={!password.length}
                            size="lg"
                            className="mx-2"
                            onClick={onSubmit}
                        />
                    </>
                }
            />
        </ExtensionLayout>
    );
};

SignIn.loader = loader;
export default SignIn;
