import { AccountActionNames, CryptoActionNames } from "./_types";

interface IMessage {
    action: string;
    secret?: string;
    password?: string;
    authorized?: boolean;
}

interface IResponse {
    status: string;
    secret?: string;
    password?: string;
    error?: string;
    authorized?: boolean;
    isInitialized?: boolean;
}

class MessageSender {
    private static instance: MessageSender;
    private constructor() {}

    public static getInstance(): MessageSender {
        if (!MessageSender.instance) {
            MessageSender.instance = new MessageSender();
        }
        return MessageSender.instance;
    }

    private sendMessage(message: IMessage): Promise<IResponse> {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(message, (response: IResponse) => {
                if (response.status === "success") {
                    resolve(response);
                } else {
                    reject(response.error);
                }
            });
        });
    }

    public resetAccount = async (): Promise<void> => {
        const response = await this.sendMessage({
            action: AccountActionNames.RESET,
        });
        if (response.error) {
            throw new Error(response.error);
        }
    };

    public resetCrypto = async (): Promise<void> => {
        const response = await this.sendMessage({
            action: CryptoActionNames.RESET,
        });
        if (response.error) {
            throw new Error(response.error);
        }
    };

    public setAuthorized = async (authorized: boolean): Promise<void> => {
        const response = await this.sendMessage({
            action: AccountActionNames.SET_AUTHORIZED,
            authorized,
        });
        if (response.error) {
            throw new Error(response.error);
        }
    };

    public getAuthorized = async (): Promise<boolean> => {
        const response = await this.sendMessage({
            action: AccountActionNames.RETRIEVE_AUTHORIZED,
        });
        if (response.error) {
            throw new Error(response.error);
        }

        return response.authorized || false;
    };

    public setSecret = async (
        secret: string,
        password: string
    ): Promise<void> => {
        const response = await this.sendMessage({
            action: CryptoActionNames.SET_SECRET,
            secret,
            password,
        });
        if (response.error) {
            throw new Error(response.error);
        }
    };

    public getSecret = async (
        password: string
    ): Promise<string | undefined> => {
        const response = await this.sendMessage({
            action: CryptoActionNames.RETRIEVE_SECRET,
            password,
        });
        if (response.error) {
            throw new Error(response.error);
        }

        return response.secret;
    };

    public isSecretInitialized = async (): Promise<boolean> => {
        const response = await this.sendMessage({
            action: CryptoActionNames.IS_SECRET_INITIALIZED,
        });
        if (response.error) {
            throw new Error(response.error);
        }
        return response.isInitialized || false;
    };

    public getPassword = async (): Promise<string | undefined> => {
        const response = await this.sendMessage({
            action: AccountActionNames.RETRIEVE_PASSOWRD,
        });
        if (response.error) {
            throw new Error(response.error);
        }
        return response.password;
    };

    public setPassword = async (password: string): Promise<void> => {
        const response = await this.sendMessage({
            action: AccountActionNames.SET_PASSWORD,
            password,
        });
        if (response.error) {
            throw new Error(response.error);
        }
    };
}

export default MessageSender.getInstance();
