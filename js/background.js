browser.storage.onChanged.addListener((changes, namespace) => {
    browser.action.setTitle({
        title: changes.enabled?.newValue ? 'AEP analyzer is ON' : 'AEP analyzer is OFF'
    });

    browser.action.setIcon({
        path: changes.enabled?.newValue ? '../img/icon-on.png' : '../img/icon-off.png'
    });
});

browser.webRequest.onBeforeRequest.addListener(
    (details) => {
        browser.storage.local.get('enabled', (data) => {
            if (data.enabled) {
                browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    if (details.method === 'POST' && details.requestBody?.raw) {
                        details.postQuery = '';
                        for (let i = 0; i < details.requestBody.raw.length; ++i) {
                            details.postQuery += new TextDecoder().decode(details.requestBody.raw[i].bytes);
                        }
                    }
                    browser.tabs.sendMessage(details.tabId, details);
                });
            }
        })
    },
    { urls: ["*://*/*/*/*/interact*"] }, ['requestBody']
)

/* browser.runtime.onMessage.addListener((request, sender, reply) => {
    console.log('Request: ', request);
    return true;
}); */

browser.runtime.onInstalled.addListener(() => {
    browser.storage.local.set({ enabled: true });
});

browser.management.onEnabled.addListener(() => {
    browser.storage.local.set({ enabled: true });
});

browser.management.onDisabled.addListener(() => {
    browser.storage.local.clear();
});