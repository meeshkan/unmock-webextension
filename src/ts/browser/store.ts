import { browser } from "webextension-polyfill-ts";
import * as _ from "lodash";
import {
  Active,
  Labeled,
  Phase,
  State,
  defaultActive,
  defaultLabeled,
} from "../state";

/**
 * These must match with the keys of `State` interface
 */
const STORAGE_ACTIVE_KEY = "active";
const STORAGE_LABELED_KEY = "labeled";

export const setActiveUrl = async (url: string) => {
  const active: Active = await getActiveState();
  console.log(`Active: ${JSON.stringify(active)}`);
  const newActive = { ...active, url };
  console.log(
    `Setting new active for url: ${url}: ${JSON.stringify(newActive)}`
  );
  await setActive(newActive);
};

export const checkIsActiveUrl = async (url: string): Promise<boolean> => {
  const activeResult: Active = await getActiveState();
  console.log(`Active: ${JSON.stringify(activeResult)}`);
  const activeUrl = activeResult.url;
  console.log(`Active url: ${JSON.stringify(activeUrl)}, comparing to: ${url}`);
  return url === activeUrl;
};

export const getLabeled = async (): Promise<Labeled> => {
  const labeledResult = await browser.storage.local.get([STORAGE_LABELED_KEY]);
  return labeledResult[STORAGE_LABELED_KEY] || {};
};

export const getLocalStorage = async (): Promise<State> => {
  const items = await browser.storage.local.get(null);
  return _.defaults(items, {
    active: defaultActive,
    labeled: defaultLabeled,
  });
};

type StateChangeHandler = (state: State) => void;

export const buildStateChangeHandler = (
  stateChangeHandler: (state: State) => void
) => {
  return async (changes, namespace) => {
    const state = await getLocalStorage();
    stateChangeHandler(state);
  };
};

export const subscribeToChanges = (stateChangeHandler: StateChangeHandler) => {
  // TODO Provide a way to unsubscribe
  const listener = buildStateChangeHandler(stateChangeHandler);
  browser.storage.onChanged.addListener(listener);
  return listener;
};

export const unsubscribeToChanges = (listener: any) => {
  browser.storage.onChanged.removeListener(listener);
};

const setLabeled = async (labeled: Labeled) => {
  await browser.storage.local.set({ [STORAGE_LABELED_KEY]: labeled });
};

const setActive = async (active: Active) => {
  await browser.storage.local.set({ [STORAGE_ACTIVE_KEY]: active });
};

const updateActivePath = async (path: string[]) => {
  console.log(`Setting active path: ${JSON.stringify(path)}`);
  const active: Active = await getActiveState();
  active.activePath = path;

  // Dumb heuristics, breaks easily
  if (path.length === 1) {
    console.log(`Setting phase to ${Phase.ADD_PATH}`);
    active.phase = Phase.ADD_PATH;
  } else if (path.length === 2) {
    console.log(`Setting phase to ${Phase.ADD_OPERATION}`);
    active.phase = Phase.ADD_OPERATION;
  } else {
    throw Error(`No idea what to do with active path of length ${path.length}`);
  }
  await setActive(active);
};

/**
 * Handle selection from web page.
 * @param selection Selection string
 * @returns Phase that was handled, can be used for selective coloring
 */
export const handleSelection = async (selection: string): Promise<Phase> => {
  const active: Active = await getActiveState();
  if (active.phase === Phase.ADD_PATH) {
    await addNewPath(selection);
    return Phase.ADD_PATH;
  } else if (active.phase === Phase.ADD_OPERATION) {
    await addNewOperation(selection);
    return Phase.ADD_OPERATION;
  }
};

export const addNewOperation = async (selection: string) => {
  console.log(`Adding operation: ${selection}`);
  const labeled: Labeled = await getLabeled();
  const active: Active = await getActiveState();
  const activePath = active.activePath;
  if (!activePath) {
    throw Error("Cannot set operation without active path");
  }
  const toAdd = { [selection]: {} };
  console.log(`Adding: ${JSON.stringify(toAdd)}`);
  _.set(labeled, activePath, toAdd);
  console.log(`New labeled: ${JSON.stringify(labeled)}`);
  await setLabeled(labeled);
  // TODO Where to go from here
};

export const addNewPath = async (selection: string) => {
  const labeled = await getLabeled();
  const active = await getActiveState();
  const activeUrl = active.url;
  if (!activeUrl) {
    console.warn("No active url, returning");
    return;
  }
  // Needs to be array to avoid the mess with periods in URL
  const insertionPath: string[] = [activeUrl];
  const toAdd = { [selection]: {} };
  console.log(`Adding: ${JSON.stringify(toAdd)}`);
  _.set(labeled, insertionPath, toAdd);
  console.log(`New labeled: ${JSON.stringify(labeled)}`);
  await setLabeled(labeled);
  const newActivePath = insertionPath.concat(selection);
  // Update active path
  await updateActivePath(newActivePath);
};

const getActiveState = async (): Promise<Active> => {
  const state = (await browser.storage.local.get(STORAGE_ACTIVE_KEY)) || {};
  console.log(`Got active state from storage: ${JSON.stringify(state)}`);
  const newActive = _.defaults(state.active || {}, defaultActive);
  console.log(`Parsed active: ${JSON.stringify(newActive)}`);
  return newActive;
};

export const initialize = async (url: string) => {
  console.log(`Initializing for URL: ${url}`);
  await browser.storage.local.clear();
  const active: Active = await getActiveState();
  active.url = url;
  await setActive(active);
};
