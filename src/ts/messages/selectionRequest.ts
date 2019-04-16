import { Builder, MessageGeneric, MessageType } from "./types";

interface SelectionRequestProps {}

export interface SelectionRequest
  extends MessageGeneric<SelectionRequestProps> {}

const builder = Builder<SelectionRequest, SelectionRequestProps>(
  MessageType.SELECTION_REQUEST
);

export default builder;
