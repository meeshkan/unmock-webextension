import { MessageGeneric } from "../messages/types";
import { browser } from "webextension-polyfill-ts";

export const sendMessageToActiveCurrentWindowTab = async (
  message: MessageGeneric<any>
) => {
  console.log(`Sending message: ${JSON.stringify(message)}`);
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  await browser.tabs.sendMessage(tabs[0].id, message);
};
