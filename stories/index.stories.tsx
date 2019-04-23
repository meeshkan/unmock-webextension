import * as React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";

import LabeledUrlsComponent from "../src/ts/explorer/list-item/labeledComponent";
import { Labeled, State } from "../src/ts/state";
import { Actions } from "../src/ts/explorer/actions";
import { ExplorerActionsContext } from "../src/ts/explorer/context";

const labeled: Labeled = {};

const actions: Actions = {
  triggerFetchSuccess(data: State) {},
  triggerSetActiveUrl(url: string) {},
};

storiesOf("Labeled", module)
  .addDecorator(story => (
    <ExplorerActionsContext.Provider value={{ actions }}>
      {story()}
    </ExplorerActionsContext.Provider>
  ))
  .add("Labeled URLs", () => <LabeledUrlsComponent labeled={labeled} />);

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
