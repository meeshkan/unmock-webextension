import {
  Active,
  Labeled,
  State,
  defaultActive,
  defaultLabeled,
} from "../state";
import { browser } from "webextension-polyfill-ts";
import UserStateMachine, {
  createState,
  State as UserState,
  AnyUserState,
} from "./machine";
import * as _ from "lodash";

/**
 * These must match with the keys of `State` interface
 */
const STORAGE_ACTIVE_KEY = "active";
const STORAGE_LABELED_KEY = "labeled";
const STORAGE_USERSTATE_KEY = "userState";

export const getLabeled = async (): Promise<Labeled> => {
  const labeledResult = await browser.storage.local.get([STORAGE_LABELED_KEY]);
  return labeledResult[STORAGE_LABELED_KEY] || {};
};

export const setUserState = async (userState: UserState<any, any>) => {
  await browser.storage.local.set({ [STORAGE_USERSTATE_KEY]: userState });
};

export const getUserState = async (): Promise<AnyUserState> => {
  const result = await browser.storage.local.get([STORAGE_USERSTATE_KEY]);
  const persistedUserState = result[STORAGE_USERSTATE_KEY];

  return persistedUserState
    ? UserStateMachine.resolveState(createState(persistedUserState))
    : UserStateMachine.initialState;
};

export const getLocalStorage = async (): Promise<State> => {
  const items = await browser.storage.local.get(null);
  return _.defaults(items, {
    active: defaultActive,
    labeled: defaultLabeled,
    userState: UserStateMachine.initialState,
  });
};

export const setLabeled = async (labeled: Labeled) => {
  await browser.storage.local.set({ [STORAGE_LABELED_KEY]: labeled });
};

export const setActive = async (active: Active) => {
  await browser.storage.local.set({ [STORAGE_ACTIVE_KEY]: active });
};

export const getActiveState = async (): Promise<Active> => {
  const state = (await browser.storage.local.get(STORAGE_ACTIVE_KEY)) || {};
  console.log(`Got active state from storage: ${JSON.stringify(state)}`);
  const newActive = _.defaults(state.active || {}, defaultActive);
  console.log(`Parsed active: ${JSON.stringify(newActive)}`);
  return newActive;
};
