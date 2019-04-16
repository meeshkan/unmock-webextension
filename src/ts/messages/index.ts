export const INITIALIZE_RESULT = "initialize result";
export const SELECTION_HANDLED = "selection handled";
export const SELECT_ENDPOINT = "select endpoint";

interface MessageGeneric<Props> {
  type: string;
  props: Props;
}

/* Initialization message */
const INITIALIZE = "initialize";

interface InitializeProps {
  url: string;
}

interface Initialize extends MessageGeneric<InitializeProps> {}

type MessageCreator<M extends MessageGeneric<P>, P> = {
  build(props: P): M;
  matches(msg: MessageGeneric<any>): msg is M;
};

export const initializeStore: MessageCreator<Initialize, InitializeProps> = {
  build(props: InitializeProps): Initialize {
    return { type: INITIALIZE, props };
  },
  matches(msg: MessageGeneric<any>): msg is Initialize {
    return msg.type === INITIALIZE;
  },
};

const SELECTION_REQUESTED = "selection requested";

interface SelectionRequestProps {}

interface SelectionRequest extends MessageGeneric<SelectionRequestProps> {}

export const selectionRequest: MessageCreator<
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
