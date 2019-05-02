import { browser } from "webextension-polyfill-ts";
import messageHandler, { checkIfApi } from "./handlers";
import * as messages from "../messages";
import debug from "../common/logging";
import { sender } from "../browser";

const debugLog = debug("unmock:content-script");
debugLog("Running content script.");

const onLoad = async () => {
  debugLog("Page loaded");
  const isApi = await checkIfApi();
  sender.sendRuntimeMessage({
    type: messages.MessageType.SET_BADGE,
    props: {
      isApi,
    },
  });
};

window.onload = onLoad;

browser.runtime.onMessage.addListener(messageHandler);
