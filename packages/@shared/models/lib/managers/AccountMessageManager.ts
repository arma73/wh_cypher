import MessageManager from "./MessageManager";
import PasswordEncryptor from "../encryption/PasswordEncryptor";
import { AccountActionNames } from "./_types";

import type { IMessageRequest, IMessageResponse } from "./MessageManager";

const enum AccountStorageKeys {
    PASSWORD = "password",
    IS_AUTHORIZED = "authorized",
}

interface IAccountRequest extends IMessageRequest<AccountActionNames> {
    password?: string;
    authorized?: boolean;
}

interface IAccountResponse extends IMessageResponse {
    password?: string | null;
    authorized?: boolean;
}

class AccountMessageManager extends MessageManager {
    constructor() {
        super({ ns: "acc_" });
    }

    /**
     * Handles incoming messages from other parts of the extension or external sources.
     * @param request - The message request object.
     * @param sender - The sender of the message.
     * @param sendResponse - A function to send a response back to the sender.
     * @returns Whether the response is asynchronous or not.
     */
    protected handleMessage(
        request: IAccountRequest,
        _sender: chrome.runtime.MessageSender,
        sendResponse: (response: IAccountResponse) => void
    ) {
        switch (request.action) {
            case AccountActionNames.SET_PASSWORD: {
                if (request.password) {
                    this.set(
                        AccountStorageKeys.PASSWORD,
                        request.password,
                        err =>
                            sendResponse({ status: err ? "error" : "success" }),
                        PasswordEncryptor.encrypt
                    );
                }
                return true;
            }
            case AccountActionNames.RETRIEVE_PASSOWRD: {
                this.get(
                    AccountStorageKeys.PASSWORD,
                    (err, password) => {
                        if (err) {
                            return sendResponse({ status: "error" });
                        }

                        sendResponse({ status: "success", password });
                    },
                    PasswordEncryptor.decrypt
                );

                return true;
            }
            case AccountActionNames.SET_AUTHORIZED: {
                if (request.authorized) {
                    this.set(
                        AccountStorageKeys.IS_AUTHORIZED,
                        request.authorized,
                        err =>
                            sendResponse({ status: err ? "error" : "success" })
                    );
                }
                return true;
            }
            case AccountActionNames.RETRIEVE_AUTHORIZED: {
                this.get<boolean>(
                    AccountStorageKeys.IS_AUTHORIZED,
                    (err, authorized) => {
                        if (err) {
                            return sendResponse({ status: "error" });
                        }

                        sendResponse({
                            status: "success",
                            authorized: authorized || false,
                        });
                    }
                );
                return true;
            }
            case AccountActionNames.RESET: {
                this.removeAll(err => {
                    const status = err ? "error" : "success";
                    sendResponse({ status });
                });
                return true;
            }
        }
    }
}

export default AccountMessageManager;
