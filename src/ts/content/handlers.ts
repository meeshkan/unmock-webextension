import * as messages from "../messages";
import { MessageGeneric } from "../messages/types";
import { sendRuntimeMessage } from "../browser/sender";

const sendMessage = async (msg: MessageGeneric<any>) => {
  console.log(`Sending message: ${JSON.stringify(msg)}`);
  await sendRuntimeMessage(msg);
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

const messageHandler = async (request, _) => {
  console.log(`Got message: ${JSON.stringify(request)}`);
  if (messages.SelectionHandled.matches(request)) {
    colorSelection();
  }
  if (messages.SelectionRequest.matches(request)) {
    await handleSelectionRequest();
  }
};

export default messageHandler;
