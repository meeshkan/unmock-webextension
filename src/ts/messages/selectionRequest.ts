import { MessageCreator, MessageGeneric } from "./types";

const SELECTION_REQUESTED = "selection requested";

interface SelectionRequestProps {}

interface SelectionRequest extends MessageGeneric<SelectionRequestProps> {}

const selectionRequest: MessageCreator<
  SelectionRequest,
  SelectionRequestProps
> = {
  build(props: SelectionRequestProps): SelectionRequest {
    return { type: SELECTION_REQUESTED, props };
  },
  matches(msg: MessageGeneric<any>): msg is SelectionRequest {
    return msg.type === SELECTION_REQUESTED;
  },
};

export default selectionRequest;
