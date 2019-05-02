import * as messages from "../messages";
import { sender } from "../browser";
import debug from "../common/logging";
import { checkAndCacheApiCheckResult, getPageContent } from "./utils";
const debugLog = debug("unmock:content:handlers");

const handleSelectionRequest = async () => {
  const selection = window.getSelection();
  if (!selection) {
    debugLog("Nothing selected, skipping request.");
    return;
  }
  const msg = messages.SelectEndpoint.build({
    selection: selection.toString(),
  });
  await sender.sendRuntimeMessage(msg);
};

const HIGHLIGHT_TAG = "mark";

function colorSelection() {
  const element = document.activeElement;
  const selection = window.getSelection();
  if (element && selection) {
    debugLog(`Colored element: ${element}`);
    const cleanedSelection = selection
      .toString()
      .replace(new RegExp("</?script>"), "");
    element.innerHTML = element.innerHTML.replace(
      cleanedSelection,
      `<${HIGHLIGHT_TAG}>${cleanedSelection}</${HIGHLIGHT_TAG}>`
    );
  } else {
    debugLog("Nothing to color.");
  }
}

// TODO: Remove the mish mash of very strict and lazy type-checking using both `...matches(request)` and `request.type === ...`
const messageHandler = async (request, _) => {
  debugLog(`Got message: ${JSON.stringify(request)}`);
  if (messages.SelectionHandled.matches(request)) {
    colorSelection();
  } else if (messages.SelectionRequest.matches(request)) {
    await handleSelectionRequest();
  } else if (request.type === messages.MessageType.CHECK_IF_API) {
    return checkAndCacheApiCheckResult();
  } else if (request.type === messages.MessageType.GET_CONTENT) {
    return getPageContent();
  }
};

export default messageHandler;
