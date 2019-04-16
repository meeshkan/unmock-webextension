import { browser } from "webextension-polyfill-ts";
import { getActiveTab } from "../browser/utils";
import { handleSelection } from "./selection";

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
    await handleSelection({ url, selection: item.selectionText });
  });
};
