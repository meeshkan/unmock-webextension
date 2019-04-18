import { browser } from "webextension-polyfill-ts";
import { store } from "../browser";
import Explorer from "./explorer";
import * as React from "react";
import { render } from "react-dom";

browser.storage.onChanged.addListener(async (changes, namespace) => {
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
  updateView();
});

const updateView = async () => {
  const localStorage = await store.getLocalStorage();
  render(
    <Explorer localStorage={localStorage} />,
    window.document.getElementById("app")
  );
};

updateView();
