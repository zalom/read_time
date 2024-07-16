// Service worker with full support for Chrome extensions API.
// This is considered as the backend of the extension.
// It does not have access to the DOM, but can communicate with the content scripts.
// It can also communicate with the background scripts.
chrome.tabs.onActivated.addListener((activeInfo) => {
  console.log(activeInfo.tabId);

  chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
    chrome.scripting.executeScript(
      {
        target: {tabId: tab.id},
        files: ['scripts/exec/send_message.js'],
        // func: () => {}, // files or function, both do not work.
      })
  })
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.badgeText != null) {
    chrome.action.setBadgeText({
      text: message.badgeText,
    }, () => chrome.runtime.lastError); // ignore errors due to closed/prerendered tabs
  }
});
