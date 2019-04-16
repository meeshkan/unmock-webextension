import * as messages from "./messages";

// Holds the data structure for all the context menus used in the app
const CONTEXT_MENU_CONTENTS = {
  forSelection: ["Add endpoint"],
};

const setupContextMenus = () => {
  CONTEXT_MENU_CONTENTS.forSelection.forEach(commandId => {
    chrome.contextMenus.create({
      type: "separator",
      id: "sep1",
      contexts: ["selection"],
    });
    chrome.contextMenus.create({
      title: commandId + ' "%s"',
      id: commandId,
      contexts: ["selection"],
    });
  });
};

// Add context menus
chrome.runtime.onInstalled.addListener(() => {
  setupContextMenus();
});

const sendMessageToActiveCurrentWindowTab = (message, callback?: any) => {
  console.log(`Sending message: ${JSON.stringify(message)}`);
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    tabs => {
      chrome.tabs.sendMessage(tabs[0].id, message, callback);
    }
  );
};

chrome.contextMenus.onClicked.addListener(item => {
  console.log(
    `Selection menu '${item.menuItemId}' got selection: '${item.selectionText}'`
  );
  if (!item.selectionText) {
    return;
  }
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tab = tabs[0];
    const url = tab.url;
    ifActiveUrl(url, () => saveAndMessageTab(item.selectionText));
  });
});

chrome.runtime.onSuspend.addListener(() => {
  console.log("Suspending.");
});

const messageLogger = (request, sender) => {
  let logMessage = `Got message '${JSON.stringify(request)}' from `;
  logMessage += sender.tab
    ? "from a content script at: " + sender.tab.url
    : "from the extension";
  console.log(logMessage);
};

chrome.runtime.onMessage.addListener(messageLogger);

const greetingReplier = (request, _, sendResponse) => {
  if (request.greeting === "hello") {
    sendResponse({ farewell: "goodbye" });
  }
};

chrome.runtime.onMessage.addListener(greetingReplier);

const badgeUpdater = request => {
  if (!request.activate) {
    return;
  }
  console.log(`Activating badge as got: ${JSON.stringify(request)}`);
  chrome.browserAction.setBadgeText({ text: "API" });
  chrome.browserAction.setBadgeBackgroundColor({ color: "#4688F1" });
};

chrome.runtime.onMessage.addListener(badgeUpdater);

const initialize = url => {
  console.log(`Initializing for URL: ${url}`);
  chrome.storage.local.clear(() => {
    chrome.storage.local.set({ [STORAGE_ACTIVE_URL_KEY]: url });
  });
};

const STORAGE_ACTIVE_URL_KEY = "active_url";
const STORAGE_SELECTIONS_KEY = "selections";

const saveAndMessageTab = selection => {
  const callback = () => {
    sendMessageToActiveCurrentWindowTab({
      type: messages.MessageType.SELECTION_HANDLED.valueOf(),
    });
  };
  chrome.storage.local.get([STORAGE_SELECTIONS_KEY], items => {
    const previous = (items && items[STORAGE_SELECTIONS_KEY]) || [];
    const newSelections = previous.concat(selection);
    chrome.storage.local.set(
      { [STORAGE_SELECTIONS_KEY]: newSelections },
      callback
    );
  });
};

const ifActiveUrl = (url, callback) => {
  chrome.storage.local.get([STORAGE_ACTIVE_URL_KEY], activeUrlResult => {
    const activeUrl = activeUrlResult[STORAGE_ACTIVE_URL_KEY];
    console.log(
      `Active url: ${JSON.stringify(activeUrl)}, comparing to: ${url}`
    );
    if (url !== activeUrl) {
      console.log(`Message from inactive url: ${url}`);
      return;
    }
    callback();
  });
};

const handleSelectEndpoint = (request, senderUrl) => {
  const url = senderUrl;
  ifActiveUrl(url, () => saveAndMessageTab(request.selection));
};

const messageHandler = (request, sender) => {
  if (messages.InitializeStore.matches(request)) {
    const url = request.props.url;
    initialize(url);
  } else if (messages.SelectEndpoint.matches(request)) {
    handleSelectEndpoint(request, sender.tab.url);
  }
};

chrome.runtime.onMessage.addListener(messageHandler);

// Commands from keyboard shortcuts
chrome.commands.onCommand.addListener(command => {
  console.log("Command:", command);
  if (command === "toggle-unmock") {
    sendMessageToActiveCurrentWindowTab(messages.SelectionRequest.build({}));
  }
});
