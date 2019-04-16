import * as messages from "../messages";
import { MessageGeneric } from "../messages/types";
import { SelectEndpoint } from "../messages/selectEndpoint";
import { browser, Runtime } from "webextension-polyfill-ts";
import { setupContextMenus } from "./contextMenus";
import { addToSelection, checkIsActiveUrl, initialize } from "../browser/store";
import { getActiveTab } from "../browser/utils";

// Add context menus
browser.runtime.onInstalled.addListener(async () => {
  await setupContextMenus();
});

const sendMessageToActiveCurrentWindowTab = async (
  message: MessageGeneric<any>
) => {
  console.log(`Sending message: ${JSON.stringify(message)}`);
  const tab = await getActiveTab();
  await browser.tabs.sendMessage(tab.id, message);
};

chrome.runtime.onSuspend.addListener(() => {
  console.log("Suspending.");
});

const messageLogger = (request: any, sender: Runtime.MessageSender) => {
  let logMessage = `Got message '${JSON.stringify(request)}' from `;
  logMessage += sender.tab
    ? "from a content script at: " + sender.tab.url
    : "from the extension";
  console.log(logMessage);
};

browser.runtime.onMessage.addListener(messageLogger);

const badgeUpdater = async (request: any) => {
  if (!request.activate) {
    return;
  }
  console.log(`Activating badge as got: ${JSON.stringify(request)}`);
  await browser.browserAction.setBadgeText({ text: "API" });
  await browser.browserAction.setBadgeBackgroundColor({ color: "#4688F1" });
};

browser.runtime.onMessage.addListener(badgeUpdater);

const saveAndMessageTab = async (selection: string) => {
  await addToSelection(selection);
  const message = messages.SelectionHandled.build({});
  await sendMessageToActiveCurrentWindowTab(message);
};

const handleSelectEndpoint = async (
  request: SelectEndpoint,
  senderUrl: string
) => {
  const isActiveUrl = await checkIsActiveUrl(senderUrl);
  if (isActiveUrl) {
    await saveAndMessageTab(request.props.selection);
  } else {
    console.warn(`Ignoring select endpoint from inactive URL: ${senderUrl}`);
  }
};

const messageHandler = async (request: any, sender: Runtime.MessageSender) => {
  if (messages.InitializeStore.matches(request)) {
    const url = request.props.url;
    await initialize(url);
  } else if (messages.SelectEndpoint.matches(request)) {
    await handleSelectEndpoint(request, sender.tab.url);
  }
};

browser.runtime.onMessage.addListener(messageHandler);

// Commands from keyboard shortcuts
browser.commands.onCommand.addListener(async (command: string) => {
  console.log("Got command:", command);
  if (command === "toggle-unmock") {
    await sendMessageToActiveCurrentWindowTab(
      messages.SelectionRequest.build({})
    );
  }
});
