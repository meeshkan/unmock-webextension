import * as React from "react";

import { storiesOf } from "@storybook/react";

import LabeledUrlsComponent from "../src/ts/explorer/labeled/labeled-component";

import { Labeled, State } from "../src/ts/state";
import { Actions } from "../src/ts/explorer/actions";
import ExplorerButtonsComponent from "../src/ts/explorer/explorer-buttons-component";
import ExplorerComponent from "../src/ts/explorer/explorer";
import { UserStateConfig } from "../src/ts/common/machine";

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

const mockLabeledUrls: Labeled = {
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

const mockActions: Actions = {
  triggerFetchSuccess(data: State) {},
  triggerSetActiveUrl(url: string) {
    console.log(`Set active URL to ${url}`);
    // mockActive = { ...mockActive, url };
  },
  triggerInitializeStore() {},
  triggerDownload(labeled: Labeled) {},
};

const mockExplorerState = {
  data: {
    labeled: mockLabeledUrls,
    userState: mockUserState,
  },
  isLoading: false,
};

storiesOf("Explorer", module).add("vanilla", () => (
  <ExplorerComponent state={mockExplorerState} actions={mockActions} />
));

storiesOf("Labeled URLs", module)
  .add("with labeled data", () => (
    <LabeledUrlsComponent
      userStat={mockUserState}
      actions={mockActions}
      labeled={mockLabeledUrls}
    />
  ))
  .add("without labeled data", () => (
    <LabeledUrlsComponent
      userState={mockUserState}
      actions={mockActions}
      labeled={{}}
    />
  ));

storiesOf("Explorer buttons", module).add("vanilla", () => (
  <ExplorerButtonsComponent labeled={mockLabeledUrls} actions={mockActions} />
));
