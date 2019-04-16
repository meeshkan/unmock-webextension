import { SelectionHandled } from "../messages";
import { store, sender } from "../browser";

const saveAndMessageTab = async (selection: string) => {
  await store.addToSelection(selection);
  const message = SelectionHandled.build({});
  await sender.sendMessageToActiveCurrentWindowTab(message);
};

interface ISelectionInput {
  url: string;
  selection: string;
}

export const handleSelection = async ({ url, selection }: ISelectionInput) => {
  const isActiveUrl = await store.checkIsActiveUrl(url);
  if (isActiveUrl) {
    await saveAndMessageTab(selection);
  } else {
    console.warn(`Ignoring selection from inactive URL: ${url}`);
  }
};
