const s = document.createElement('script');
s.src = browser.runtime.getURL('/js/request-analyzer.js');
s.onload = function () {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

browser.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        sendResponse(JSON.stringify("response"));
        analyzeRequest(request);
    }
);