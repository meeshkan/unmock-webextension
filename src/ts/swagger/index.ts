import { MyWrapActionPlugin } from "./wrap-spec-action";

window.onload = () => {
  // Build a system
  // These are loaded in swagger.html scripts
  // @ts-ignore
  const editor = SwaggerEditorBundle({
    dom_id: "#swagger-editor",
    layout: "StandaloneLayout",
    plugins: [MyWrapActionPlugin],
    // @ts-ignore
    presets: [SwaggerEditorStandalonePreset],
  });
  (window as any).editor = editor;
};
