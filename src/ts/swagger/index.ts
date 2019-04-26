import * as SwaggerEditor from "swagger-editor";
import SwaggerEditorStandalonePreset from "./standalone";

window.onload = function() {
  // Build a system
  const editor = SwaggerEditor({
    dom_id: "#swagger-editor",
    layout: "StandaloneLayout",
    presets: [SwaggerEditorStandalonePreset],
  });
  // @ts-ignore
  window.editor = editor;
};
