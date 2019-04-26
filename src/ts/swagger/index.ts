import { MyWrapActionPlugin } from "./wrap-spec-action";

// These are loaded in swagger.html scripts
declare let SwaggerEditorBundle: any;
declare let SwaggerEditorStandalonePreset: any;

window.onload = () => {
  const editor = SwaggerEditorBundle({
    dom_id: "#swagger-editor",
    layout: "StandaloneLayout",
    plugins: [MyWrapActionPlugin],
    presets: [SwaggerEditorStandalonePreset],
  });
  (window as any).editor = editor;
};
