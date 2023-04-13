import {
    ChromeExtensionManager,
    AccountMessageManager,
    CryptoMessageManager,
} from "@shared/models";

new ChromeExtensionManager({ install: { tabPath: "popup.html" } });
new AccountMessageManager();
new CryptoMessageManager();
