import * as messages from "../messages";
import { MyWrapActionPlugin } from "./wrap-spec-action";
import { browser } from "webextension-polyfill-ts";

// These are loaded in swagger.html scripts
declare let SwaggerEditorBundle: any;
declare let SwaggerEditorStandalonePreset: any;

const onLoad = () => {
  const editor = SwaggerEditorBundle({
    dom_id: "#swagger-editor",
    layout: "StandaloneLayout",
    plugins: [MyWrapActionPlugin],
    presets: [SwaggerEditorStandalonePreset],
  });
  (window as any).editor = editor;
  const clearButton = document.getElementById("clear-button");
  clearButton.onclick = () => {
    editor.unmockActions.clear();
  };
  setInterval(() => {
    // editor.unmockActions.clear();
    // editor.clear();
  }, 10000);
  setTimeout(() => {
    // Why doesn't this work?
    // console.log(editor.getEditorMetadata());
  });
  const messageHandler = async (request, _) => {
    if (request.type === "Clear") {
      editor.unmockActions.clear();
    }
  };

  browser.runtime.onMessage.addListener(messageHandler);
};

window.onload = onLoad;
