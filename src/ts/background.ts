import * as messages from "./messages";
import { MessageGeneric } from "./messages/types";
import { SelectEndpoint } from "./messages/selectEndpoint";
import { browser } from "webextension-polyfill-ts";

// Holds the data structure for all the context menus used in the app
const CONTEXT_MENU_CONTENTS = {
  forSelection: ["Add endpoint"],
};

const setupContextMenus = () => {
  CONTEXT_MENU_CONTENTS.forSelection.forEach(commandId => {
    browser.contextMenus.create({
      type: "separator",
      id: "sep1",
      contexts: ["selection"],
    });
    browser.contextMenus.create({
      title: commandId + ' "%s"',
      id: commandId,
      contexts: ["selection"],
    });
  });
};

// Add context menus
browser.runtime.onInstalled.addListener(() => {
  setupContextMenus();
});

const sendMessageToActiveCurrentWindowTab = async (
  message: MessageGeneric<any>,
  callback?: any
) => {
  console.log(`Sending message: ${JSON.stringify(message)}`);
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  browser.tabs.sendMessage(tabs[0].id, message, callback);
};

browser.contextMenus.onClicked.addListener(async item => {
  console.log(
    `Selection menu '${item.menuItemId}' got selection: '${item.selectionText}'`
  );
  if (!item.selectionText) {
    return;
  }
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const tab = tabs[0];
  const url = tab.url;
  ifActiveUrl(url, () => saveAndMessageTab(item.selectionText));
});

chrome.runtime.onSuspend.addListener(() => {
  console.log("Suspending.");
});

const messageLogger = (request, sender) => {
  let logMessage = `Got message '${JSON.stringify(request)}' from `;
  logMessage += sender.tab
    ? "from a content script at: " + sender.tab.url
    : "from the extension";
  console.log(logMessage);
};

browser.runtime.onMessage.addListener(messageLogger);

const badgeUpdater = request => {
  if (!request.activate) {
    return;
  }
  console.log(`Activating badge as got: ${JSON.stringify(request)}`);
  browser.browserAction.setBadgeText({ text: "API" });
  browser.browserAction.setBadgeBackgroundColor({ color: "#4688F1" });
};

browser.runtime.onMessage.addListener(badgeUpdater);

const initialize = async url => {
  console.log(`Initializing for URL: ${url}`);
  await browser.storage.local.clear();
  await browser.storage.local.set({ [STORAGE_ACTIVE_URL_KEY]: url });
};

const STORAGE_ACTIVE_URL_KEY = "active_url";
const STORAGE_SELECTIONS_KEY = "selections";

const saveAndMessageTab = async (selection: string) => {
  const callback = () => {
    const message = messages.SelectionHandled.build({});
    sendMessageToActiveCurrentWindowTab(message);
  };
  const items = await browser.storage.local.get([STORAGE_SELECTIONS_KEY]);
  const previous = (items && items[STORAGE_SELECTIONS_KEY]) || [];
  const newSelections = previous.concat(selection);
  await browser.storage.local.set({ [STORAGE_SELECTIONS_KEY]: newSelections });
  callback();
};

const ifActiveUrl = async (url, callback) => {
  const activeUrlResult = await browser.storage.local.get([
    STORAGE_ACTIVE_URL_KEY,
  ]);
  const activeUrl = activeUrlResult[STORAGE_ACTIVE_URL_KEY];
  console.log(`Active url: ${JSON.stringify(activeUrl)}, comparing to: ${url}`);
  if (url !== activeUrl) {
    console.log(`Message from inactive url: ${url}`);
    return;
  }
  callback();
};

const handleSelectEndpoint = (request: SelectEndpoint, senderUrl) => {
  const url = senderUrl;
  ifActiveUrl(url, () => saveAndMessageTab(request.props.selection));
};

const messageHandler = async (request, sender) => {
  if (messages.InitializeStore.matches(request)) {
    const url = request.props.url;
    await initialize(url);
  } else if (messages.SelectEndpoint.matches(request)) {
    handleSelectEndpoint(request, sender.tab.url);
  }
};

browser.runtime.onMessage.addListener(messageHandler);

// Commands from keyboard shortcuts
browser.commands.onCommand.addListener(command => {
  console.log("Command:", command);
  if (command === "toggle-unmock") {
    sendMessageToActiveCurrentWindowTab(messages.SelectionRequest.build({}));
  }
});
