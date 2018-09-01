var Redirector = function (from, to) {
    var lastRequestId;
    this.from = from;
    this.to = to;

    this.redirectOnMatch = function (request) {
        if (request.url.indexOf(from) > -1 &&
            request.requestId !== lastRequestId) {
            lastRequestId = request.requestId;
            return {
                redirectUrl: request.url.replace(from, to)
            };
        }
    };
};

var redirector = new Redirector('https://from', 'https://to');

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        return redirector.redirectOnMatch(details);
    },
    {
        urls: ["<all_urls>"]
    },
    ["blocking"]
);
