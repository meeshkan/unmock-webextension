import { WrapActionPlugin } from "./wrap-spec-action";
import { browser } from "webextension-polyfill-ts";
import { sender, storage } from "../browser";
import * as messages from "../messages";
import { PageContent } from "../common/types";
import * as yaml from "js-yaml";
import { buildSpecFrom } from "../parsers";

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

  // Does not seem to need `bind`
  const setSpec = editor.unmockActions.setSpec;
  await fillFromTab(setSpec);
};

const fillFromTab = async (updateSpec: (content: string) => void) => {
  const tabInfoOrNull = await storage.getTabInfo();
  const tabId: number | undefined = tabInfoOrNull && tabInfoOrNull.tabId;
  if (tabId === undefined) {
    console.warn("Cannot fill Swagger editor as no tab ID available");
    return;
  }
  console.log(`Filling from tab ID: ${tabId}`);
  // Request content to fill from the background
  const pageContent: PageContent = await sender.sendMessageToTab(tabId, {
    type: messages.MessageType.GET_CONTENT,
    props: {},
  });
  const specJson = await buildSpecFrom(pageContent);
  const specString = yaml.safeDump(specJson, { sortKeys: false });
  updateSpec(specString);
};

window.onload = onWindowLoad;
