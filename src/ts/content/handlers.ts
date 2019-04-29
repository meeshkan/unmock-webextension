import * as messages from "../messages";
import { MessageGeneric } from "../messages/types";
import { sender } from "../browser";

const sendMessage = async (msg: MessageGeneric<any>) => {
  console.log(`Sending message: ${JSON.stringify(msg)}`);
  await sender.sendRuntimeMessage(msg);
};

const handleSelectionRequest = async () => {
  const selection = window.getSelection();
  if (!selection) {
    console.log("Nothing selected, skipping request.");
    return;
  }
  const msg = messages.SelectEndpoint.build({
    selection: selection.toString(),
  });
  await sendMessage(msg);
};

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

const handleCheckIfApi = async () => {
  const body = document.body;
  const textContent = body.innerText || body.textContent;
  const regexToTest = /\bAPI\b/;
  const isApi = regexToTest.test(textContent);
  console.log(`API check result: ${isApi}`);
  sender.sendRuntimeMessage({
    type: messages.MessageType.SET_BADGE,
    props: {
      isApi,
    },
  });
};

// TODO: Remove the mish mash of very strict and lazy type-checking using both `...matches(request)` and `request.type === ...`
const messageHandler = async (request, _) => {
  console.log(`Got message: ${JSON.stringify(request)}`);
  if (messages.SelectionHandled.matches(request)) {
    colorSelection();
  } else if (messages.SelectionRequest.matches(request)) {
    await handleSelectionRequest();
  } else if (request.type === messages.MessageType.CHECK_IF_API) {
    await handleCheckIfApi();
  }
};

export default messageHandler;
