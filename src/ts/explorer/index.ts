import { browser } from "webextension-polyfill-ts";

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
  const items = await browser.storage.local.get(null);
  console.log(`Stored: ${JSON.stringify(items)}`);
  stored.innerHTML = JSON.stringify(items);
};

updateShownSaved();
