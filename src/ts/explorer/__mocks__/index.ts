import { Labeled } from "../../state";
import { ExplorerState } from "../explorer";
import { UserStateConfig } from "../../browser/machine";

export const mockUserState: UserStateConfig = {
  actions: [{ type: "log" }],
  activities: {},
  changed: true,
  context: {
    path: [
      "https://docs.readthedocs.io/en/stable/api/v2.html",
      "Retrieve a list",
    ],
    url: "https://docs.readthedocs.io/en/stable/api/v2.html",
  },
  event: {
    path: [
      "https://docs.readthedocs.io/en/stable/api/v2.html",
      "Retrieve a list",
    ],
    type: "NEXT",
  },
  events: [],
  history: {
    actions: [{ type: "log" }],
    activities: {},
    context: {
      path: ["https://docs.readthedocs.io/en/stable/api/v2.html"],
      url: "https://docs.readthedocs.io/en/stable/api/v2.html",
    },
    event: {
      path: ["https://docs.readthedocs.io/en/stable/api/v2.html"],
      type: "NEXT",
    },
    events: [],
    historyValue: { current: "addingPath", states: {} },
    meta: {},
    value: "addingPath",
  },
  historyValue: { current: "addingOperation", states: {} },
  meta: {},
  value: "addingOperation",
} as any;

export const mockActions = {
  triggerFetchSuccess: jest.fn(),
  triggerSetActiveUrl: jest.fn(),
  triggerInitializeStore: jest.fn(),
  triggerDownload: jest.fn(),
};

export const mockLabeled: Labeled = {
  "https://docs.readthedocs.io/en/stable/api/v2.html": {
    "/api/v2/project/": {
      GET: {},
      PUT: {},
    },
    "/api/v2/user/": {
      POST: {},
    },
  },
  "https://docs.readthedocs.io/en/stable/api/v1.html": {
    "/api/v1/project/": {
      GET: {},
      PUT: {},
    },
    "/api/v1/user/": {},
  },
};

export const mockExplorerState: ExplorerState = {
  data: {
    userState: mockUserState,
    labeled: mockLabeled,
  },
  isLoading: false,
};
