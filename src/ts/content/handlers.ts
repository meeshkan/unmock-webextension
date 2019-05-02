import * as messages from "../messages";
import { sender } from "../browser";
import { PageContent } from "../common/types";
import { buildSpecFrom } from "../parsers";
import { OpenAPIObject } from "openapi3-ts";
import debug from "../common/logging";

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

export const buildSpec = async (): Promise<OpenAPIObject> => {
  const pageContent = getPageContent();
  const spec = await buildSpecFrom(pageContent);
  return spec;
};

let apiCheckResult: boolean;

export const checkIfCanParsePathsFromPage = async (): Promise<boolean> => {
  if (typeof apiCheckResult !== "undefined") {
    debugLog("Cached API check result", apiCheckResult);
    return apiCheckResult;
  }
  const spec: OpenAPIObject = await buildSpec();
  const isApi = Object.keys(spec.paths).length > 0;
  apiCheckResult = isApi;
  return isApi;
};

export const getPageContent = (): PageContent => {
  const body = document.body;
  const textContent = body.innerText || body.textContent;
  const innerHtml = document.documentElement.innerHTML;
  return { title: document.title, innerHtml, textContent };
};

// TODO: Remove the mish mash of very strict and lazy type-checking using both `...matches(request)` and `request.type === ...`
const messageHandler = async (request, _) => {
  debugLog(`Got message: ${JSON.stringify(request)}`);
  if (messages.SelectionHandled.matches(request)) {
    colorSelection();
  } else if (messages.SelectionRequest.matches(request)) {
    await handleSelectionRequest();
  } else if (request.type === messages.MessageType.CHECK_IF_API) {
    return checkIfCanParsePathsFromPage();
  } else if (request.type === messages.MessageType.GET_CONTENT) {
    return getPageContent();
  }
};

export default messageHandler;
