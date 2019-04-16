import "../../scss/popup.scss";
import * as messages from "../messages";
import { getActiveTab, downloadTo, openExplorer } from "../browser/utils";
import { sendRuntimeMessage } from "../browser/sender";
import { getLocalStorage } from "../browser/store";

const initialize = document.getElementById("initialize");

initialize.onclick = async () => {
  const tab = await getActiveTab();
  const initializeMsg = messages.InitializeStore.build({ url: tab.url });
  await sendRuntimeMessage(initializeMsg);
};

const exportButton = document.getElementById("export");

exportButton.onclick = async () => {
  console.log("Exporting data...");
  const items = await getLocalStorage();
  const text = JSON.stringify(items);
  const url = "data:application/json;base64," + btoa(text);
  downloadTo({ url });
  console.log(`Exported: ${text}`);
};

const openButton = document.getElementById("open");

openButton.onclick = () => {
  openExplorer();
};
