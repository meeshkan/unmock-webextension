export enum MessageType {
  INITIALIZE_STORE = "Initialize store",
  SELECTION_REQUEST = "Selection request",
  SELECTION_HANDLED = "Selection handled",
  SELECT_ENDPOINT = "Select endpoint",
  SET_ACTIVE_URL = "Set active URL",
  CLEAR = "Clear",
  CHECK_IF_API = "Check if is API page",
  SET_BADGE = "Set badge for browser action button",
}

interface MessageProps {}

export interface MessageGeneric<Props extends MessageProps> {
  type: MessageType;
  props: Props;
}

export function Builder<M extends MessageGeneric<P>, P extends MessageProps>(
  type: MessageType
) {
  return {
    build(props: P): MessageGeneric<P> {
      return { type, props };
    },
    matches(msg: MessageGeneric<any>): msg is M {
      return msg.type === type;
    },
  };
}
