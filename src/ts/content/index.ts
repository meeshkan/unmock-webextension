import { browser } from "webextension-polyfill-ts";
import messageHandler from "./handlers";

console.log("Running content script.");

browser.runtime.onMessage.addListener(messageHandler);
