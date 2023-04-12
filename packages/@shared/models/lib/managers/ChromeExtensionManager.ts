interface IChromeExtensionManagerOptions {
    install: {
        tabPath: string;
    };
}

class ChromeExtensionManager {
    constructor(private readonly options: IChromeExtensionManagerOptions) {
        chrome.runtime.onInstalled.addListener(this.handleInstalled);
    }

    /**
     * Handles the installation of the Chrome extension
     * @param details - The details of the installation event
     */
    private handleInstalled = async (
        details: chrome.runtime.InstalledDetails
    ) => {
        if (details.reason === "install") {
            const { tabPath } = this.options.install;
            const popupUrl = chrome.runtime.getURL(tabPath);
            await chrome.tabs.create({ url: popupUrl });
        }
    };
}

export default ChromeExtensionManager;
