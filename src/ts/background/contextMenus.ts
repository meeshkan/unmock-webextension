import * as messages from "../messages";
import { checkIsActiveUrl, addToSelection } from "../browser/store";
import { sendMessageToActiveCurrentWindowTab } from "../browser/sender";
import { browser } from "webextension-polyfill-ts";
import { getActiveTab } from "../browser/utils";

// Holds the data structure for all the context menus used in the app
const CONTEXT_MENU_CONTENTS = {
  forSelection: ["Add endpoint"],
};

export const setupContextMenus = () => {
  CONTEXT_MENU_CONTENTS.forSelection.forEach(commandId => {
    browser.contextMenus.create({
      type: "separator",
      id: "sep1",
      contexts: ["selection"],
    });
    browser.contextMenus.create({
      title: commandId + ' "%s"',
      id: commandId,
      contexts: ["selection"],
    });
  });

  addContextMenuClickedHandler();
};

const saveAndMessageTab = async (selection: string) => {
  await addToSelection(selection);
  const selectionHandledMessage = messages.SelectionHandled.build({});
  await sendMessageToActiveCurrentWindowTab(selectionHandledMessage);
};

const addContextMenuClickedHandler = () => {
  browser.contextMenus.onClicked.addListener(async item => {
    console.log(
      `Selection menu '${item.menuItemId}' got selection: '${
        item.selectionText
      }'`
    );
    if (!item.selectionText) {
      return;
    }
    const tab = await getActiveTab();
    const url = tab.url;
    const isActiveUrl = await checkIsActiveUrl(url);
    if (isActiveUrl) {
      await saveAndMessageTab(item.selectionText);
    } else {
      console.warn(`Ignoring context menu click from inactive URL: ${url}`);
    }
  });
};
