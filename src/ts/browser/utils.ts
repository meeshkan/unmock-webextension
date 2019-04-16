import { browser, Tabs } from "webextension-polyfill-ts";

export const getActiveTab = async (): Promise<Tabs.Tab> => {
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tabs[0];
};
