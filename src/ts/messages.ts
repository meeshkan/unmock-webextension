export const INITIALIZE_RESULT = "initialize result";
export const SELECTION_HANDLED = "selection handled";
export const SELECTION_REQUESTED = "selection requested";
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

type MessageBuilderMatcher<M extends MessageGeneric<P>, P> = {
  build(props: P): M;
  matches(msg: MessageGeneric<any>): msg is M;
};

export const initializeStore: MessageBuilderMatcher<
  Initialize,
  InitializeProps
> = {
  build(props: InitializeProps): Initialize {
    return { type: INITIALIZE, props };
  },
  matches(msg: MessageGeneric<any>): msg is Initialize {
    return msg.type === INITIALIZE;
  },
};
