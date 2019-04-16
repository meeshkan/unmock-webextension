import { Builder, MessageGeneric, MessageType } from "./types";

interface SelectionHandledProps {}

interface SelectionHandled extends MessageGeneric<SelectionHandledProps> {}

const builder = Builder<SelectionHandled, SelectionHandledProps>(
  MessageType.SELECTION_HANDLED
);

export default builder;
