import "../../scss/popup.scss";
import * as messages from "../messages";
import { sender, utils } from "../browser";

const setActive = document.getElementById("set-active");

setActive.onclick = async () => {
  const tab = await utils.getActiveTab();
  const initializeMsg = messages.SetActiveUrl.build({ url: tab.url });
  await sender.sendRuntimeMessage(initializeMsg);
};

const openButton = document.getElementById("open");

openButton.onclick = () => {
  utils.openExplorer();
};
