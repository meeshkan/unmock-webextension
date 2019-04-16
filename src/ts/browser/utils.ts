import { browser, Tabs } from "webextension-polyfill-ts";

export const getActiveTab = async (): Promise<Tabs.Tab> => {
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tabs[0];
};

export const downloadTo = ({ url }) => {
  browser.downloads.download({
    url,
    filename: "export.json",
  });
};

export const openExplorer = async () => {
  return await browser.windows.create({
    url: browser.runtime.getURL("explorer.html"),
    type: "popup",
  });
};
