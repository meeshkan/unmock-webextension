import * as React from "react";

import { storiesOf, StoryDecorator, RenderFunction } from "@storybook/react";

import LabeledUrlsComponent from "../src/ts/explorer/list-item/labeledComponent";
import ActiveStateComponent from "../src/ts/explorer/activeStateComponent";
import { Active, Labeled, State, Phase } from "../src/ts/state";
import { Actions } from "../src/ts/explorer/actions";
import { ExplorerActionsContext } from "../src/ts/explorer/context";

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

const mockActive: Active = {
  phase: Phase.ADD_PATH,
  activePath: [],
  url: "https://docs.readthedocs.io/en/stable/api/v2.html",
};

const mockActions: Actions = {
  triggerFetchSuccess(data: State) {},
  triggerSetActiveUrl(url: string) {
    console.log(`Set active URL to ${url}`);
    mockActive.url = url;
  },
};

const provideExplorerActionsContext: StoryDecorator = (
  story: RenderFunction
) => {
  return (
    <ExplorerActionsContext.Provider value={{ actions: mockActions }}>
      {story()}
    </ExplorerActionsContext.Provider>
  );
};

storiesOf("Labeled URLs", module)
  .addDecorator(provideExplorerActionsContext)
  .add("vanilla", () => (
    <LabeledUrlsComponent active={mockActive} labeled={mockLabeledUrls} />
  ));

storiesOf("Active state", module).add("vanilla", () => (
  <ActiveStateComponent active={mockActive} />
));
