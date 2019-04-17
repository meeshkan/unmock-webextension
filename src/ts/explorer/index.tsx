import { browser } from "webextension-polyfill-ts";
import { store } from "../browser";
import Greeting from "./greeting";
import * as React from "react"; // import { hot } from "react-hot-loader";
import { render } from "react-dom";

render(<Greeting />, window.document.getElementById("app"));

const stored = document.getElementById("stored");

browser.storage.onChanged.addListener((changes, namespace) => {
  Object.keys(changes).forEach(key => {
    const storageChange = changes[key];
    console.log(
      'Storage key "%s" in namespace "%s" changed: ' +
        'Old value was "%s", new value is "%s".',
      key,
      namespace,
      JSON.stringify(storageChange.oldValue),
      JSON.stringify(storageChange.newValue)
    );
  });
  updateShownSaved();
});

const updateShownSaved = async () => {
  const items = await store.getLocalStorage();
  console.log(`Stored: ${JSON.stringify(items)}`);
  stored.innerHTML = JSON.stringify(items);
};

updateShownSaved();
