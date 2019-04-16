import { Builder, MessageGeneric, MessageType } from "./types";

interface SelectionHandledProps {}

interface SelectionHandled extends MessageGeneric<SelectionHandledProps> {
  type: MessageType.SELECTION_HANDLED;
}

const builder = Builder<SelectionHandled, SelectionHandledProps>(
  MessageType.SELECTION_HANDLED
);

export default builder;
