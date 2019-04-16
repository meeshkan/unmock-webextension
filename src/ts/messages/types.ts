export enum MessageType {
  INITIALIZE_STORE = "Initialize store",
  SELECTION_REQUEST = "Selection request",
  SELECTION_HANDLED = "Selection handled",
  SELECT_ENDPOINT = "Select endpoint",
}

export interface MessageGeneric<Props> {
  type: string;
  props: Props;
}

export function Builder<M extends MessageGeneric<P>, P>(type: MessageType) {
  return {
    build(props: P): MessageGeneric<P> {
      return { type, props };
    },
    matches(msg: MessageGeneric<any>): msg is M {
      return msg.type === type;
    },
  };
}
