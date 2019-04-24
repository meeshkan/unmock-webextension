import { Machine, State } from "xstate";

const userState = {
  id: "labeling",
  initial: "addPath",
  states: {
    addPath: {
      on: {
        NEXT: "addOperation",
      },
      onEntry: "log",
    },
    addOperation: {
      on: {
        NEXT: "addPath",
      },
      onEntry: "log",
    },
  },
};

const config = {
  actions: {
    // action implementation
    log: (context, event) => {
      console.log(context, event);
    },
  },
};

const userStateMachine = Machine(userState, config);

export const createState = (state: any) => State.create(state);
export const stringifyState = (state: any) => JSON.stringify(state);

export default userStateMachine;

export { State };
