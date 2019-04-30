import { Labeled, State, defaultLabeled, TabInfo } from "../state";
import { browser } from "webextension-polyfill-ts";
import UserStateMachine, {
  createState,
  UserState,
  UserStateConfig,
} from "../common/machine";
import * as _ from "lodash";
/**
 * These must match with the keys of `State` interface
 */
const STORAGE_LABELED_KEY = "labeled";
const STORAGE_USERSTATE_KEY = "userState";
const STORAGE_TABINFO_KEY = "tabInfo";

export const getLabeled = async (): Promise<Labeled> => {
  const labeledResult = await browser.storage.local.get([STORAGE_LABELED_KEY]);
  return labeledResult[STORAGE_LABELED_KEY] || {};
};

export const setUserState = async (userState: UserStateConfig) => {
  await browser.storage.local.set({ [STORAGE_USERSTATE_KEY]: userState });
};

export const getUserStateConfig = async (): Promise<UserStateConfig> => {
  const result = await browser.storage.local.get([STORAGE_USERSTATE_KEY]);
  const persistedUserState = result[STORAGE_USERSTATE_KEY];

  return persistedUserState || UserStateMachine.initialState;
};

export const getUserState = async (): Promise<UserState> => {
  const persistedUserState = await getUserStateConfig();

  return UserStateMachine.resolveState(createState(persistedUserState));
};

export const setTabInfo = async (tabInfo: TabInfo) => {
  await browser.storage.local.set({ [STORAGE_TABINFO_KEY]: tabInfo });
};

export const getTabInfo = async (): Promise<TabInfo | null> => {
  const tabInfoResult = await browser.storage.local.get(STORAGE_TABINFO_KEY);
  console.log("TabInfo result", JSON.stringify(tabInfoResult));
  return tabInfoResult[STORAGE_TABINFO_KEY] || null;
};

export const getLocalStorage = async (): Promise<State> => {
  const items = await browser.storage.local.get(null);
  return _.defaults(items, {
    labeled: defaultLabeled,
    userState: UserStateMachine.initialState,
  });
};

export const setLabeled = async (labeled: Labeled) => {
  await browser.storage.local.set({ [STORAGE_LABELED_KEY]: labeled });
};

export const initialize = async () => {
  console.log("Initializing store");
  await browser.storage.local.clear();
};
