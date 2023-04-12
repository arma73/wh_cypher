import BrowserEngine from "./BrowserEngine";

import type { StorageWatchCallback, StorageCallbackMap } from "./_types";

/**
 * Watches for changes in Chrome storage and triggers callback functions accordingly.
 */
class StorageWatcher extends BrowserEngine {
    /**
     * Adds a listener for each key in the provided callback map.
     * @param {StorageCallbackMap} callbackMap - A map of key-value pairs to watch for changes in Chrome storage.
     */
    private addListener(callbackMap: StorageCallbackMap) {
        Object.entries(callbackMap).forEach(([key, callback]) => {
            const nsKey = this.NS.getNamespacedKey(key);

            const callbackSet =
                this.watchMap.get(nsKey)?.callbackSet || new Set();
            callbackSet.add(callback);

            if (callbackSet.size > 1) {
                return;
            }

            const chromeStorageListener: StorageWatchCallback = (
                changes,
                areaName
            ) => {
                if (areaName !== this.storageAreaName) {
                    return;
                }

                const callbackKeySet = new Set(Object.keys(callbackMap));
                const changeKeys = Object.keys(changes);

                const relevantKeyList = changeKeys.filter(changedKey =>
                    callbackKeySet.has(changedKey)
                ) as Array<"newValue" | "oldValue">;

                if (relevantKeyList.length === 0) {
                    return;
                }

                Promise.all(
                    relevantKeyList.map(async relevantKey => {
                        const storageComms = this.watchMap.get(relevantKey);
                        const [newValue, oldValue] = await Promise.all([
                            this.parseValue(changes[relevantKey].newValue),
                            this.parseValue(changes[relevantKey].oldValue),
                        ]);

                        storageComms?.callbackSet?.forEach(cb =>
                            cb({ newValue, oldValue }, areaName)
                        );
                    })
                );
            };

            this.storage.onChanged.addListener(chromeStorageListener);

            this.watchMap.set(nsKey, {
                callbackSet,
                listener: chromeStorageListener,
            });
        });
    }

    /**
     * Removes the listener for each key in the provided callback map.
     * @param {StorageCallbackMap} callbackMap - A map of key-value pairs to remove listeners for.
     */
    private removeListener(callbackMap: StorageCallbackMap) {
        for (const [key, callback] of Object.entries(callbackMap)) {
            const nsKey = this.NS.getNamespacedKey(key);

            if (this.watchMap.has(nsKey)) {
                const storageComms = this.watchMap.get(nsKey);
                if (storageComms) {
                    storageComms.callbackSet.delete(callback);

                    if (storageComms.callbackSet.size === 0) {
                        this.watchMap.delete(nsKey);
                        this.storage.onChanged.removeListener(
                            storageComms.listener
                        );
                    }
                }
            }
        }
    }

    /**
     * Watches for changes in Chrome storage based on the provided callback map.
     * @param {StorageCallbackMap} callbackMap - A map of key-value pairs to watch for changes in Chrome storage.
     * @returns {boolean} Returns true if the watcher was added successfully, otherwise false.
     */
    public watch = (callbackMap: StorageCallbackMap) => {
        if (this.isStoragePermitted) {
            this.addListener(callbackMap);
        }

        return true;
    };

    /**
     * Removes the specified callback(s) from the list of storage change listeners.
     * @param {StorageCallbackMap} callbackMap - An object containing key-value pairs where the key is the storage key to listen for changes on, and the value is the callback function to be executed when a change occurs.
     * @returns {boolean} Returns true if the callback(s) were successfully removed, false otherwise.
     */
    public unwatch = (callbackMap: StorageCallbackMap) => {
        if (this.isStoragePermitted) {
            this.removeListener(callbackMap);
        }
        return true;
    };

    /**
     * Removes all storage change listeners that were added using the `watch` method.
     * @returns {void}
     */
    public unwatchAll = () => {
        this.watchMap.forEach(({ listener }) =>
            this.storage.onChanged.removeListener(listener)
        );

        this.watchMap.clear();
    };
}

export default StorageWatcher;
