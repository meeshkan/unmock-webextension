import {
  Machine,
  State,
  assign,
  MachineConfig,
  MachineOptions,
  AssignAction,
  StateConfig,
} from "xstate";
import * as storage from "../browser/storage";

export interface UserStateContext {
  url?: string;
  path: string[];
}

// The events that the machine handles
export type UserStateEvent =
  | { type: "NEXT"; url?: string; path: string[] }
  | { type: "ACTIVATE_URL"; url?: string; path: string[] };

export interface UserStateSchema {
  states: {
    needsToActivateUrl: {};
    addingPath: {};
    addingOperation: {};
  };
}

const initialContext: UserStateContext = {
  url: undefined,
  path: [],
};

const userState: MachineConfig<
  UserStateContext,
  UserStateSchema,
  UserStateEvent
> = {
  id: "labeling",
  initial: "needsToActivateUrl" as "needsToActivateUrl",
  context: initialContext,
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
        ACTIVATE_URL: {
          target: "addingPath",
          internal: false,
        },
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

const updatePath: AssignAction<UserStateContext, UserStateEvent> = assign({
  path: (context: UserStateContext, event: UserStateEvent) =>
    event.path || context.path,
});

const updateUrl: AssignAction<UserStateContext, UserStateEvent> = assign({
  url: (context: UserStateContext, event: UserStateEvent) =>
    event.url || context.url,
  path: (context: UserStateContext, event: UserStateEvent) => context.path,
});

const initializeUrl: AssignAction<UserStateContext, UserStateEvent> = assign({
  url: (context: UserStateContext, event: UserStateEvent) => initialContext.url,
  path: (context: UserStateContext, event: UserStateEvent) => context.path,
});

const initializePath: AssignAction<UserStateContext, UserStateEvent> = assign({
  url: (context: UserStateContext, event: UserStateEvent) => context.url,
  path: (context: UserStateContext, event: UserStateEvent) =>
    initialContext.path,
});

const config: Partial<MachineOptions<UserStateContext, UserStateEvent>> = {
  actions: {
    // action implementation
    log: (context: UserStateContext, event: UserStateEvent) => {
      console.log(`Entered: `, context, event);
    },
    initializeUrl,
    initializePath,
    updatePath,
    updateUrl,
  },
};

const userStateMachine = Machine<
  UserStateContext,
  UserStateSchema,
  UserStateEvent
>(userState, config);

export const createState = (
  state: any
): State<UserStateContext, UserStateEvent> => State.create(state);
export const stringifyState = (state: any) => JSON.stringify(state);

export type UserState = State<UserStateContext, UserStateEvent>;
export type UserStateConfig = StateConfig<UserStateContext, UserStateEvent>;

export { State };

export default userStateMachine;

export interface StatePersister<S> {
  load(): Promise<S>;
  save(t: S): Promise<void>;
}

const browserStoragePersister: StatePersister<UserStateConfig> = {
  load() {
    return storage.getUserStateConfig();
  },
  async save(stateConfig: UserStateConfig) {
    await storage.setUserState(stateConfig);
  },
};

export const buildPersistedMachine = (
  persister: StatePersister<UserStateConfig> = browserStoragePersister
) => {
  const getState = async () => {
    const userStateConfig = await persister.load();
    return userStateMachine.resolveState(State.create(userStateConfig));
  };

  const transition = async (ev: UserStateEvent, state?: UserState) => {
    if (!state) {
      state = await getState();
    }
    const newState = userStateMachine.transition(state, ev);
    await persister.save(newState);
    return newState;
  };

  return {
    getState,
    transition,
  };
};

export const persistedUserStateMachine = buildPersistedMachine();
