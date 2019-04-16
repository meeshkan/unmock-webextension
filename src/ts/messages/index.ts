import SelectionRequest from "./selectionRequest";
import InitializeStore from "./initializeStore";

enum MessageType {
  SELECTION_HANDLED = "Selection handled",
  SELECT_ENDPOINT = "Select endpoint",
}

export { SelectionRequest, InitializeStore, MessageType };
