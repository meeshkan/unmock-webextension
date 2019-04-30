import { MessageGeneric } from "../messages/types";
import { browser } from "webextension-polyfill-ts";
import debug from "../common/logging";

const debugLog = debug("unmock:sender");

export const sendMessageToTab = async (
  tabId: number,
  message: MessageGeneric<any>
) => {
  debugLog(`Sending message to tab ${tabId}`);
  return browser.tabs.sendMessage(tabId, message);
};

export const sendMessageToActiveCurrentWindowTab = async (
  message: MessageGeneric<any>
) => {
  debugLog(`Sending message: ${JSON.stringify(message)}`);
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  await sendMessageToTab(tabs[0].id, message);
};

export const sendRuntimeMessage = async (msg: MessageGeneric<any>) => {
  await browser.runtime.sendMessage(msg);
};
