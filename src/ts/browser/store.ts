import * as _ from "lodash";
import { Labeled } from "../state";
import { UserState, persistedUserStateMachine } from "../common/machine";
import { getLabeled, setLabeled } from "./storage";

export const setActiveUrl = async (url: string) => {
  // Transition state
  await persistedUserStateMachine.transition({
    type: "ACTIVATE_URL",
    url,
    path: [url],
  });

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
  const activeUrl = (await persistedUserStateMachine.resolve()).context.url;
  console.log(`Active url: ${JSON.stringify(activeUrl)}, comparing to: ${url}`);
  return url === activeUrl;
};

/**
 * Handle selection from web page.
 * @param selection Selection string
 * @returns Phase that was handled, can be used for selective coloring
 */
export const handleSelection = async (selection: string): Promise<any> => {
  const userState = await persistedUserStateMachine.resolve();
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
  await persistedUserStateMachine.transition(
    {
      type: "NEXT",
      path: [userState.context.path[0]],
    },
    userState
  );
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
  await persistedUserStateMachine.transition(
    { type: "NEXT", path: newActivePath },
    userState
  );
  return newActivePath;
};
