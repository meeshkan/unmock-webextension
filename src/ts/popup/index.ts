import "../../scss/popup.scss";
import { utils } from "../browser";

const openSwaggerEditorButton = document.getElementById("open-swagger-editor");

openSwaggerEditorButton.onclick = utils.openSwaggerEditor;
