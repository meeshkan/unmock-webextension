import { WrapActionPlugin } from "./wrap-spec-action";
import { browser } from "webextension-polyfill-ts";
import { sender } from "../browser";
import * as messages from "../messages";

export type SwaggerEditor = any;

export type SwaggerEditorBundleType = (input: any) => SwaggerEditor;

// These are loaded in swagger.html scripts
declare let SwaggerEditorBundle: SwaggerEditorBundleType;
declare let SwaggerEditorStandalonePreset: any;

const onWindowLoad = async () => {
  const unmockPlugin = WrapActionPlugin();
  const editor = SwaggerEditorBundle({
    dom_id: "#swagger-editor",
    layout: "StandaloneLayout",
    plugins: [unmockPlugin],
    presets: [SwaggerEditorStandalonePreset],
  });
  (window as any).editor = editor;
  const clearButton = document.getElementById("clear-button");
  clearButton.onclick = () => {
    editor.unmockActions.clear();
  };
  const messageHandler = async (request, _) => {
    if (request.type === "Clear") {
      editor.unmockActions.clear();
    }
  };

  browser.runtime.onMessage.addListener(messageHandler);

  const result = await browser.storage.local.get("tabIdOpenWhenSwaggerOpened");
  const tabId = result.tabIdOpenWhenSwaggerOpened;
  console.log(`Tab ID: ${tabId}`);
  // Request content to fill from the background
  const pageContentResponse = await sender.sendMessageToTab(tabId, {
    type: messages.MessageType.GET_CONTENT,
    props: {},
  });
  const pageContent = pageContentResponse.response;
  console.log(`Got page content: ${JSON.stringify(pageContent)}`);
  // editor.unmockActions.set(pageContent.title);
  editor.specActions.updateSpec(
    `openapi: 3.0.0\ninfo:\n  title: ${pageContent.title}\n`
  );
};

window.onload = onWindowLoad;
