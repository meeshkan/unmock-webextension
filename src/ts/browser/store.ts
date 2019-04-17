import { browser } from "webextension-polyfill-ts";
import * as _ from "lodash";
import { Active, Labeled } from "./state";

const STORAGE_SELECTIONS_KEY = "selections";

export const checkIsActiveUrl = async (url: string): Promise<boolean> => {
  const activeResult = await getActive();
  console.log(`Active: ${JSON.stringify(activeResult)}`);
  const activeUrl = activeResult.url;
  console.log(`Active url: ${JSON.stringify(activeUrl)}, comparing to: ${url}`);
  return url === activeUrl;
};

export const getSelections = async () => {
  return await browser.storage.local.get([STORAGE_SELECTIONS_KEY]);
};

const STORAGE_LABELED_KEY = "labeled";

export const getLabeled = async (): Promise<Labeled> => {
  const labeledResult = await browser.storage.local.get([STORAGE_LABELED_KEY]);
  return labeledResult[STORAGE_LABELED_KEY] || {};
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

const setLabeled = async (labeled: Labeled) => {
  await browser.storage.local.set({ [STORAGE_LABELED_KEY]: labeled });
};

export const addToLabeled = async (selection: string) => {
  const labeled = await getLabeled();
  const active = await getActive();
  const activeUrl = active.url;
  if (!activeUrl) {
    console.warn("No active url, returning");
    return;
  }
  const activePath = active.activePath || [];
  _.set(labeled, [].concat(activeUrl, ...activePath), selection);
  await setLabeled(labeled);
};

const STORAGE_ACTIVE_KEY = "active";

const getActive = async (): Promise<Active> => {
  const state = (await browser.storage.local.get(STORAGE_ACTIVE_KEY)) || {};
  console.log(`Active state: ${JSON.stringify(state)}`);
  const active = state.active || {};
  return { url: active.url };
};

export const initialize = async (url: string) => {
  console.log(`Initializing for URL: ${url}`);
  await browser.storage.local.clear();
  const active: Active = await getActive();
  _.set(active, "url", url);
  await browser.storage.local.set({ [STORAGE_ACTIVE_KEY]: active });
};

export const addToStorage = async () => {
  const storage = await browser.storage.local.get(["selectionsPlay"]);
  const selections = storage.selectionsPlay || {};
  _.updateWith(selections, ["test", "value"], value => (value || "") + "value");
  console.log(`Selections: ${JSON.stringify(selections)}`);
  await browser.storage.local.set({ selectionsPlay: selections });
  const items = await browser.storage.local.get(["selectionsPlay"]);
  console.log(`Got selections with: ${JSON.stringify(items)}`);
};
