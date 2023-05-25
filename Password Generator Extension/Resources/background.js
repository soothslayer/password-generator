/*browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Received request: ", request);

    if (request.greeting === "hello")
        sendResponse({ farewell: "goodbye" });
});*/

console.log('Hello from the background script!');
chrome.runtime.onMessage.addListener((msg) => {
  console.log(msg.text);
});

