import * as messages from "../messages";
import { browser, Runtime } from "webextension-polyfill-ts";
import { setupContextMenus } from "./contextMenus";
import { store, sender as messageSender, storage } from "../browser";
import { handleSelection } from "./selection";

// Add context menus
browser.runtime.onInstalled.addListener(async () => {
  await setupContextMenus();
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
  if (!(request.type === messages.MessageType.SET_BADGE)) {
    return;
  }
  console.log(`Activating badge as got: ${JSON.stringify(request)}`);
  if (request.props.isApi) {
    await browser.browserAction.setBadgeText({ text: "API" });
    await browser.browserAction.setBadgeBackgroundColor({
      color: "#4688F1",
    });
  } else {
    await browser.browserAction.setBadgeText({ text: "" });
  }
};

browser.runtime.onMessage.addListener(badgeUpdater);

const messageHandler = async (request: any, sender: Runtime.MessageSender) => {
  if (messages.InitializeStore.matches(request)) {
    await storage.initialize();
  } else if (messages.SelectEndpoint.matches(request)) {
    await handleSelection({
      url: sender.tab.url,
      selection: request.props.selection,
    });
  } else if (messages.SetActiveUrl.matches(request)) {
    await store.setActiveUrl(request.props.url);
  }
};

browser.runtime.onMessage.addListener(messageHandler);

// Commands from keyboard shortcuts
browser.commands.onCommand.addListener(async (command: string) => {
  console.log("Got command:", command);
  if (command === "toggle-unmock") {
    await messageSender.sendMessageToActiveCurrentWindowTab(
      messages.SelectionRequest.build({})
    );
  }
});

browser.tabs.onActivated.addListener(async activeInfo => {
  try {
    await messageSender.sendMessageToTab(activeInfo.tabId, {
      type: messages.MessageType.CHECK_IF_API,
      props: {},
    });
  } catch (err) {
    // Sending the message fails e.g. in chrome:// pages
    // so do not log error.
    console.warn(`Failed sending message to tab ${activeInfo.tabId}`, err);
  }
});
