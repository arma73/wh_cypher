import KeyNamespace from "../misc/KeyNamespace";

import type {
    StorageWatchEventListener,
    StorageAreaName,
    StorageWatchCallback,
    StorageCallbackMap,
} from "./_types";
import type { INamespacedInterface } from "../misc/KeyNamespace";

export type StorageArea = chrome.storage.StorageArea;
export type InternalStorage = typeof chrome.storage;
declare let globalThis: {
    // TODO: support for cross-browser environments
    browser: typeof chrome;
    chrome: typeof chrome;
};

export interface IBrowserEngineOptions {
    storageAreaName?: StorageAreaName;
    ns?: string;
}

/**
 * A base class for interacting with a Chrome storage engine.
 * @abstract
 */
abstract class BrowserEngine {
    protected readonly storage: InternalStorage = globalThis.chrome?.storage;
    protected readonly primaryClient: StorageArea;
    protected readonly storageAreaName: StorageAreaName;
    protected NS: INamespacedInterface;
    protected readonly watchMap = new Map<
        string,
        {
            callbackSet: Set<StorageWatchCallback>;
            listener: StorageWatchEventListener;
        }
    >();

    constructor({
        storageAreaName = "sync",
        ns = "",
    }: IBrowserEngineOptions = {}) {
        this.NS = new KeyNamespace(ns);
        this.storageAreaName = storageAreaName;
        this.primaryClient = this.storage[storageAreaName];
    }

    /**
     * Gets all key-value pairs from the primary storage client that are valid for this engine instance.
     */
    public getAll = async () => {
        const allData = await this.primaryClient.get();
        const result: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(allData)) {
            if (this.NS.isKeyInNamespace(key)) {
                result[this.NS.getUnnamespacedKey(key)] = value;
            }
        }
        return result;
    };

    /**
     * Determines whether the storage API is available.
     */
    protected get isStoragePermitted() {
        return !!this.storage;
    }

    /**
     * Removes all items from storage.
     */
    public clear = async () => {
        await this.primaryClient.clear();
    };

    /**
     * Removes item from storage.
     */
    public remove = (
        key: string,
        onCompletion: (
            err: chrome.runtime.LastError | undefined,
            removed: boolean
        ) => void
    ) => {
        if (this.isStoragePermitted) {
            const nsKey = this.NS.getNamespacedKey(key);
            this.primaryClient.remove(nsKey, () => {
                onCompletion(chrome.runtime.lastError, true);
            });
        }
    };

    /**
     * Removes all items from storage.
     */
    public removeAll = async (
        onCompletion: (err?: chrome.runtime.LastError | undefined) => void
    ) => {
        const allData = await this.getAll();
        const keyList = Object.keys(allData);
        if (!keyList.length) {
            onCompletion();
            return;
        }

        new Promise<void>(resolve => {
            const removedKeys = new Set<string>();

            keyList.forEach(key => {
                this.remove(key, err => {
                    if (err) {
                        onCompletion(err);
                        return;
                    }
                    removedKeys.add(key);
                    if (removedKeys.size === keyList.length) {
                        resolve();
                    }
                });
            });
        }).then(() => onCompletion());
    };

    /**
     * Get value from chrome storage.
     */
    public get = <T = string>(
        key: string,
        onCompletion: (
            err?: chrome.runtime.LastError | undefined,
            value?: T | null
        ) => void,
        transform?: (...args: Array<any>) => any
    ) => {
        const nsKey = this.NS.getNamespacedKey(key);
        this.primaryClient.get(nsKey, async result => {
            if (chrome.runtime.lastError) {
                onCompletion(chrome.runtime.lastError);
            } else {
                const rawValue = result[nsKey];
                let originalValue = this.parseValue<T>(rawValue);
                if (transform && originalValue) {
                    try {
                        originalValue = await transform(originalValue);
                    } catch (e) {
                        onCompletion(e as Error);
                    }
                }

                onCompletion(undefined, originalValue);
            }
        });
    };

    /**
     * Set the value. If it is a secret, it will only be set in extension storage.
     */
    public set = async <T = any>(
        key: string,
        rawValue: T,
        onCompletion: (
            err?: chrome.runtime.LastError | undefined,
            value?: T | null
        ) => void,
        transform?: (...args: Array<T>) => any
    ) => {
        const nsKey = this.NS.getNamespacedKey(key);
        let value = rawValue;

        if (transform) {
            value = await transform(rawValue);
        }

        this.primaryClient.set({ [nsKey]: JSON.stringify(value) }, () => {
            onCompletion(chrome.runtime.lastError);
        });
    };

    /**
     * Parse the value into its original form from storage raw value.
     */
    protected parseValue = <T>(rawValue: string): T | null => {
        try {
            if (rawValue !== undefined) {
                return JSON.parse(rawValue);
            }
        } catch (e) {
            console.error(e);
        }

        return null;
    };

    public abstract watch: (callbackMap: StorageCallbackMap) => boolean;
    public abstract unwatch: (callbackMap: StorageCallbackMap) => boolean;
    public abstract unwatchAll: () => void;
}

export default BrowserEngine;

/* eslint max-lines: off */
