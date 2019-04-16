import "../../scss/popup.scss";
import * as messages from "../messages";
import { browser } from "webextension-polyfill-ts";

const initialize = document.getElementById("initialize");

initialize.onclick = async () => {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const tab = tabs[0];
  const initializeMsg = messages.InitializeStore.build({ url: tab.url });
  await browser.runtime.sendMessage(initializeMsg);
};

const exportButton = document.getElementById("export");

exportButton.onclick = async () => {
  console.log("Exporting data...");
  const items = await chrome.storage.local.get(null);
  const text = JSON.stringify(items);
  const url = "data:application/json;base64," + btoa(text);
  browser.downloads.download({
    url,
    filename: "export.json",
  });
  console.log(`Exported: ${text}`);
};

const openButton = document.getElementById("open");

openButton.onclick = () => {
  browser.windows.create({
    url: browser.runtime.getURL("explorer.html"),
    type: "popup",
  });
};
