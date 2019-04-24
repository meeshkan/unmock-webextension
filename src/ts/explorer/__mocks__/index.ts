import { Labeled, Phase } from "../../state";
import { ExplorerState } from "../explorer";

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
    active: {
      activePath: [],
      phase: Phase.ADD_PATH,
    },
    labeled: mockLabeled,
  },
  isLoading: false,
};
