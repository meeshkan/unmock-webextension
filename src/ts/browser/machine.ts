import { Machine, State, assign } from "xstate";

const userState = {
  id: "labeling",
  initial: "needsToActivateUrl",
  context: {
    url: undefined,
    path: [],
  },
  states: {
    needsToActivateUrl: {
      on: {
        NEXT: "addingPath",
        ACTIVATE_URL: "addingPath",
      },
      onEntry: ["log", "initializeUrl", "initializePath"],
    },
    addingPath: {
      on: {
        NEXT: "addingOperation",
        ACTIVATE_URL: "addingPath",
      },
      onEntry: ["log", "updateUrl", "updatePath"],
    },
    addingOperation: {
      on: {
        NEXT: "addingPath",
        ACTIVATE_URL: "addingPath",
      },
      onEntry: ["log", "updatePath"],
    },
  },
};

const updatePath = assign({
  path: (context, event) => event.path || context.path,
});

const updateUrl = assign({
  url: (context, event) => event.url || context.url,
});

const initializeUrl = assign({
  url: (context, event) => userState.context.url,
});

const initializePath = assign({
  url: (context, event) => userState.context.path,
});

const config = {
  actions: {
    // action implementation
    log: (context, event) => {
      console.log(`Entered: `, context, event);
    },
    initializeUrl,
    initializePath,
    updatePath,
    updateUrl,
  },
};

const userStateMachine = Machine(userState, config);

export const createState = (state: any) => State.create(state);
export const stringifyState = (state: any) => JSON.stringify(state);

export default userStateMachine;

export type AnyUserState = State<any, any>;

export { State };
