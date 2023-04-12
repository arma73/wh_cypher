export type StorageWatchEventListener = Parameters<
    typeof chrome.storage.onChanged.addListener
>[0];
export type StorageAreaName = Parameters<StorageWatchEventListener>[1];
export type StorageWatchCallback = (
    change: chrome.storage.StorageChange,
    area: StorageAreaName
) => void;
export type StorageCallbackMap = Record<string, StorageWatchCallback>;
