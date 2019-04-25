import { browser } from "webextension-polyfill-ts";
import * as _ from "lodash";
import { Labeled, State } from "../state";
import UserStateMachine, { UserState } from "../common/machine";
import {
  getLabeled,
  setUserState,
  getUserState,
  setLabeled,
  getLocalStorage,
} from "./storage";

export const setActiveUrl = async (url: string) => {
  // Transition state
  await transitionUserState({ type: "ACTIVATE_URL", url, path: [url] });

  // Add place holder
  const labeled: Labeled = await getLabeled();
  const labeledForUrl = labeled[url];
  const newLabeledForUrl = labeledForUrl || {};
  const withoutUrl = _.omit(labeled, url);
  const newLabeled = { ...withoutUrl, [url]: newLabeledForUrl };
  console.log("Setting new labeled", newLabeled);
  await setLabeled(newLabeled);
};

export const checkIsActiveUrl = async (url: string): Promise<boolean> => {
  const activeUrl = (await getUserState()).context.url;
  console.log(`Active url: ${JSON.stringify(activeUrl)}, comparing to: ${url}`);
  return url === activeUrl;
};

export const transitionUserState = async (
  transition: any
): Promise<UserState> => {
  const userState = await getUserState();
  const newState = UserStateMachine.transition(userState, transition);
  console.log(`New state: ${newState.value}`);
  await setUserState(newState);
  return newState;
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
  const listener = buildStateChangeHandler(stateChangeHandler);
  browser.storage.onChanged.addListener(listener);
  return listener;
};

export const unsubscribeToChanges = (listener: any) => {
  browser.storage.onChanged.removeListener(listener);
};

/**
 * Handle selection from web page.
 * @param selection Selection string
 * @returns Phase that was handled, can be used for selective coloring
 */
export const handleSelection = async (selection: string): Promise<any> => {
  const userState = await getUserState();
  if (userState.value === "addingPath") {
    await addNewPath(userState, selection);
  } else if (userState.value === "addingOperation") {
    await addNewOperation(userState, selection);
  } else {
    console.warn(`Unknown state, no idea what to do: ${userState.value}`);
  }
};

export const addNewOperation = async (
  userState: UserState,
  selection: string
) => {
  console.log(`Adding operation: ${selection}`);
  const labeled: Labeled = await getLabeled();
  const activePath = userState.context.path;
  if (!activePath) {
    throw Error("Cannot set operation without active path");
  }
  const toAdd = { [selection]: {} };
  console.log(`Adding: ${JSON.stringify(toAdd)}`);
  _.set(labeled, activePath, toAdd);
  console.log(`New labeled: ${JSON.stringify(labeled)}`);
  await setLabeled(labeled);
  await transitionUserState({
    type: "NEXT",
    path: [userState.context.path[0]],
  });
  // TODO Where to go from here
};

export const addNewPath = async (
  userState: UserState,
  selection: string
): Promise<string[]> => {
  const labeled = await getLabeled();
  const activeUrl = userState.context.url;
  if (!activeUrl) {
    console.warn("No active url, returning");
    return;
  }
  // Needs to be array to avoid the mess with periods in URL
  const insertionPath: string[] = [activeUrl];
  const existingForUrl = labeled[activeUrl] || {};
  const toAddForUrl = { ...existingForUrl, [selection]: {} };
  console.log(`Adding: ${JSON.stringify(toAddForUrl)}`);
  _.set(labeled, insertionPath, toAddForUrl);
  console.log(`New labeled: ${JSON.stringify(labeled)}`);
  await setLabeled(labeled);
  const newActivePath = insertionPath.concat(selection);
  // Update active path
  await transitionUserState({ type: "NEXT", path: newActivePath });
  return newActivePath;
};

export const initialize = async () => {
  console.log("Initializing store");
  await browser.storage.local.clear();
};
