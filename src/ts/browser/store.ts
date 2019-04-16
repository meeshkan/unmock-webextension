import { browser } from "webextension-polyfill-ts";

const STORAGE_ACTIVE_URL_KEY = "active_url";
const STORAGE_SELECTIONS_KEY = "selections";

export const checkIsActiveUrl = async (url: string): Promise<boolean> => {
  const activeUrlResult = await browser.storage.local.get([
    STORAGE_ACTIVE_URL_KEY,
  ]);
  const activeUrl = activeUrlResult[STORAGE_ACTIVE_URL_KEY];
  console.log(`Active url: ${JSON.stringify(activeUrl)}, comparing to: ${url}`);
  return url === activeUrl;
};

export const getSelections = async () => {
  return await browser.storage.local.get([STORAGE_SELECTIONS_KEY]);
};

export const getLocalStorage = async () => {
  return await browser.storage.local.get(null);
};

export const addToSelection = async (selection: string) => {
  const items = await getSelections();
  const previous = (items && items[STORAGE_SELECTIONS_KEY]) || [];
  const newSelections = previous.concat(selection);
  await browser.storage.local.set({ [STORAGE_SELECTIONS_KEY]: newSelections });
};

export const initialize = async (url: string) => {
  console.log(`Initializing for URL: ${url}`);
  await browser.storage.local.clear();
  await browser.storage.local.set({ [STORAGE_ACTIVE_URL_KEY]: url });
};
