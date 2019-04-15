import "../scss/popup.scss";
import * as messages from "./messages";

const initialize = document.getElementById("initialize");

initialize.onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tab = tabs[0];
    const initializeMsg = messages.initializeStore.build({ url: tab.url });
    chrome.runtime.sendMessage(initializeMsg);
  });
};

const exportButton = document.getElementById("export");

exportButton.onclick = () => {
  console.log("Exporting data...");
  chrome.storage.local.get(null, items => {
    const text = JSON.stringify(items);
    const url = "data:application/json;base64," + btoa(text);
    chrome.downloads.download({
      url,
      filename: "export.json",
    });
    console.log(`Exported: ${text}`);
  });
};

const openButton = document.getElementById("open");

openButton.onclick = () => {
  chrome.windows.create({
    url: chrome.runtime.getURL("window.html"),
    type: "popup",
  });
};
