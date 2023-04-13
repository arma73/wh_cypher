import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Form } from "react-router-dom";
import { Heading, Input, ThemedButton, Panel } from "@shared/ui";
import ErrorIcon from "svgr/error.svg";
import ExtensionLayout from "../layouts/ExtensionLayout";
import { useInputFocus, useSignupState, useSignupSubmit } from "../hooks";

import type { IAppState } from "@shared/store";

const SignUp = () => {
    const { inputState, inputDispatch, handlePassword, handleConfirmPassword } =
        useSignupState();
    const { handleSubmit } = useSignupSubmit(inputState, inputDispatch);

    const isSaved = useSelector<IAppState, boolean | undefined>(
        state => state.crypto.isSecretSaved
    );
    const inputRef = useInputFocus();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSaved) {
            navigate("/signin");
        }
    }, [isSaved, navigate]);

    return (
        <ExtensionLayout>
            <Panel
                header={<Heading text="Sign up" />}
                body={
                    <Form className="w-full px-5">
                        <div>
                            <Input
                                type="password"
                                name="password"
                                label="Password"
                                ref={inputRef}
                                errIcon={ErrorIcon}
                                onSubmit={handleSubmit}
                                className="mb-3"
                                value={inputState.password}
                                error={
                                    inputState.error?.type === "origin"
                                        ? inputState.error.message
                                        : false
                                }
                                onChange={handlePassword}
                                required
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                name="confirmPassword"
                                errIcon={ErrorIcon}
                                onSubmit={handleSubmit}
                                label="Confirm Password"
                                value={inputState.confirmPassword}
                                error={
                                    inputState.error?.type === "confirm" &&
                                    inputState.error.message
                                }
                                onChange={handleConfirmPassword}
                                required
                            />
                        </div>
                    </Form>
                }
                footer={
                    <ThemedButton
                        text="Save"
                        size="lg"
                        className="mx-2"
                        onClick={handleSubmit}
                    />
                }
            />
        </ExtensionLayout>
    );
};

export default SignUp;
