import MessageManager from "./MessageManager";
import AESGCMEncryption, {
    type IEncryptionResult,
} from "../encryption/AESGCMEncryption";
import { CryptoActionNames } from "./_types";

import type { IMessageRequest, IMessageResponse } from "./MessageManager";

const enum CryptoStorageKeys {
    SECRET = "secret",
}

interface ICryptoRequest extends IMessageRequest<CryptoActionNames> {
    secret?: string;
    password?: string;
}

interface ICryptoResponse extends IMessageResponse {
    secret?: string | null;
    isInitialized?: boolean;
}

class CryptoMessageManager extends MessageManager {
    constructor() {
        super({ ns: "crypto_" });
    }

    /**
     * Handles incoming messages from other parts of the extension or external sources.
     * @param request - The message request object.
     * @param sender - The sender of the message.
     * @param sendResponse - A function to send a response back to the sender.
     * @returns Whether the response is asynchronous or not.
     */
    protected handleMessage(
        request: ICryptoRequest,
        _sender: chrome.runtime.MessageSender,
        sendResponse: (response: ICryptoResponse) => void
    ): boolean {
        const encryption = new AESGCMEncryption();
        switch (request.action) {
            case CryptoActionNames.SET_SECRET: {
                const { secret, password } = request;
                if (secret && password) {
                    this.set(
                        CryptoStorageKeys.SECRET,
                        secret,
                        err =>
                            sendResponse({ status: err ? "error" : "success" }),
                        secretValue => encryption.encrypt(secretValue, password)
                    );
                }
                return true;
            }
            case CryptoActionNames.RETRIEVE_SECRET: {
                const { password } = request;
                if (password) {
                    this.get(
                        CryptoStorageKeys.SECRET,
                        (err, secret) => {
                            if (err) {
                                return sendResponse({ status: "error" });
                            }

                            sendResponse({
                                status: "success",
                                secret,
                            });
                        },
                        (secret: IEncryptionResult) =>
                            encryption.decrypt(secret, password)
                    );
                }
                return true;
            }
            case CryptoActionNames.IS_SECRET_INITIALIZED: {
                this.get(CryptoStorageKeys.SECRET, (err, rawSecret) => {
                    if (err) {
                        return sendResponse({ status: "error" });
                    }

                    sendResponse({
                        status: "success",
                        isInitialized: !!rawSecret,
                    });
                });
                return true;
            }
            case CryptoActionNames.RESET: {
                this.removeAll(err => {
                    const status = err ? "error" : "success";
                    sendResponse({ status });
                });
                return true;
            }
        }
    }
}

export default CryptoMessageManager;
