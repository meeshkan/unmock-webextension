import { WrapActionPlugin } from "./wrap-spec-action";
import { browser } from "webextension-polyfill-ts";

export type SwaggerEditor = any;

export type SwaggerEditorBundleType = (input: any) => SwaggerEditor;

// These are loaded in swagger.html scripts
declare let SwaggerEditorBundle: SwaggerEditorBundleType;
declare let SwaggerEditorStandalonePreset: any;

const onWindowLoad = () => {
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
};

window.onload = onWindowLoad;
