import StorageWatcher from "../storage/StorageWatcher";

import type { IBrowserEngineOptions } from "../storage/BrowserEngine";

/**
 * Represents a request message sent to a message manager.
 */
export interface IMessageRequest<A extends string = string> {
    action: A;
}

export interface IMessageResponse {
    status: "success" | "error";
    error?: chrome.runtime.LastError;
}

interface IMessageManagerOptions extends IBrowserEngineOptions {}

/**
 * Managing messages between different parts of an extension.
 */
abstract class MessageManager extends StorageWatcher {
    constructor(options: IMessageManagerOptions) {
        super(options);
        chrome.runtime.onMessage.addListener(this.handleMessage.bind(this));
    }

    /**
     * Handles an incoming message from another part of the extension.
     * @param message - The message to handle.
     * @param sender - Information about the sender of the message.
     * @param sendResponse - A function to call with the response to the message.
     * @returns A promise that resolves to a boolean value indicating whether the response is asynchronous or not.
     */
    protected abstract handleMessage(
        message: IMessageRequest,
        sender: chrome.runtime.MessageSender,
        sendResponse: <T extends IMessageResponse>(response?: T) => void
    ): boolean;
}

export default MessageManager;
