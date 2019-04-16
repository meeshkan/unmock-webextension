import "../../scss/popup.scss";
import * as messages from "../messages";
import { store, sender, utils } from "../browser";

const initialize = document.getElementById("initialize");

initialize.onclick = async () => {
  const tab = await utils.getActiveTab();
  const initializeMsg = messages.InitializeStore.build({ url: tab.url });
  await sender.sendRuntimeMessage(initializeMsg);
};

const exportButton = document.getElementById("export");

exportButton.onclick = async () => {
  console.log("Exporting data...");
  const items = await store.getLocalStorage();
  const text = JSON.stringify(items);
  const url = "data:application/json;base64," + btoa(text);
  utils.downloadTo({ url });
  console.log(`Exported: ${text}`);
};

const openButton = document.getElementById("open");

openButton.onclick = () => {
  utils.openExplorer();
};
