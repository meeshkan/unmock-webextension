import { SelectionHandled } from "../messages";
import { addToSelection, checkIsActiveUrl } from "../browser/store";
import { sendMessageToActiveCurrentWindowTab } from "../browser/sender";

const saveAndMessageTab = async (selection: string) => {
  await addToSelection(selection);
  const message = SelectionHandled.build({});
  await sendMessageToActiveCurrentWindowTab(message);
};

interface ISelectionInput {
  url: string;
  selection: string;
}

export const handleSelection = async ({ url, selection }: ISelectionInput) => {
  const isActiveUrl = await checkIsActiveUrl(url);
  if (isActiveUrl) {
    await saveAndMessageTab(selection);
  } else {
    console.warn(`Ignoring selection from inactive URL: ${url}`);
  }
};
