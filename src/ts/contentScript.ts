import * as messages from "./messages";
import { MessageGeneric } from "./messages/types";
import { browser } from "webextension-polyfill-ts";

console.log("Running content script.");

const sendMessage = async (msg: MessageGeneric<any>) => {
  console.log(`Sending message: ${JSON.stringify(msg)}`);
  await browser.runtime.sendMessage(msg);
};

// Listening to message
browser.runtime.onMessage.addListener(async (request, _) => {
  console.log(`Got message: ${JSON.stringify(request)}`);
  if (messages.SelectionHandled.matches(request)) {
    colorSelection();
  }
  if (messages.SelectionRequest.matches(request)) {
    const selection = window.getSelection();
    if (!selection) {
      console.log("Nothing selected, skipping request.");
      return;
    }
    const msg = messages.SelectEndpoint.build({
      selection: selection.toString(),
    });
    await sendMessage(msg);
  }
});

const HIGHLIGHT_TAG = "mark";

function colorSelection() {
  const element = document.activeElement;
  const selection = window.getSelection();
  if (element && selection) {
    console.log(`Colored element: ${element}`);
    const cleanedSelection = selection
      .toString()
      .replace(new RegExp("</?script>"), "");
    element.innerHTML = element.innerHTML.replace(
      cleanedSelection,
      `<${HIGHLIGHT_TAG}>${cleanedSelection}</${HIGHLIGHT_TAG}>`
    );
  } else {
    console.log("Nothing to color.");
  }
}
