import * as messages from "./messages";

console.log("Running content script.");

const sendMessage = (msg, callback?: any) => {
  console.log(`Sending message: ${JSON.stringify(msg)}`);
  chrome.runtime.sendMessage(msg, callback);
};

// Sending messages
const message = { greeting: "hello" };
sendMessage(message, response => {
  console.log(`Got response: ${response.farewell}`);
});

const title = document.title;
sendMessage({ title });

function activateIfFound(text) {
  const htmlString = document.documentElement.outerHTML.toString();
  const activate = new RegExp(text).test(htmlString);
  sendMessage({ activate });
}

activateIfFound("API");

// Listening to message
chrome.runtime.onMessage.addListener((request, _, __) => {
  console.log(`Got message: ${JSON.stringify(request)}`);
  if (request.type === messages.SELECTION_HANDLED) {
    colorSelection();
  }
  if (messages.selectionRequest.matches(request)) {
    const selection = window.getSelection();
    if (!selection) {
      console.log("Nothing selected, skipping request.");
      return;
    }
    sendMessage({
      type: messages.SELECT_ENDPOINT,
      selection: selection.toString(),
    });
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
