import { browser } from "webextension-polyfill-ts";
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
});

render(<Explorer />, window.document.getElementById("app"));
