import * as React from "react";

import { storiesOf, StoryDecorator, RenderFunction } from "@storybook/react";

import LabeledUrlsComponent from "../src/ts/explorer/labeled/labeledComponent";
import ActiveStateComponent from "../src/ts/explorer/activeStateComponent";
import { Active, Labeled, State, Phase } from "../src/ts/state";
import { Actions } from "../src/ts/explorer/actions";
import {
  ExplorerActionsContext,
  ExplorerDataContext,
} from "../src/ts/explorer/context";
import ExplorerButtonsComponent from "../src/ts/explorer/explorer-buttons-component";
import ExplorerComponent from "../src/ts/explorer/explorer";

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

let mockActive: Active = {
  phase: Phase.ADD_PATH,
  activePath: [],
  url: "https://docs.readthedocs.io/en/stable/api/v2.html",
};

const mockActions: Actions = {
  triggerFetchSuccess(data: State) {},
  triggerSetActiveUrl(url: string) {
    console.log(`Set active URL to ${url}`);
    mockActive = { ...mockActive, url };
  },
  triggerInitializeStore() {},
  triggerDownload(labeled: Labeled) {},
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

const provideExplorerDataContext: StoryDecorator = (story: RenderFunction) => {
  return (
    <ExplorerDataContext.Provider
      value={{ data: { active: mockActive, labeled: mockLabeledUrls } }}
    >
      {story()}
    </ExplorerDataContext.Provider>
  );
};

storiesOf("Explorer", module)
  .addDecorator(provideExplorerActionsContext)
  .addDecorator(provideExplorerDataContext)
  .add("vanilla", () => <ExplorerComponent />);

storiesOf("Labeled URLs", module)
  .addDecorator(provideExplorerActionsContext)
  .add("with labeled data", () => (
    <LabeledUrlsComponent active={mockActive} labeled={mockLabeledUrls} />
  ))
  .add("without labeled data", () => (
    <LabeledUrlsComponent active={mockActive} labeled={{}} />
  ));

storiesOf("Active state", module).add("vanilla", () => (
  <ActiveStateComponent active={mockActive} />
));

storiesOf("Explorer buttons", module)
  .addDecorator(provideExplorerActionsContext)
  .add("vanilla", () => <ExplorerButtonsComponent labeled={mockLabeledUrls} />);
